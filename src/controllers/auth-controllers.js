
import bcrypt from 'bcrypt';
import AuthenticationRepository from "../repositories/user-repository/index.js"
import {signInSchema, signUpSchema} from "../schema/authentication-schema.js"
import jwt from "jsonwebtoken";


export async function SignUp(req,res){
    const SignUp = req.body
    const validation = signUpSchema.validate(SignUp,{abortEarly:true})
    if(validation.error) return res.status(422).send(validation.error.details[0].message)
    const hash = bcrypt.hashSync(SignUp.password,10)
    try{
       const insertUser = await AuthenticationRepository.createUser(SignUp,hash)
       if(!insertUser) return res.status(500).send()
       
       res.sendStatus(201)
    }catch(error){
        console.error(error)
        return res.sendStatus(401);
    }

}
export async function Login(req,res){
    const login=req.body
    const key = process.env.JWT_SECRET;
    const validation=signInSchema.validate(login,{abortEarly:true})
    if(validation.error) return res.status(422).send(validation.error.details[0].message)
    try{
        const user = await AuthenticationRepository.findUser(login.email)
        console.log(user)

        if(user && bcrypt.compareSync(login.password, user.password)){
            const token= jwt.sign({ user: user.id }, key);
            await AuthenticationRepository.createToken(user,token)
           res.send(token)
        }else{
            return res.sendStatus(401)
        }
    }catch(error){
        console.error(error)
        return res.status(401)
    }
}
