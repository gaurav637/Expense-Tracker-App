import express from "express";
import { signupController, loginController, editUserController } from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
    "/signup", 
    signupController
);

router.post(
    "/login", 
    loginController
);

router.put(
    "/edit/:userId", 
    authMiddleware, 
    editUserController
);

export default router;
