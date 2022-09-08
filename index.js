import express  from "express";
import cors from 'cors';
import joi from 'joi';
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';

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
    try{

    }catch(error){

    }
})

server.post('/cadastro', async (req,res)=>{
    try{

    }catch(error){

    }
})

server.get('/registros',async(req,res)=>{

})

server.listen(5000)



