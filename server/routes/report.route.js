import { Router } from "express";

import { reportValidation } from "../utils/express-validators.js";
import multer from "multer";

import { addReport , getUserReports } from '../controllers/report.controller.js';
import { authenticate } from "../middleware/authMiddleware.js";


const router = Router();

const upload = multer({
    storage : multer.memoryStorage(),
})

router.post('/' , authenticate ,  upload.single("image") , authenticate , addReport)

router.get('/', authenticate , getUserReports ) // login user data or reports 


export default router;