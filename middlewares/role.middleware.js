export const verifyRole = (req, res, next) => {
    

    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Pas autorisé" });
        }
        next();

    } catch (error) {
        res.status(403).json({ message: "Pas autorisé" })
    }

}