import express from "express";
const app = express();

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/dbConnection.js' ;
import UserRouter from "./routes/user.route.js";
import ReportRouter from "./routes/report.route.js";
import DashboardRouter from "./routes/dashboard.route.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//router 
app.use('/api/auth' , UserRouter); // user login-Signup
app.use('/api/report' , ReportRouter ); // user report create / show 
app.use('/api/dashboard' , DashboardRouter ); // show all Users and Reports


// connect to Database 
connectDB();

app.listen(process.env.PORT , () => {
    console.log(`server is listening on ${process.env.PORT}`)
});