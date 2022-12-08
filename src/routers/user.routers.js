import express from 'express'
import {loginUser,cadastrarUser} from '../controllers/controllers.js'

const router=express.Router()
router.post('/login', loginUser)

router.post('/signup', cadastrarUser)

export default router