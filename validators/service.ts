import Joi from "joi";

export const addServiceSchema = Joi.object({
  name: Joi.string().required(),
});

export const deleteServiceSchema = Joi.object({
  serviceId: Joi.string().required(),
});

export const editServiceSchema = deleteServiceSchema.keys({
  name: Joi.string().required(),
});
