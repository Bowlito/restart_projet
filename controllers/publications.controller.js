import yup from '../config/yup.config.js'
import publicationsRepository from '../repositories/publications.repository.js'

const lastFive = async(req, res, next) => {
    const publications = await publicationsRepository.findFiveLast()
    return res
        .status(200)
        .json(publications)
        
}

const create = async (req, res, next) => {
    const publication = req.body
    const contenu  = await publicationsRepository.createPublication(publication)
    return res
        .status(201)
        .json(contenu)
}

export default { lastFive, create }

