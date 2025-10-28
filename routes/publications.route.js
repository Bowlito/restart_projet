import express from 'express'
import publicationsController from '../controllers/publications.controller.js'
import commentairesController from '../controllers/commentaires.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const routeur = express.Router()

routeur.get('/', publicationsController.showAll)
routeur.get('/:id', verifyToken, publicationsController.showOne)
routeur.get('/:id/commentaires', verifyToken, commentairesController.theseComs)
routeur.post('/create', verifyToken, publicationsController.create)
routeur.put('/modify', verifyToken, publicationsController.modify)
routeur.delete('/:id', verifyToken, publicationsController.remove)

export default routeur