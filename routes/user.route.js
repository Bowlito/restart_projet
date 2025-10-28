import express from 'express'
import userController from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const routeur = express.Router()

routeur.get('/', verifyToken, userController.showAll)
routeur.get('/:id', userController.showOne)
routeur.post('/signUp', userController.signUp)
routeur.post('/login', userController.login)
routeur.delete('/:id', userController.remove)
routeur.put('/:id', userController.update)

export default routeur 