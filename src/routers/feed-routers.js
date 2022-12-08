import express from 'express'
import {dadosUser,moneyUser,moneyUserGET} from '../controllers/cash-controller.js'
import { validateSessionByToken } from '../middlewares/authorization.middlewares.js'

const FeedRouter =express.Router()
FeedRouter
          .all("/*", validateSessionByToken)
          .get('/posts', dadosUser)
          .post('/moneys', moneyUser)
          .get('/moneys',moneyUserGET)

export default FeedRouter