import express, { Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import { internalServerError } from "../helpers";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
import logger from "../../utils/logger";

const removeSchema = Joi.object({});

const validateRemoveServiceRequest = async (
  req: SecureRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await removeSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return internalServerError(res);
  }
};

router.post(
  "/service/remove/:serviceId",
  checkAuth,
  validateRemoveServiceRequest,
  (req: SecureRequest, res: Response) => {
    res.send("reached");
  }
);

export default router;
