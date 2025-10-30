import yup from '../config/yup.config.js'
import commentairesRepository from '../repositories/commentaires.repository.js'

const addCom = async (req, res, next) => {
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

const theseComs = async (req, res, next) => {
    const postId = Number(req.params.id)
    const coms = await commentairesRepository.showPostComs(postId);
    if (coms) {
        return res
            .status(200)
            .json(coms)
    }
    return res.sendStatus(404);
}

const remove = async (req, res, next) => {
    const id = Number(req.params.id);
    const com = await commentairesRepository.findById(id)

    if (com) {
        await commentairesRepository.removeCom(id)
        return res.sendStatus(200);
    }

    return res.sendStatus(404);
}

const modify = async (req, res, next) => {
    const com = req.body
    const contenu = await commentairesRepository.modCom(com)
    return res
        .status(200)
        .json(contenu)
}

const findPostByUser = async (req, res, next) => {


    try {
        const userId = req.params.id
        const count = await commentairesRepository.countUserComs(userId)


        return res.status(200).json(count)
    } catch (error) {
        return res
            .status(404).json(error.message)
    }
}

// const count = async(req, res, next) => {
//     try {
//         const userId = req.params.id 
//         const postId = 

//         const nbrPosts = await publicationsRepository.countPublicationByUserId(userId)
//         console.log(nbrPosts);

//         return res.status(200).json(nbrPosts)
//     } catch (error) {
//         res.status(400).json({ message: error })
//     }
// }

export default { addCom, theseComs, showAll, remove, modify, findPostByUser }