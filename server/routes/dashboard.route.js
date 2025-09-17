import { Router } from "express";
import { getAllReview, getAllUser , getUser , getReport } from "../controllers/dashboard.controller.js"

const router = Router();

router.get("/allusers", getAllUser); 
router.get("/allreports", getAllReview);
router.get("/user/:userid", getUser);
router.get("/report/:reportid", getReport);


export default router;
