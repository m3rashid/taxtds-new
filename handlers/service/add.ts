import express, { Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import { internalServerError } from "../helpers";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
import logger from "../../utils/logger";

export const addSchema = Joi.object({
  brandName: Joi.string().required(),
  avatar: Joi.string().required(),
  gallery: Joi.array().min(1).max(3),
  services: Joi.array().min(1),
  addedBy: Joi.string().required(),
  established: Joi.string().allow(""),
  tagline: Joi.string().allow(""),
  owner: Joi.string().required().allow(""),
  addressLineOne: Joi.string().required(),
  addressLineTwo: Joi.string().allow(""),
  state: Joi.string().required().allow(""),
  phone: Joi.number().required(),
  email: Joi.string().required(),
  deleted: Joi.boolean(),
  featured: Joi.boolean(),
});

const validateAddServiceRequest = async (
  req: SecureRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await addSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return internalServerError(res);
  }
};

router.post(
  "/service/add",
  checkAuth,
  validateAddServiceRequest,
  (req: SecureRequest, res: Response) => {
    res.send("reached");
  }
);

export default router;
