import yup from "../config/yup.config.js";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";

const userSchema = yup.object().shape({
  nom: yup
    .string()
    .required()
    .matches(
      /^[A-Z]{1}.{2,19}$/,
      "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"
    ),
  prenom: yup
    .string()
    .min(
      3,
      (args) =>
        `Le prénom doit contenir au moins ${args.min} caractères, valeur saisie : ${args.value} `
    )
    .max(20),
  email: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: yup
    .string()
    .min(
      2,
      (args) => `Le mot de passe doit contenir au moins ${args.min} caractères.`
    )
    .max(20),
});



const addUser = async (userData) => {
  try {
    await userSchema.validate(userData, { abortEarly: false });

    const existingUser = await userRepository.findByEmail(userData.email);

    
    if (existingUser) {
      console.log(existingUser.email === userData.email);
    }

    if (existingUser && existingUser.email === userData.email) {
      throw new Error("Utilisateur déjà enregistré");
    }

    const user = await userRepository.save(userData);
    return user;
  } catch (error) {
    throw error;
  }
};


export default { addUser };
