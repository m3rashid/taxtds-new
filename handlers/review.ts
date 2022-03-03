import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
const router = express.Router();

import Review from "../models/review";
import { resourceAbsent, internalServerError } from "./helpers";
import logger from "../utils/logger";

const reviewSchema = Joi.object({
  name: Joi.string(),
  rating: Joi.number().integer().min(0).max(10).required(),
  comment: Joi.string(),
  service: Joi.string().required(), // service id
});

const validateReviewRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await reviewSchema.validateAsync({ ...req.body });
    // TODO validate according to its value
    logger.debug(value);
    next();
  } catch (err) {
    return resourceAbsent(res);
  }
};

router.post(
  "/add-review",
  validateReviewRequest,
  (Req: Request, res: Response) => {
    res.send("reached");
  }
);

export default router;
