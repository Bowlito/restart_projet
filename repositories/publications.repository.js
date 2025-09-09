import connection from '../config/db.config.js'




const createPublication = async(publication) => {
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



const findFiveLast = async() => {
    const SELECT = "SELECT * FROM publication ORDER BY created_at DESC LIMIT 5"
    try {
       const publications =  await connection.query(SELECT)
       return publications[0]
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default { findFiveLast, createPublication }