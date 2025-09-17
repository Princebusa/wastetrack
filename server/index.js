import express from "express";
const app = express();

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/dbConnection.js' ;
import UserRouter from "./routes/user.route.js";
import ReportRouter from "./routes/report.route.js";
import DashboardRouter from "./routes/dashboard.route.js";
import PostRouter from "./routes/post.route.js"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//router 
app.use('/api/auth' , UserRouter); // user login-Signup
<<<<<<< HEAD
app.use('/api/report' , ReportRouter ); // user report create / 
app.use('/api/dashboard' , DashboardRouter ); // show all Users and Reports
app.use('/api/posts' , PostRouter ); // CRUD in Post 
=======
app.use('/api/report' , ReportRouter ); // user report create / show 
app.use('/api/get' , DashboardRouter ); // show all Users and Reports
>>>>>>> 8634b690e2335e246fa175ce78ed7f6aeb0d6eaf


// connect to Database 
connectDB();

app.listen(process.env.PORT , () => {
    console.log(`server is listening on ${process.env.PORT}`)
});