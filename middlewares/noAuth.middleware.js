export const isNotAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        return res.status(403).json({ message: "Vous êtes déjà connecté" });
    }
    next();
}