import Joi from "joi";

const paySchema=Joi.object({
    value:Joi.string().required() ,
    description:Joi.string().required(),
    isEntry:Joi.boolean()
})