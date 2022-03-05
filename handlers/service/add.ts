import express from "express";
import Joi from "joi";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

import { internalServerError } from "../helpers";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
import logger from "../../utils/logger";
import Service from "../../models/service";
import upload from "../../utils/multer";

const router = express.Router();

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
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await addSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return internalServerError(res);
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadFiles = async (file: Express.Multer.File) => {
  try {
    let filePath = path.resolve(__dirname, `../../uploads/${file.filename}`);
    let data = await cloudinary.uploader.upload(filePath);
    return data;
  } catch (err) {
    logger.error(err);
  }
};

router.post(
  "/service/add",
  checkAuth,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  validateAddServiceRequest,
  async (req: SecureRequest, res: express.Response) => {
    const { avatar, gallery } = req.body;
    try {
      const service = new Service({
        brandName: req.body.brandName,
        // handle the image upload workflow
        // avatar,
        // gallery,
        services: req.body.services,
        addedBy: req.body.addedBy,
        established: req.body.established,
        tagline: req.body.tagline,
        owner: req.body.owner,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        state: req.body.state,
        phone: req.body.phone,
        email: req.body.email,
      });
      await service.save();
      return res.status(200).json({
        message: "Service added successfully",
        service,
      });
    } catch (err) {
      logger.error(err);
      return internalServerError(res);
    }
  }
);

export default router;
