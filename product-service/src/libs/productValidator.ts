import Joi from "joi";
import { Product } from "src/types";

export const checkProductDtoValidity = (
  product: Pick<
    Product,
    "count" | "description" | "date" | "location" | "price" | "title" | "image"
  >
): Joi.ValidationResult => {
  const schema = Joi.object({
    count: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    location: Joi.string().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(product);
};

export const checkProductValidity = (
  product: Product
): Joi.ValidationResult => {
  const schema = Joi.object({
    id: Joi.string().required(),
    count: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    location: Joi.string().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(product);
};
