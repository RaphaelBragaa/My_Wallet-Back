import express from 'express'
import {loginUser,cadastrarUser} from '../controllers.js'

const router=express.Router()
router.post('/login', loginUser)

router.post('/cadastro', cadastrarUser)

export default router