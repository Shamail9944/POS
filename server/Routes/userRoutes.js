import express from "express";
import { registerController, loginController } from "../Controllers/userController.js";


const router = express.Router();

// ------------ Routes ------------ //

//Method - post
router.post("/register", registerController)
//Method - post
router.post("/login", loginController)

export default router;
