import Joi from "joi";

export const reviewSchema = Joi.object({
  name: Joi.string(),
  rating: Joi.number().integer().min(0).max(10).required(),
  review: Joi.string(),
  listingId: Joi.string().required(),
});
