import { Response, NextFunction, Router as expressRouter } from "express";
import Joi from "joi";
const router = expressRouter();

import { internalServerError } from "../helpers";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
// import logger from "../../utils/logger";
import { addSchema } from "./add";
import Service from "../../models/service";

export const editSchema = addSchema.keys({
  _id: Joi.string().required(),
});

const validateEditServiceRequest = async (
  req: SecureRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await editSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return internalServerError(res);
  }
};

router.post(
  "/service/edit/:serviceId",
  checkAuth,
  validateEditServiceRequest,
  async (req: SecureRequest, res: Response) => {
    // handle the image change workflow
    // const { avatar, gallery } = req.body;
    try {
      await Service.findByIdAndUpdate(req.params.serviceId, {
        $set: {
          brandName: req.body.brandName,
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
        },
      });
      return res.status(200).json({
        message: "Service updated successfully",
      });
    } catch (err) {
      return internalServerError(res);
    }
  }
);

export default router;
