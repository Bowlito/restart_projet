import yup from '../config/yup.config.js'
import publicationsRepository from '../repositories/publications.repository.js'

const lastFive = async(req, res, next) => {
    const publications = await publicationsRepository.findFiveLast()
    return res
        .status(200)
        .json(publications)
        
}

export default { lastFive }

