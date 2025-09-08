//import yup from '../config/yup.config.js'
import userRepository from '../repositories/user.repository.js'

const showAll = async (req, res, next) => {
    const users = await userRepository.findAll()
    return res
        .status(200)
        .json(users)
}


export default { showAll }