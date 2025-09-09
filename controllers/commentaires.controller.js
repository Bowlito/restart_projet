import yup from '../config/yup.config.js'
import commentairesRepository from '../repositories/commentaires.repository.js'

const addCom = async(req,res,next)=>{
    const com = await commentairesRepository.createCom(req.body)
    console.log("Commentaire ajouté");
    
    return res
        .status(201)
        .json(com)
}

export default { addCom }