import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import FeedRouter from './routers/feed-routers.js';
import UserRouter from './routers/user-routers.js';

dotenv.config()

const server = express()

server
      .use(cors())
      .use(express.json())
      .get("/health", (req,res)=> res.send("OK!"))
      .use(UserRouter)
      .use(FeedRouter)

      server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`)
    })