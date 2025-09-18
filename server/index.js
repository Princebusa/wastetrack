import express from "express";
const app = express();

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/dbConnection.js' ;
import UserRouter from "./routes/user.route.js";
import ReportRouter from "./routes/report.route.js";
import getAllDataRouter from "./routes/dashboard.route.js";
import PostRouter from "./routes/post.route.js"
import UpdateRouter from "./routes/adminDashboard.route.js"
import { authenticate } from "./middleware/authMiddleware.js";
import AdminRouter from "./routes/admin.route.js"
import User from "./models/user.model.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//router 

app.get('/user' , authenticate , async (req , res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select(" -password");
        res.send({data : user});
    } catch (error) {
        res
    .status(500)
    .json({ success: false, message: "Server error", error: error.message });
  
    }
});

app.use('/api/auth' , UserRouter); // user login-Signup
app.use('/api/auth/admin', AdminRouter) // admin login-signup
app.use('/api/report' , ReportRouter ); // user report create / show 
app.use('/api/get' , getAllDataRouter ); // show all Users and Reports
app.use('/api/posts' , PostRouter ); // CRUD in Post
app.use('/api/report/update' , UpdateRouter);

// connect to Database 
connectDB();

app.listen(process.env.PORT , () => {
    console.log(`server is listening on ${process.env.PORT}`)
});