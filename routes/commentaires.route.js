import express from 'express'
import commentairesController from '../controllers/commentaires.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const routeur = express.Router()

routeur.post('/', verifyToken, commentairesController.addCom)
routeur.put('/', verifyToken, commentairesController.modify)
routeur.get('/', verifyToken, commentairesController.showAll)
routeur.get('/:id',verifyToken, commentairesController.theseComs)
routeur.delete('/:id', verifyToken, commentairesController.remove)

export default routeur 