
import joi from 'joi';
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dotenv from "dotenv";
import dayjs from "dayjs";
import mongo from './database/mongo.js'



//dotenv.config()
const time=dayjs()

let db = await mongo()

const loginSchema=joi.object({
    email:joi.string().email(),
    password:joi.string().required()
})

const cadastroSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().email(),
    password:joi.string().required()
})

const paySchema=joi.object({
    value:joi.string().required() ,
    description:joi.string().required(),
    isEntry:joi.boolean()
})

const tokenSchema=joi.object({
    toke:joi.string().token()
})

// const MongoCliente=new MongoClient(process.env.MONGO_URI)
//  let db

//  MongoCliente.connect(()=>{
//      db=MongoCliente.db('test')
//  })

export async function loginUser(req,res){
   
    const {email,password}=req.body
    const login=req.body
    const validation=loginSchema.validate(login,{abortEarly:true})
    if(validation.error) return res.status(422).send(validation.error.details[0].message)
    try{
        const user = await db.collection('users').findOne({email})
        console.log(user)

        if(user && bcrypt.compareSync(password, user.password)){
            const token= uuid()
            await db.collection("sessions").insertOne({
                userId:user._id,
                token
            })
            console.log(token)
           res.send(token)

        }else{
            console.log('não encontrado')
            return res.status(401).send('não encontrado usuário ou senha incorretos')
        }
    }catch(error){
        console.error(error)
        return res.status(401)
    }
}

export async function cadastrarUser(req,res){

    const cadastro = req.body
    const validation=cadastroSchema.validate(cadastro,{abortEarly:true})
    if(validation.error) return res.status(422).send(validation.error.details[0].message)
    const senhaHash= bcrypt.hashSync(cadastro.password,10)
    try{
        await db.collection('users').insertOne({...cadastro,password:senhaHash}) 
        res.status(201).send()
        return
    }catch(error){
        console.error(error)
        return res.status(401)
    }

}
export async function dadosUser(req,res){
const token=req.headers.authorization?.replace('Bearer ','')
const token1=req.headers.authorization
const validation=tokenSchema.validate(token1,{abortEarly:true})
if(validation.error) return res.status(422).send(validation.error.details[0].message)
if(!token) {return res.status(401).send('token não encontrado !')}

  const session = await db.collection('sessions').findOne({token:token})

if (!session) { return res.send(401)};

const user=await db.collection('users').findOne({_id:session.userId})
if(user){
    delete user.password
    res.send(user)
}else{
   return res.sendStatus(401)
}  
}

export async function moneyUser(req,res){
const token=req.headers.authorization?.replace('Bearer ','')
const validation1=tokenSchema.validate(token,{abortEarly:true})
if(validation1.error) return res.status(422).send(validation.error.details[0].message)
if (!token){return res.status(401).send('token não encontrado!')}
const {description, value, isEntry} = req.body
const pay =req.body
const validation=paySchema.validate(pay,{abortEarly:true})
if(validation.error) return res.status(422).send(validation.error.details[0].message)
const session = await db.collection('sessions').findOne({token:token})
if (!session) { return res.send(402)};
const user=await db.collection('users').findOne({_id:session.userId})
if(user){
     await db.collection('moneys').insertOne({
    user:session.userId,
    date:time.format('DD/MM'),
    description,
    value,
    isEntry
})
return res.sendStatus(201)
}else{
    return res.sendStatus(403)
}
}

export async function moneyUserGET(req,res){
const token=req.headers.authorization?.replace('Bearer ','')
if (!token){return res.status(401).send('token não encontrado!')}
const session = await db.collection('sessions').findOne({token:token})
if (!session) { return res.send(401)};
const user=await db.collection('moneys').find({user:session.userId}).toArray()
if(!user) { return res.send(401)};
res.send(user)
}