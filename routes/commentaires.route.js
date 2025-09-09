import express from 'express'
import commentairesController from '../controllers/commentaires.controller.js'

const routeur = express.Router()

routeur.post('/', commentairesController.addCom)

export default routeur 