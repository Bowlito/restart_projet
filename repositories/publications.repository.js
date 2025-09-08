import connection from '../config/db.config.js'

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

export default { findFiveLast }