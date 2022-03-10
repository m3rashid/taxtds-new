import express from "express";
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
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const value = await reviewSchema.validateAsync({ ...req.body });
    logger.debug(JSON.stringify(value));
    next();
  } catch (err) {
    return resourceAbsent(res);
  }
};

router.post(
  "/add-review",
  validateReviewRequest,
  (Req: express.Request, res: express.Response) => {
    res.send("reached");
  }
);

export default router;
