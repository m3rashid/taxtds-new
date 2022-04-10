import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import logger from "../utils/logger";

import { loginSchema, registerOneSchema, registerTwoSchema } from "./auth";
import { checkAdminLoginSchema, checkAdminRegisterSchema } from "./admin";
import {
  addListingSchema,
  editListingSchema,
  removeListingSchema,
} from "./listing";
import { professionSchema } from "./profession";
import { reviewSchema } from "./review";
import { serviceSchema } from "./service";

const validateRequest =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, _: Response, next: NextFunction) => {
    const value = await schema.validateAsync({ ...req.body });
    logger.debug(JSON.stringify(value));
    next();
  };

// user auth
export const checkLogin = validateRequest(loginSchema);
export const checkRegisterOne = validateRequest(registerOneSchema);
export const checkRegisterTwo = validateRequest(registerTwoSchema);

// listing
export const checkAddListing = validateRequest(addListingSchema);

// service
export const checkAddService = validateRequest(serviceSchema);
export const checkEditService = validateRequest(editListingSchema);
export const checkDeleteService = validateRequest(removeListingSchema);

// professtion
export const checkAddProfession = validateRequest(professionSchema);

// review
export const checkAddReview = validateRequest(reviewSchema);

// admin
export const checkAdminLogin = validateRequest(checkAdminLoginSchema);
export const checkAdminRegister = validateRequest(checkAdminRegisterSchema);
