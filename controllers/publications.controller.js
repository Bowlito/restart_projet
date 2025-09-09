import yup from '../config/yup.config.js'
import publicationsServices from '../services/publications.services.js'
import publicationsRepository from '../repositories/publications.repository.js'

const lastFive = async (req, res, next) => {
    try {
        const publications = await publicationsRepository.findFiveLast()
        if (publications.length < 1) {
            console.log("Aucune publication ...");

            return res
                .sendStatus(404)
        }
        return res
            .status(200)
            .json(publications)

    } catch (error) {
        return res
            .sendStatus(500)
    }

}

const create = async (req, res, next) => {
    const publication = req.body
    const contenu = await publicationsServices.createPublication(publication)
    return res
        .status(201)
        .json(contenu)
}

export default { lastFive, create }

