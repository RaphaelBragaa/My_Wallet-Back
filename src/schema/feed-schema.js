import Joi from "joi";

export const cashSchema=Joi.object({
    value:Joi.string().required() ,
    description:Joi.string().required(),
    isEntry:Joi.boolean()
})