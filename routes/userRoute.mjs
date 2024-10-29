import express from 'express'
import { protect } from '../middlerware/authMiddleware.mjs';
import { getUsers } from '../controllers/userControllers.mjs';
let router = express.Router();

router.get("/",protect,getUsers);

export default router;