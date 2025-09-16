import { Router } from "express";
import { login, register, adminDashboard, userDashboard } from "../controllers/auth.controller.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";
import { registerValidation, loginValidation } from "../utils/authValidators.js";

const router = Router();

// Register
router.post("/register", registerValidation, register);

// Login
router.post("/login", loginValidation, login);

// Protected routes
router.get("/user", authenticate, authorizeRoles("user"), userDashboard);
router.get("/admin", authenticate, authorizeRoles("admin"), adminDashboard);

export default router;
