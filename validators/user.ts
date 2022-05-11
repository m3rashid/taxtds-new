import Joi from "joi";

export const deleteUserSchema = Joi.object({
  userId: Joi.string().required(),
});

export const emailUserSchema = Joi.object({
  emailId: Joi.string().email().required(),
  name: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});
