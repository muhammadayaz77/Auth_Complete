import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import Route from './routes/route.mjs'
import userRoute from './routes/userRoute.mjs'
dotenv.config();
let app = express();

app.use(express.json());
connectDB();
app.use('/api/auth',Route);
app.use('/api/users',userRoute);
app.listen(3000,() => {
  console.log('http://localhost:3000');
})