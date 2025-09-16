import express from "express";
import { login, register, adminDashboard, userDashboard } from "../controllers/auth.controller.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";
import { registerValidation, loginValidation } from "../utils/express-validators.js";

const router = express.Router();

// Register
router.post("/register", registerValidation, register);

// Login
router.post("/login", loginValidation, login);

router.get('/' , (req , res) => {
    res.send("helo ")
})
// Protected routes
router.get("/user", authenticate, authorizeRoles("citizen"), userDashboard);
router.get("/admin", authenticate, authorizeRoles("admin"), adminDashboard);

export default router;
