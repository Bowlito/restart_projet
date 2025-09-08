import connection from '../config/db.config.js'

const findAll = async () => {
    const SELECT = "SELECT * FROM users"
    try {
        const resultat = await connection.query(SELECT)
        return resultat[0]

    } catch (error) {
        console.log(error);
        return null
    }
}

export default { findAll }