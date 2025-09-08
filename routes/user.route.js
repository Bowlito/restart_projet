import express from 'express'
import userController from '../controllers/user.controller.js'

const routeur = express.Router()

routeur.get('/', userController.showAll)

export default routeur 