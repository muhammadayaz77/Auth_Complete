import mongoose from "mongoose";
import User from "../Model/userModel.mjs";
import jwt from 'jsonwebtoken'

let generateJWT = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET);
}

export let registerUser = async(req,res) => {
  let {username,password,email} = req.body;
  let user = new User({
    username,
    password,
    email
  })
  await user.save();
  res.status(201).json({
    username,
    password,email,
    token : generateJWT(user._id)
  })
  res.send(user);
  
}
