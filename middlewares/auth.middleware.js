import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    console.log("Voici le token : ", token);

    try {

        const isFriend = jwt.verify(token, process.env.JWT_SECRET)

        req.user = isFriend;
        next();

    } catch (error) {
        return res.status(401).json({message: "INTRUS!!!!"})
    }
   

   
    
}