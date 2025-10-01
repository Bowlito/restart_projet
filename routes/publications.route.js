import express from 'express'
import publicationsController from '../controllers/publications.controller.js'

const routeur = express.Router()

routeur.get('/', publicationsController.showAll)
routeur.get('/:id', publicationsController.showOne)
routeur.post('/create', publicationsController.create)

export default routeur