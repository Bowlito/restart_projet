import express from 'express'
import publicationsController from '../controllers/publications.controller.js'
import commentairesController from '../controllers/commentaires.controller.js'

const routeur = express.Router()

routeur.get('/', publicationsController.showAll)
routeur.get('/:id', publicationsController.showOne)
routeur.get('/:id/commentaires', commentairesController.theseComs)
routeur.post('/create', publicationsController.create)
routeur.put('/modify', publicationsController.modify)
routeur.delete('/:id', publicationsController.remove)

export default routeur