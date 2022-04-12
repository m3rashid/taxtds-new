import Joi from "joi";

export const addListingSchema = Joi.object({
  brandName: Joi.string().required(),
  tagline: Joi.string().allow(""),
  owner: Joi.string().required().allow(""),
  phone: Joi.number().required(),
  email: Joi.string().required(),
  established: Joi.string().allow(""),
  addressLineOne: Joi.string().required(),
  addressLineTwo: Joi.string().allow(""),
  state: Joi.string().required().allow(""),
  services: Joi.any().required(),
});

export const editListingSchema = addListingSchema.keys({
  id: Joi.string().required(),
});

export const getOneListingSchema = Joi.object({
  listingId: Joi.string().required(),
});

export const removeListingSchema = getOneListingSchema;

export const deleteListingSchema = getOneListingSchema;

export const featureUnfeatureListingSchema = getOneListingSchema.keys({
  toFeature: Joi.boolean().required(),
});
