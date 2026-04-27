import jwt from "jsonwebtoken";
import "dotenv/config";

function authenticateToken (req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
    const secret = process.env.JWT_SECRET
    let decoded 
    try {
    decoded = jwt.verify(token, secret)
} catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
}
    if (decoded) {
        req.user = decoded
        next()
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
} else {
   return res.status(401).json({ message: "Unauthorized" });
}
}


export default authenticateToken