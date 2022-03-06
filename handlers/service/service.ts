import express, { Request, Response } from "express";
const router = express.Router();
import User from "../../models/user";
import Service from "../../models/service";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import upload from "../../utils/multer";
import logger from "../../utils/logger";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Files are already compressed (as received from client)
router.post(
  "/add",
  checkAuth,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "galleryImg1", maxCount: 1 },
    { name: "galleryImg2", maxCount: 1 },
    { name: "galleryImg3", maxCount: 1 },
  ]),
  async (req: SecureRequest, res: Response) => {
    const userId = req.user;
    if (!userId)
      return res.status(400).json({
        message: "Unauthorized User",
      });

    // TODO handle this add-service
  }
);

router.get(
  "/edit/:serviceId",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    const userId = req.user;
    if (!userId)
      return res.status(400).json({
        message: "Unauthorized User",
      });

    const serviceId = req.params.serviceId;
    if (!serviceId)
      return res.status(400).json({
        message: "Bad Request",
      });

    try {
      const service = await Service.findById(serviceId);
      if (!service)
        return res.status(200).json({
          message: "No Services Found",
        });

      return res.status(200).json({
        service: service,
        message: "Service found",
      });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

router.post(
  "/edit/:serviceId",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    const userId = req.user;
    if (!userId)
      return res.status(400).json({
        message: "Unauthorized User",
      });

    const serviceId = req.params.serviceId;
    if (!serviceId)
      return res.status(400).json({
        message: "Bad Request",
      });

    try {
      const service = await Service.findById(serviceId);
      if (!service)
        return res.status(200).json({
          message: "No Services Found",
        });

      // TODO implement add-service here
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

router.post(
  "/delete/:serviceId",
  checkAuth,
  async (req: SecureRequest, res: Response) => {
    const userId = req.user;
    if (!userId)
      return res.status(400).json({
        message: "Unauthorized User",
      });

    const serviceId = req.params.serviceId;
    if (!serviceId)
      return res.status(400).json({
        message: "Bad Request",
      });

    try {
      const service = await Service.findById(serviceId);
      if (!service)
        return res.status(400).json({
          message: "Service not found",
        });

      const user = await User.findById(service.addedBy);

      if (!user || user._id !== userId)
        return res.status(401).json({
          message: "Unauthorized User",
        });

      // TODO delete the service
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);
