import { Router }from 'express'
import { loginUser,cadastrarUser } from '../controllers/controllers.js'

const UserRouter = Router()
UserRouter
          .post('/login', loginUser)
          .post('/signup', cadastrarUser)

export default UserRouter;