import logger from "../utils/logger.js";
import { signup, login, editUser} from '../services/users.services.js';
//import * as userService from "../services/user.service.js"; 

export const signupController = async (req, res) => {
    try {
        logger.info(`SignUp FLow Started....`);
        const user = await signup(req.body);
        logger.info("user ",user);
        res.status(201).json({
            message: "User created successfully",
            statusCode: 201,
            user,
        });
    } catch (error) {
        logger.error(`Failed to SignUp New User!!`);
        res.status(400).json({ error: error.message });
    }
};

export const loginController = async (req, res) => {
    try {
        logger.info(`Login User:- ${req.body.email}`);
        //const { email, password } = req.body;
        const token = await login(req.body);
        logger.info(`User Login Successfully`);
        res.status(200).json({
            message: "Login successful",
            statusCode: 200,
            token,
        });
    } catch (error) {
        logger.error("Faield to login user!!");
        res.status(400).json({ error: error.message });
    }
};


export const editUserController = async (req, res) => {
    try {
        const {userId} = req.params;
        logger.info(`Update User ${userId} Details`);
        const updatedUser = await editUser(userId, req.body);
        logger.info(`User Details Updated Successfully...`);
        res.status(200).json({
            message: "User updated successfully",
            statusCode: 200,
            updatedUser,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
