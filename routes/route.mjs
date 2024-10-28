import express from 'express'
import { loginUser, registerUser } from '../controllers/authControllers.mjs';

let route = express.Router();

route.post("/register",registerUser);
route.post("/login",loginUser);
export default route;