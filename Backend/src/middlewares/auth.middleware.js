import jwt from "jsonwebtoken";
import User from "../models/users.models.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Access denied, token missing!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user; // Add user to request object for later use
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
