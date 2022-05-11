import Joi from "joi";

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().integer().min(0).max(999999).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.ref("newPassword"),
}).with("newPassword", "confirmNewPassword");

export const updateUserInfoSchema = Joi.object({
  password: Joi.string().required(),
  updates: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().required(),
    experience: Joi.number().min(0).max(100),
    addressLineOne: Joi.string().min(3).max(50).required(),
    addressLineTwo: Joi.string().min(3).max(50).allow(""),
    state: Joi.string().min(3).max(30).required(),
    professions: Joi.array().items(Joi.string()),
  }),
});
