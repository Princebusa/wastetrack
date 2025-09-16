import express from "express";
const app = express();

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/dbConnection.js' ;
import UserRouter from "./routes/user.route.js";
import ReportRouter from "./routes/report.route.js";

app.use(cors());
app.use(express.json());

//router 
app.use('/api/auth' , UserRouter); // user login-Signup
app.use('/api/report' , ReportRouter ); // report create / show 


// connect to Database 
connectDB();

app.listen(process.env.PORT , () => {
    console.log(`server is listening on ${process.env.PORT}`)
});