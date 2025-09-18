import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Admin from "../models/adminAuth.model.js";
import {  getAvatar } from "../utils/getAvatar.js";


export const register = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password , username} = req.body;

  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const avatarUrl = await getAvatar();

    const admin = new Admin({ email, password , username , avatarUrl : avatarUrl.url});
    await admin.save();
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRE });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ success : false , message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRE });

    res.json({ success : true , message : "Succesfully login user" , token });
    
  } catch (error) {
    res.status(500).json({success : false , message: "Server error", error: error.message });
  }
};


