import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerOneSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const registerTwoSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(30).required(),
  otp: Joi.number().integer().min(0).max(999999).required(),
  phone: Joi.string().required(),
  experience: Joi.number().min(0).max(100),
  addressLineOne: Joi.string().min(3).max(50).required(),
  addressLineTwo: Joi.string().min(3).max(50).allow(""),
  state: Joi.string().min(3).max(30).required(),
  professions: Joi.array().items(Joi.string()),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");
