import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import ProfessionName from "../models/professionName";
import { resourceAbsent, internalServerError } from "./helpers";
import logger from "../utils/logger";

const professionNameSchema = Joi.object({
  name: Joi.string().required(),
});

const validateProfessionNameRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await professionNameSchema.validateAsync({
      ...req.body,
    });
    // TODO validate according to its value
    logger.debug(value);
    next();
  } catch (err) {
    return resourceAbsent(res);
  }
};

// TODO check auth as admin
router.post(
  "/add-profession",
  validateProfessionNameRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    // check if the same name exists in the database or not
    const profession = new ProfessionName({ name });
    try {
      await profession.save();
      res.send("reached");
    } catch (err) {
      return internalServerError(res);
    }
  }
);

export default router;
