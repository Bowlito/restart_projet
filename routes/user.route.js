import express from 'express'
import userController from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { verifyRole } from '../middlewares/role.middleware.js'
import { isNotAuth } from '../middlewares/noAuth.middleware.js'

const routeur = express.Router()

routeur.get('/', userController.showAll)
routeur.get('/:id',verifyToken, userController.showOne)
routeur.post('/signUp', isNotAuth, userController.signUp)
routeur.post('/login', isNotAuth, userController.login)
routeur.delete('/:id', verifyToken, verifyRole, userController.remove)
routeur.put('/:id', verifyToken, verifyRole, userController.update)

export default routeur 