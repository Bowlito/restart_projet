import express from 'express'
import publicationsController from '../controllers/publications.controller.js'
import commentairesController from '../controllers/commentaires.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { verifUser } from '../middlewares/verifUser.middleware.js'

const routeur = express.Router()

routeur.get('/', publicationsController.showAll)
routeur.get('/:id', verifyToken, publicationsController.showOne)
routeur.get('/count/:id', verifUser, publicationsController.count)
routeur.get('/famous/:id', verifUser, publicationsController.famous)
routeur.get('/:id/commentaires', verifyToken, commentairesController.theseComs)
routeur.post('/create', verifyToken, verifUser, publicationsController.create)
routeur.put('/modify', verifyToken, verifUser,  publicationsController.modify)
routeur.delete('/:id', verifyToken,  publicationsController.remove)

export default routeur