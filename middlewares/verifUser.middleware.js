export const verifUser = (req, res, next) => {
    try {
        const { id_users } = req.body;

        console.log("L ID DU USER : ",id_users);
        console.log("L ID DE L AUTEUR : ",req.user.id);
        console.log("USER: ", req.user);
        console.log("Verif: ", req.user.id === id_users);
        

        if (!id_users) {
            return res
                .status(400)
                .json({ message: "id_users manquant dans la requête" });
        }

        if (req.user.id!== id_users) {
            return res.status(403).json({
                message: "Vous ne pouvez pas agir pour un autre utilisateur",
            });
        }
        next();
    } catch (error) {
        res.status(403).json({ message: "Une erreur sauvage est apparue: ", error });
    }
};
