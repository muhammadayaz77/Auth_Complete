import express from 'express'
import { registerUser } from '../controllers/authControllers.mjs';

let route = express.Router();

route.post("/register",registerUser);
export default route;