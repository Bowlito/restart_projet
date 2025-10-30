import { id } from 'yup-locales'
import connection from '../config/db.config.js'


const createPublication = async (publication) => {
    const INSERT = "INSERT INTO publication(titre, corps, chemin_image, id_users) VALUES(?, ?, ?, ?)"

    try {
        const resultat = await connection.query(INSERT, [publication.titre, publication.corps, publication.chemin_image, publication.id_users])
        publication.id = resultat[0].insertId
        return publication
    } catch (error) {
        console.log("Erreur de la fonction createPublication : ", error);
        return null;

    }
}



const showPublications = async () => {
    const SELECT = "SELECT * FROM publication ORDER BY created_at DESC"
    try {
        const publications = await connection.query(SELECT)
        return publications[0]
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findById = async (id) => {
    const SELECT = "SELECT * FROM publication WHERE id_publication=?"
    try {
        const publications = await connection.query(SELECT, [id])
        return publications[0][0]
    } catch (error) {
        console.log("ERREUR COM BDD : ", error);
        return null

    }
}

const deleteById = async(id) => {
    const DELETE = "DELETE FROM publication WHERE id_publication=?"
    try {
        await connection.query(DELETE, id)
    } catch (error) {
        console.log("Erreur lors de la suppression dans le repo : " ,error);
        
    }
}

const modifyById = async(publication) => {
    const UPDATE = "UPDATE publication SET titre=?, corps=?, chemin_image=? WHERE id_users=? AND id_publication=?"
    try {
        const post = await connection.query(UPDATE, [publication.titre, publication.corps, publication.chemin_image, publication.id_users, publication.id_publication])
        return post
    } catch (error) {
         console.log("Erreur lors de la modification dans le repo : " ,error);
    }
}

const countPublicationByUserId = async(userId) => {
    const SELECT = "SELECT COUNT(*) AS NumberOfPost FROM publication WHERE id_users=?"
    try {
        //const compte = await connection.query(SELECT, [userId])
        const [[{NumberOfPost}]] = await connection.query(SELECT, [userId])

        console.log(NumberOfPost);
        
        
        return Number(NumberOfPost)
    } catch (error) {
        console.log("Erreur lors du compte dans le repo : " ,error);
    }
}

const mostFamousPost = async(userId) => {
    const SELECT = "SELECT p.id_publication, p.titre, COUNT(c.id_com) AS nbrComs FROM publication p LEFT JOIN commentaire c ON c.id_publication = p.id_publication WHERE p.id_users = ? GROUP BY p.id_publication ORDER BY nbrComs DESC LIMIT 1"

    try {
        const [publication] = await connection.query(SELECT, [userId])
        
        console.log(publication[0]);
        
        return publication[0] || null
    } catch (error) {
        console.log("Erreur lors de la sélection dans le repo : " ,error);
    }
}
export default { showPublications, createPublication, findById, deleteById,  modifyById, countPublicationByUserId, mostFamousPost}