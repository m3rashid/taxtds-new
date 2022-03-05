import express from "express";
import Joi from "joi";
const router = express.Router();

import ServiceName from "../../models/serviceName";
import { resourceAbsent, internalServerError } from "../helpers";
import logger from "../../utils/logger";

const serviceNameSchema = Joi.object({
  name: Joi.string().required(),
});

const validateServiceNameRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await serviceNameSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return resourceAbsent(res);
  }
};

// TODO check auth as user
router.post(
  "/add-service",
  validateServiceNameRequest,
  async (req: express.Request, res: express.Response) => {
    const service = new ServiceName({ name: req.body.name });
    try {
      await service.save();
      res.sendStatus(200);
    } catch (err) {
      return internalServerError(res);
    }
  }
);

export default router;
