import { Router }from 'express'
import { SignUp,Login} from '../controllers/auth-controllers.js'

const UserRouter = Router()
UserRouter
          .post('/login', Login)
          .post('/signup', SignUp)

export default UserRouter;