import mongoose from "mongoose";
import User from "../Model/userModel.mjs";
import jwt from 'jsonwebtoken';

let generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export let registerUser = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save the new user
    let user = new User({
      username,
      password,
      email
    });
    await user.save();

    // Send success response with token
    res.status(201).json({
      username,
      email,
      token: generateJWT(user._id)
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
