import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import ServiceName from "../models/serviceName";
import { resourceAbsent, internalServerError } from "./helpers";

const serviceNameSchema = Joi.object({
  name: Joi.string().required(),
});

const validateServiceNameRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await serviceNameSchema.validateAsync({
      ...req.body,
    });
    // TODO validate according to its value
    console.log(value);
    next();
  } catch (err) {
    return resourceAbsent(res);
  }
};

// TODO check auth as user
router.post(
  "/add-service",
  validateServiceNameRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    // check if the same name exists in the database or not
    const service = new ServiceName({ name });
    try {
      await service.save();
      res.send("reached");
    } catch (err) {
      return internalServerError(res);
    }
  }
);

export default router;
