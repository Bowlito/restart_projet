import yup from '../config/yup.config.js'
import bcrypt from 'bcrypt'
import userRepository from '../repositories/user.repository.js'

const userSchema = yup.object().shape({
    nom: yup
        .string()
        .required()
        .matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"),
    prenom: yup
        .string()
        .min(3, (args) => `Le prénom doit contenir au moins ${args.min} caractères, valeur saisie : ${args.value} `)
        .max(20),
    email: yup
        .string()
        .required()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: yup
        .string()
        .min(2, (args) => `Le mot de passe doit contenir au moins ${args.min} caractères.`)
        .max(20)

})

const showAll = async (req, res, next) => {
    const users = await userRepository.findAll()
    return res
        .status(200)
        .json(users)
}

const showOne = async (req, res, next) => {
    const id = req.params.id
    const user = await userRepository.findById(id)
    if (user) {
        return res
            .status(200)
            .json(user)
    }
    return res
        .sendStatus(404)
}

const addUser = async (req, res, next) => {
    userSchema
        .validate(req.body, {abortEarly: false})
        .then(async () => {
            const user = await userRepository.save(req.body)
            
            if (user == null) {
                return res.sendStatus(404)
            }
            return res
                .status(201)
                .json(user)
        })
        .catch(async err =>{
            res
                .sendStatus(500)
        } )
}

const remove = async (req, res, next) => {
    const id = req.params.id
    const user = await userRepository.findById(id)

    if (user) {
        await userRepository.deleteById(id)
        return res
            .sendStatus(204)

    }
    return res
        .sendStatus(404)
}

const update = async (req, res, next) => {
    if (req.params.id != req.body.id) {
                
        return res
            .sendStatus(400)
            .json(req.body)

    }
    if (!await userRepository.findById(req.params.id)) {
        return res.sendStatus(404)
    }
    userSchema
        .validate(req.body, { abortEarly: false })
        .then(async () => {
            await userRepository.update(req.body)
            return res
                .status(202)
                .json(req.body)

        })
        .catch(err => {
            console.log(err);
            return res
                .sendStatus(500)
        })
}

const login = async (req, res, next) => {
    const email = req.body.email
    const user = await userRepository.findByEmail(email)

    if (!user) {
        console.log("Utilisateur introuvable");
        return res
            .sendStatus(401)
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
        return res
            .status(200)
            .json({ message: "Connexion réussie" });
            
    } else {
        console.log("Mot de passe erroné.");
        return res
            .sendStatus(401)
        
    }
}



export default { showAll, showOne, addUser, remove, update, login }