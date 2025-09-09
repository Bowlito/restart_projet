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

export default { createCom }