import Joi from "joi";

export const addProfessionSchema = Joi.object({
  name: Joi.string().required(),
});

export const deleteProfessionSchema = Joi.object({
  professionId: Joi.string().required(),
});

export const editProfessionSchema = deleteProfessionSchema.keys({
  name: Joi.string().required(),
});
