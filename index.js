import express  from "express";
import cors from 'cors';
import joi from 'joi';
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const server=express()
server.use(cors())
server.use(express.json())

//dotenv.config()

const MongoCliente=new MongoClient('mongodb://127.0.0.1:27017')
let db

MongoCliente.connect().then(()=>{
    db=MongoCliente.db('test')
})

server.post('/login', async (req,res)=>{
    const {email,password}=req.body
    console.log(email)
    try{
        const user = await db.collection('users').findOne({email})
        if(user && bcrypt.compareSync(password, user.password)){
            const token= uuid()
            await db.collection("sessions").insertOne({
                user:user._id,
                token
            })
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
    const {authorization}=req.headers
    const token=authorization?.replace('Bearer ','')
    if(!token) return res.status(401).send()
    const session=await db.collection('sessions').insertOne({token}) 
    if(!session) return res.status(401).send()
    const user= await db.collection('users').findOne({ 
		_id: session.userId})
    if(user){
        delete user.password
        res.send(user)
    }else{
       return res.sendStatus(401)
    }
})

server.listen(5000)



