import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const register = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password , username} = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = new User({ email, password , username});
    await user.save();

    res.status(201).json({ message: "User registered successfully", user: { email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRE });

    res.json({ message : "Succesfully login user" , token });
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


