import express from "express";
import { login, register } from "../controllers/userAuth.controller.js";
import { registerValidation, loginValidation } from "../utils/express-validators.js";

const router = express.Router();

// Register
router.post("/register", registerValidation , register);

// Login
router.post("/login", loginValidation, login);




export default router;
