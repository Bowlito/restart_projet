import yup from "../config/yup.config.js";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";
import userServices from "../services/user.services.js";
import jwt from "jsonwebtoken"

const showAll = async (req, res, next) => {
	const users = await userRepository.findAll();
	return res.status(200).json(users);
};

const showOne = async (req, res, next) => {
	const id = req.params.id;
	const user = await userRepository.findById(id);
	if (user) {
		return res
			.status(200)
			.json(user);
	}
	return res.sendStatus(404);
};

const signUp = async (req, res, next) => {
	try {
		const data = req.body;
		const user = await userServices.addUser(data);
		return res.status(201).json(user);
	} catch (error) {
		console.log("Erreur : ", error.message || error);
		return res.status(400).json({ message: error.message || "Bad Request" });
	}
};

const remove = async (req, res, next) => {
	const id = req.params.id;
	const user = await userRepository.findById(id);

	if (user) {
		await userRepository.deleteById(id);
		return res.sendStatus(204);
	}
	return res.sendStatus(404);
};

const update = async (req, res, next) => {
	if (req.params.id != req.body.id) {
		return res.sendStatus(400).json(req.body);
	}
	if (!(await userRepository.findById(req.params.id))) {
		return res.sendStatus(404);
	}
	userSchema
		.validate(req.body, { abortEarly: false })
		.then(async () => {
			await userRepository.update(req.body);
			return res.status(202).json(req.body);
		})
		.catch((err) => {
			console.log(err);
			return res.sendStatus(500);
		});
};

const login = async (req, res, next) => {
	const email = req.body.email;
	const user = await userRepository.findByEmail(email);

	if (!user) {
		console.log("Utilisateur introuvable");
		return res.sendStatus(401);
	}
	if (await bcrypt.compare(req.body.password, user.password)) {
		const payload = {
			id: user.id_users,
			nom: user.nom,
			prenom: user.prenom,
			email: user.email,
			role: user.role
		}

		const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "5d"})

		return res.status(200).json({
			id: user.id_users,
			nom: user.nom,
			prenom: user.prenom,
			email: user.email,
			role: user.role,
			token: token
		});
	} else {
		console.log("Mot de passe erroné.");
		return res.status(401).json({message: "Informations de connexion incorrectes"});
	}


};



export default { showAll, showOne, signUp, remove, update, login };
