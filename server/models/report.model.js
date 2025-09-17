import mongoose from "mongoose";

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
  wasteType: {
    type: String,
    default: "Other",
    enum: ["Bottles", "Bags", "Packaging", "Other"],
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
});

const Report = mongoose.model('Report' , reportSchema);
export default Report
