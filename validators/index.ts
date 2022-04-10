import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import logger from "../utils/logger";

import { loginSchema, registerOneSchema, registerTwoSchema } from "./auth";
import { deleteUserSchema, emailUserSchema } from "./user";
import {
  addListingSchema,
  deleteListingSchema,
  editListingSchema,
  featureUnfeatureListingSchema,
  removeListingSchema,
} from "./listing";
import {
  addProfessionSchema,
  deleteProfessionSchema,
  editProfessionSchema,
} from "./profession";
import { reviewSchema } from "./review";
import {
  addServiceSchema,
  editServiceSchema,
  deleteServiceSchema,
} from "./service";

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

// review
export const checkAddReview = validateRequest(reviewSchema);

/* admin  stuff */
// listing
export const checkDeleteListing = validateRequest(deleteListingSchema);
export const checkFeatureUnfeatureListing = validateRequest(
  featureUnfeatureListingSchema
);

// user
export const checkDeleteuser = validateRequest(deleteUserSchema);
export const checkEmailuser = validateRequest(emailUserSchema);

// service
export const checkAddService = validateRequest(addServiceSchema);
export const checkEditService = validateRequest(editServiceSchema);
export const checkDeleteService = validateRequest(deleteServiceSchema);

// professtion
export const checkAddProfession = validateRequest(addProfessionSchema);
export const checkEditProfession = validateRequest(editProfessionSchema);
export const checkDeleteProfession = validateRequest(deleteProfessionSchema);
