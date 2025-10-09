import express from 'express'
import commentairesController from '../controllers/commentaires.controller.js'

const routeur = express.Router()

routeur.post('/', commentairesController.addCom)
routeur.put('/', commentairesController.modify)
routeur.get('/', commentairesController.showAll)
routeur.get('/:id', commentairesController.theseComs)
routeur.delete('/:id', commentairesController.remove)

export default routeur 