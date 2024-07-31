import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import xss from "xss-clean";
import helmet from "helmet";

import logger from "./utils/logger";
import routes from "./routes";
import adminRoutes from "./admin.routes";
import appConfig from "./utils/appConfig";
import { initialSetup } from "./bulk";

const app = express();
app.use(helmet());
app.use(xss());
app.use(cors(appConfig.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("debug", process.env.NODE_ENV !== "production");
app.use(routes);
app.use("/admin", adminRoutes);

// Global error handler
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
	logger.error(JSON.stringify(err));
	return res.status(500).json({
		message: appConfig.errorMessage,
	});
});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
	try {
		await mongoose.connect(appConfig.mongodbUri);
		await mongoose.connection.db.dropDatabase();
		logger.info("Database dropped");
		await initialSetup();
		logger.info("Mongoose is connected");
		logger.info(appConfig.startLog(port));
	} catch (err) {
		logger.error(JSON.stringify(err));
		logger.error("MongoDB connection error");
		process.exit(1);
	}
});
