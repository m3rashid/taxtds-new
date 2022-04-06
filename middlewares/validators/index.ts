import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import logger from "../../utils/logger";

import { loginSchema, registerOneSchema, registerTwoSchema } from "./auth";
import {
  addSchema,
  editSchema,
  removeSchema,
  serviceNameSchema,
  professionNameSchema,
  reviewSchema,
} from "./service";

const validateRequest =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const value = await schema.validateAsync({ ...req.body });
    logger.debug(JSON.stringify(value));
    next();
  };

export const checkLogin = validateRequest(loginSchema);
export const checkRegisterOne = validateRequest(registerOneSchema);
export const checkRegisterTwo = validateRequest(registerTwoSchema);

export const checkAddService = validateRequest(addSchema);
export const checkEditService = validateRequest(editSchema);
export const checkRemoveService = validateRequest(removeSchema);
export const checkAddServiceName = validateRequest(serviceNameSchema);
export const checkAddProfessionName = validateRequest(professionNameSchema);
export const checkAddReview = validateRequest(reviewSchema);
