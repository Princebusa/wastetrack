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
      required: true,
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
    enum: ["Bottles", "Bags", "Packaging", "Other"],
    required: true,
  },
  status: {
    type: String,
    enum: ["reported", "in-progress", "resolved", "spam"],
    default: "reported",
  },
  cleanupProofUrl: {
    type: String, // URL for the "after" photo submitted by a user
    default: "",
  },
});

const Report = mongoose.model('Report' , reportSchema);
