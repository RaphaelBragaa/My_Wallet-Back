import express from 'express'
import {dadosUser,moneyUser,moneyUserGET} from '../controllers/controllers.js'

const FeedRouter =express.Router()

FeedRouter.get('/posts', dadosUser)
FeedRouter.post('/moneys', moneyUser)
FeedRouter.get('/moneys',moneyUserGET)

export default FeedRouter