import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["citizen", "admin"], // Role-based access control
      default: "citizen",
    },
    points: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        type: String, // e.g., ["Eco-Warrior", "First Cleanup", "Neighborhood Hero"]
      },
    ],
    location: {
      type: {
        type: String,
        enum: ["Point"], // point graphics
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
