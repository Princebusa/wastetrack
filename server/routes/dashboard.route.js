import { Router } from "express";
import { getAllReview, getAllUser , getUser , getReport } from "../controllers/dashboard.controller.js"
import { authenticate } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/allusers", getAllUser); 
router.get("/allreports", getAllReview);
router.get("/user/:userid",authenticate, getUser);
router.get("/report",authenticate, getReport);


export default router;
