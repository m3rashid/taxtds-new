import Joi from "joi";

export const professionSchema = Joi.object({
  name: Joi.string().required(),
});
