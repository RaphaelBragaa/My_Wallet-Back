import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().required(),
});

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  confirmPassword: Joi.valid(Joi.ref("password")).required(),
});
