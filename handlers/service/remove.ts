import { Response, NextFunction, Router as expressRouter } from "express";
// import Joi from "joi";
const router = expressRouter();

import { internalServerError } from "../helpers";
import checkAuth, { SecureRequest } from "../../middlewares/jwt.auth";
// import logger from "../../utils/logger";

import Service from "../../models/service";
import { editSchema } from "./edit";

const validateRemoveServiceRequest = async (
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
  "/service/remove/:serviceId",
  checkAuth,
  validateRemoveServiceRequest,
  async (req: SecureRequest, res: Response) => {
    try {
      await Service.findByIdAndUpdate(req.params.serviceId, {
        $set: {
          deleted: true,
        },
      });
      return res.status(200).json({
        message: "Service removed successfully",
      });
    } catch (err) {
      return internalServerError(res);
    }
  }
);

export default router;
