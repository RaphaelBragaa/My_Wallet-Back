import express  from "express";
import cors from 'cors';
import userRouter from '../routers/user.routers.js'
import feedRouter from '../routers/feed.routers.js'

const server=express()
server.use(cors())
server.use(express.json())


server.use(userRouter)
server.use(feedRouter )



server.listen(5000)



