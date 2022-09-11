import express  from "express";
import cors from 'cors';
import joi from 'joi';
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dotenv from "dotenv";

const server=express()
server.use(cors())
server.use(express.json())

dotenv.config()

const MongoCliente=new MongoClient(process.env.MONGO_URI)
let db

MongoCliente.connect().then(()=>{
    db=MongoCliente.db('test')
})

server.post('/login', async (req,res)=>{
    const {email,password}=req.body
    console.log(email)
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
})

server.post('/cadastro', async (req,res)=>{
    const cadastro = req.body
    const senhaHash= bcrypt.hashSync(cadastro.password,10)
    try{
        await db.collection('users').insertOne({...cadastro,password:senhaHash}) 
        res.status(201).send()
        return
    }catch(error){
        console.error(error)
        return res.status(401)
    }
})

server.get('/posts',async(req,res)=>{
    const token=req.headers.authorization?.replace('Bearer ','')

    if(!token) {return res.status(401).send('token não encontrado !')}
  
      const session = await db.collection('sessions').findOne({token:token})
    console.log(session._userId)
    if (!session) { return res.send(401)};
   
    const user=await db.collection('users').findOne({_id:session.userId})
    if(user){
        delete user.password
        res.send(user)
    }else{
       return res.sendStatus(403)
    }
    // const session=await db.collection('sessions').findOne({token})
    // const test = `ObjectId(${session._id})`
    // console.log(`${test} é test`)
    // console.log(`${JSON.stringify(session._id)} é session`)
    // if(!session) return res.status(402).send('sessão não encontrada')
    // const user= await db.collection('users').findOne({ 
	// 	user: test})
    //     console.log(`${user} é user`)
    
})

server.listen(5000)



