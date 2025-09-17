import { Router } from "express";
<<<<<<< HEAD
import { getAllReview, getAllUser , getUser , getReport } from "../controllers/dashboard.controller.js";
import {authenticate} from '../middleware/authMiddleware.js';

const router = Router();

router.get("/allusers", authenticate , getAllUser); // all user for report show on map  
router.get("/allreports" , authenticate , getAllReview); //all reports 
router.get("/user/:userid", authenticate , getUser); // specific user details
router.get("/report/:reportid" , authenticate , getReport); // specific report details
=======
import { getAllReview, getAllUser , getUser , getReport } from "../controllers/dashboard.controller.js"
import { authenticate } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/allusers", getAllUser); 
router.get("/allreports", getAllReview);
router.get("/user/:userid",authenticate, getUser);
router.get("/report",authenticate, getReport);
>>>>>>> 8634b690e2335e246fa175ce78ed7f6aeb0d6eaf


export default router;
