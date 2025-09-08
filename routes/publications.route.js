import express from 'express'
import publicationsController from '../controllers/publications.controller.js'

const routeur = express.Router()

routeur.get('/', publicationsController.lastFive)

export default routeur