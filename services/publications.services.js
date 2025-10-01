import { id } from 'yup-locales';
import publicationsRepository from '../repositories/publications.repository.js';
import userRepository from '../repositories/user.repository.js';
import yup from 'yup';

// Schéma de validation avec Yup
const publicationSchema = yup.object().shape({
    titre: yup.string().required('Le titre est obligatoire').max(255),
    corps: yup.string().required('Le contenu est obligatoire'),
    id_users: yup.number().integer().required('L’utilisateur est obligatoire')
});

const createPublication = async (publicationData) => {
    const user = await userRepository.findById(publicationData.id_users)

    const publication = await publicationSchema.validate(publicationData, { abortEarly: false });

    if (!user) {
        throw new Error("utilisateur inconnu")
    }
    try {
        const createdPublication = await publicationsRepository.createPublication(publication, publication.chemin_image);
        return createdPublication;

    } catch (error) {

        throw error;
    }
};



export default { createPublication }