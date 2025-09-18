import { Router } from "express";
import { getAllReview, getAllUser , getUser , getReport } from "../controllers/dashboard.controller.js";
import {authenticate} from '../middleware/authMiddleware.js';

const router = Router();

router.get("/allusers", authenticate , getAllUser); // all user for report show on map  
router.get("/allreports" , authenticate , getAllReview); //all reports 
router.get("/user/:userid", authenticate , getUser); // specific user details
router.get("/report" , authenticate , getReport); // specific report details


export default router;
