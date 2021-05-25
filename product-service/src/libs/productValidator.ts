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
    description: Joi.number().required(),
    date: Joi.number().required(),
    location: Joi.number().required(),
    title: Joi.number().required(),
    image: Joi.number().required(),
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
    description: Joi.number().required(),
    date: Joi.number().required(),
    location: Joi.number().required(),
    title: Joi.number().required(),
    image: Joi.number().required(),
  });

  return schema.validate(product);
};
