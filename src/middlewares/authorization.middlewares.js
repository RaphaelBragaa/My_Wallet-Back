import {nextTick}from 'process'
import joi from 'joi';

const SignSchema=joi.object({
    email:joi.string().email(),
    password:joi.string().required()
})

export default function Authorization(req,res,next){
    const {email,password}=req.body
    const login=req.body
    const validation=loginSchema.validate(login,{abortEarly:true})
    if(validation.error) return res.status(422).send(validation.error.details[0].message)
    next()
     }
    