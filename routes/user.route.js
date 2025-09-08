import express from 'express'
import userController from '../controllers/user.controller.js'

const routeur = express.Router()

routeur.get('/', userController.showAll)
routeur.get('/:id', userController.showOne)
routeur.post('/', userController.addUser)
routeur.delete('/:id', userController.remove)
routeur.put('/:id', userController.update)

export default routeur 