import { Router } from "express";
const router = Router();
import { updateStatus ,compeleteStatus } from "../controllers/report.controller.js";

import multer from "multer";
import { authenticate } from "../middleware/authMiddleware.js";

const upload = multer({
    storage : multer.memoryStorage(),
})

router.post('/:postId' , updateStatus );
router.post('/complet/:postId', authenticate , upload.single('image') , compeleteStatus );


export default router