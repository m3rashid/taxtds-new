import express, { Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import { internalServerError } from "./helpers";
import checkAuth, { SecureRequest } from "../middlewares/jwt.auth";

const removeSchema = Joi.object({});

const validateRemoveServiceRequest = async (
  req: SecureRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await removeSchema.validateAsync({
      ...req.body,
    });
    // TODO validate according to its value
    console.log(value);
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
