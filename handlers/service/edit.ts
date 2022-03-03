import express, { Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import { internalServerError } from "../helpers";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
import logger from "../../utils/logger";

const editSchema = Joi.object({});

const validateEditServiceRequest = async (
  req: SecureRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await editSchema.validateAsync({
      ...req.body,
    });
    // TODO validate according to its value
    logger.debug(value);
    next();
  } catch (err) {
    return internalServerError(res);
  }
};

router.post(
  "/service/edit/:serviceId",
  checkAuth,
  validateEditServiceRequest,
  (req: SecureRequest, res: Response) => {
    res.send("reached");
  }
);

export default router;
