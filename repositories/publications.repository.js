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
        const publications = await connection.query(SELECT, id)
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

export default { showPublications, createPublication, findById, deleteById }