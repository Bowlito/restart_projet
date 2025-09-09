import { id } from 'yup-locales'
import connection from '../config/db.config.js'
import bcrypt from 'bcrypt'

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

const findById = async (id) => {
    const SELECT = "SELECT * FROM users WHERE id_users=?"
    try {
        const resultat = await connection.query(SELECT, id);
        return resultat[0][0]
    } catch (error) {
        console.log(error);
        return null
    }
}

const findByEmail = async (email) => {
    const SELECT = "SELECT * FROM users where email=?"
    try {
        const resultat = await connection.query(SELECT, [email])
        return resultat[0][0]
    } catch (error) {
        console.error("Erreur findByEmail pour email:", email, error);
        return null
    }
}


const save = async (user) => {
        
    const INSERT = "INSERT INTO users values (null, ?, ?, ?, ?, ?)"
    
    try {
        const resultat = await connection.query(INSERT, [user.nom, user.prenom, user.email, (await bcrypt.hash(user.password, 10)).toString(), "user"])
        user.id = resultat[0].insertId
        return user
    } catch (error) {
        console.log(error);
        return null
    }
}

const deleteById = async (id) => {
    const DELETE = "DELETE FROM users WHERE id_users=?"
    try {
        await connection.query(DELETE, id);
    } catch (error) {
        console.log(error);
    }
}


const update = async (user) => {
    const UPDATE = "UPDATE users SET nom=?, prenom=?, email=?, password=? WHERE id_users=?"
    try {
        const resultat = await connection.query(UPDATE, [user.nom, user.prenom, user.email, (await bcrypt.hash(user.password, 10)).toString(), user.id])
        if (resultat[0].affectedRows > 0) {
            return user
        }
    } catch (error) {
        console.log(error);
    }
    return null
}

export default { findAll, save, deleteById, findById, update, findByEmail }