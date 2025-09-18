import mongoose from "mongoose";

const dumpingYardSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    location: {
        type: {
          type: String,
          enum: ["Dump"],
          default : "Dump"
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
    },
    address : {
        type : String ,
        required: true ,
    }
})