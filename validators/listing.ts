import Joi from "joi";

export const addListingSchema = Joi.object({
  brandName: Joi.string().required(),
  avatar: Joi.string().required(),
  gallery: Joi.array().min(1).max(3),
  services: Joi.array().min(1),
  addedBy: Joi.string().required(),
  established: Joi.string().allow(""),
  tagline: Joi.string().allow(""),
  owner: Joi.string().required().allow(""),
  addressLineOne: Joi.string().required(),
  addressLineTwo: Joi.string().allow(""),
  state: Joi.string().required().allow(""),
  phone: Joi.number().required(),
  email: Joi.string().required(),
  deleted: Joi.boolean(),
  featured: Joi.boolean(),
});

export const editListingSchema = addListingSchema.keys({
  _id: Joi.string().required(),
});

export const removeListingSchema = editListingSchema;
