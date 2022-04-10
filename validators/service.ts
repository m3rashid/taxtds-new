import Joi from "joi";

export const serviceSchema = Joi.object({
  name: Joi.string().required(),
});
