import Joi from "joi";

export const SigninSchema=Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required()
})

export const cadastroSchema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email(),
    password:Joi.string().required()
})



