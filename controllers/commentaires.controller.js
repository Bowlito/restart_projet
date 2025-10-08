import yup from '../config/yup.config.js'
import commentairesRepository from '../repositories/commentaires.repository.js'

const addCom = async(req,res,next)=>{
    const com = await commentairesRepository.createCom(req.body)
    console.log("Commentaire ajouté");
    
    return res
        .status(201)
        .json(com)
}

const showAll = async (req, res, next) => {
    try {
        const commentaires = await commentairesRepository.allComs()
        if (commentaires.length < 1) {
            console.log("Aucun commentaire ...");

            return res
                .sendStatus(404)
        }
        return res
            .status(200)
            .json(commentaires)

    } catch (error) {
        return res
            .sendStatus(500)
    }

}

const theseComs = async(req, res, next)=>{
    const postId = Number(req.params.id)
    const coms = await commentairesRepository.showPostComs(postId);
    if (coms) {
        return res
            .status(200)
            .json(coms)
    }
    return res.sendStatus(404);
}

const remove = async(req, res, next) => {
    const id = Number(req.params.id);
    const com = await commentairesRepository.findById(id)

    if (com) {
        await commentairesRepository.removeCom(id)
        return res.sendStatus(200);
    }

    return res.sendStatus(404);
}

export default { addCom, theseComs, showAll, remove }