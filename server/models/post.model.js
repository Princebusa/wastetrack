// models/Post.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Made optional for anonymous posts
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    imageUrl : {
      type: String, // store image URL
      required: false, // Made optional for text-only posts
    },
    description: {
      type: String,
      maxlength: 500,
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },

    downvotes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema], // embedded comments
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
