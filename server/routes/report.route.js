import { Router } from "express";

import { reportValidation } from "../utils/express-validators.js";
import multer from "multer";

import { addReport } from '../controllers/report.controller.js';
import { authenticate } from "../middleware/authMiddleware.js";
import User from "../models/user.model.js";

const router = Router();

const upload = multer({
    storage : multer.memoryStorage(),
})

router.post('/' , authenticate ,  upload.single("image") , addReport)

router.get('/', authenticate ,async (req , res) => {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("reports");
    res.send(user);

})


export default router;