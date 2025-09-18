import mongoose from "mongoose";
import moment from "moment";
const reportSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default : "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description : {
    type : String 
  },
  status: {
    type: String,
    enum: ["reported", "in-progress", "resolved"],
    default: "reported",
  },
  cleanupProofUrl: {
    type: String, // URL for the "after" photo submitted by a user
    default: "",
  },
   createdAt: {
    type: String,
    default: () => moment().format("YYYY-MM-DD HH:mm:ss") // store formatted
  }
});

const Report = mongoose.model('Report' , reportSchema);
export default Report
