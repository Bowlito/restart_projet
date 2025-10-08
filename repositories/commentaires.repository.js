import { id } from 'yup-locales'
import connection from '../config/db.config.js'


const createCom = async (com) => {
    const INSERT = "INSERT INTO commentaire(corps, id_users, id_publication) VALUES(?, ?, ?)"
    try {
        const resultat = await connection.query(INSERT, [com.corps, com.id_users, com.id_publication])
        com.id_com = resultat[0].insertId
        return com
    } catch (error) {
        console.log("Erreur fonction createCom : " + error);
        return null
    }

}

const allComs = async () => {
    const SELECT = "SELECT * FROM commentaire"
    try {
        const resultat = await connection.query(SELECT)
        return resultat[0]
    } catch (error) {
        console.log("Erreur de com avec BDD : ", error);
        return null
    }
}

const showPostComs = async (postId) => {
    const SELECT = "SELECT c.id_com, c.corps, c.created_at, u.nom, u.prenom, u.id_users, c.id_users FROM commentaire c JOIN users u ON c.id_users = u.id_users   WHERE c.id_publication = ? ORDER BY c.created_at DESC"
    try {
        const resultat = await connection.query(SELECT, [postId]);
        return resultat[0];
    } catch (error) {
        console.log("Erreur de com avec BDD : ", error);
        return [];
    }
};

const findById = async (comId) => {
    const SELECT = "SELECT * FROM commentaire WHERE id_com=?"
    try {
        const commentaire = await connection.query(SELECT, comId)
        return commentaire[0][0]
    } catch (error) {
        console.log("ERREUR COM BDD : ", error);
        return null
    }
}

const removeCom = async (comId) => {
    const DELETE = "DELETE FROM commentaire WHERE id_com=?"
    try {
        await connection.query(DELETE, comId)
    } catch (error) {
        console.log("Erreur lors de la suppression dans le repo : ", error);
    }
}


// Fonction pour retrouver tous les coms d'un user sur une publication spécifique (si besoin? jcp)

// const checkCom = async(com) => {
//     const SELECT = "SELECT * FROM commentaire WHERE id_users=? AND id_publication=? ORDER BY created_at DESC"
//     try {
//         const resultat = await connection.query(SELECT, [com.id_users, com.id_publication])
//         return resultat[0]
//     } catch (error) {
//         return null
//     }
// }

export default { createCom, showPostComs, allComs, removeCom, findById }