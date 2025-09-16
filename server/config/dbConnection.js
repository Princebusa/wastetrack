import mongoose from "mongoose";

async function connectDB() {
    mongoose
  .connect("mongodb://localhost:27017/authApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

}

export default connectDB;