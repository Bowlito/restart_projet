import express from 'express'
import commentairesController from '../controllers/commentaires.controller.js'

const routeur = express.Router()

routeur.post('/', commentairesController.addCom)
routeur.get('/', commentairesController.showAll)
routeur.get('/:id', commentairesController.theseComs)

export default routeur 