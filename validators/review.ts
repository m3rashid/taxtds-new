import Joi from "joi";

export const reviewSchema = Joi.object({
  name: Joi.string(),
  rating: Joi.number().integer().min(0).max(10).required(),
  comment: Joi.string(),
  service: Joi.string().required(), // service id
});
