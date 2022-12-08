import express from 'express'
import {dadosUser,moneyUser,moneyUserGET} from '../controllers/controllers.js'

const router =express.Router()

router.get('/posts', dadosUser)

router.post('/moneys', moneyUser)

router.get('/moneys',moneyUserGET)

export default router