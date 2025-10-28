import yup from '../config/yup.config.js'
import publicationsServices from '../services/publications.services.js'
import publicationsRepository from '../repositories/publications.repository.js'

const showAll = async (req, res, next) => {
    try {
        const publications = await publicationsRepository.showPublications()
        if (publications.length < 1) {
            console.log("Aucune publication ...");

            return res
                .sendStatus(404)
        }
        return res
            .status(200)
            .json(publications)

    } catch (error) {
        console.log("Erreur dans l'affichage de la liste des publications");

        return res
            .sendStatus(500)
    }

}

const create = async (req, res, next) => {

    try {
        const publication = req.body
        const contenu = await publicationsServices.createPublication(publication)
        return res
            .status(201)
            .json(contenu)
    } catch (error) {
        res.status(400).json({ message: error })
    }

}

const modify = async (req, res, next) => {

    try {
        const post = req.body
        const existingPost = await publicationsRepository.findById(post.id_publication);

        if (!existingPost) {
            return res.sendStatus(404);
        }

        if ((existingPost.user_id !== req.user.id_users) && (req.user.role !== "admin")) {
            return res.status(403).json({ message: "Pas autorisé : vous n'êtes pas l'auteur" });
        }

        const contenu = await publicationsServices.modifyPost(post)
        return res
            .status(201)
            .json(contenu)
    } catch (error) {
        res.status(400).json({ message: error })
    }

}

const showOne = async (req, res, next) => {

    try {
        const id = req.params.id;
        const post = await publicationsRepository.findById(id);
        if (post) {
            return res
                .status(200)
                .json(post);
        }
        return res.sendStatus(404);
    } catch (error) {
        res.status(400).json({ message: error })
    }

};

const remove = async (req, res, next) => {

    try {

        const id = Number(req.params.id);
        const post = await publicationsRepository.findById(id)

        if (!post) {
            return res.sendStatus(404);
        }

        if ((post.user_id !== req.user.id_users) && (req.user.role !== "admin")) {
            return res.status(403).json({ message: "Pas autorisé : vous n'êtes pas l'auteur" });
        }
        await publicationsRepository.deleteById(id);
        return res.sendStatus(200);

    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export default { showAll, create, showOne, remove, modify }

