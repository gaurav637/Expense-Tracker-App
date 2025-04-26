import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const signup = async (reqBody) => {
    logger.info(`User Service:: Signup Flow in UserService...`, reqBody);
    console.log("reqBody -> ", reqBody);
    const { name, email, password } = reqBody;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }

    const user = new User({ name, email, password });
    await user.save();
    const token = user.generateAuthToken();
    logger.info(`Token: ${token}`);

    return { user, token };
};

export const login = async (reqBody) => {
    try {
        const { email, password } = reqBody;
        logger.info(`User Service:: Login User Email:- ${email}`);
        
        const user = await User.findOne({ email }); 
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        logger.info(`User Service:: Password Check Result: ${isMatch}`); 
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const token = user.generateAuthToken();
        return { user, token };
    } catch(error) {
        logger.error(`User Service:: Failed to login user! Reason: ${error.message}`);
        throw new Error(`Failed to login user! Reason: ${error.message}`);
    }
};

export const editUser = async (userId, { name, email, avatarImage }) => {
    logger.info(`User Service:: Update User Services...`);
    const user = await User.findById(userId);
    if (!user) {
        logger.warn("User Not Found!!!");
        throw new Error("User not found");
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (avatarImage) user.avatarImage = avatarImage;
    logger.info(`User Details Updated Successfully..`);
    await user.save();
    return user;
};
