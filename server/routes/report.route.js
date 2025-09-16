import { Router } from "express";

const router = Router();


router.post('/create' , (req , res) => {
    res.send("it is working well");
})


export default router;