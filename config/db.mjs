import mongoose from "mongoose";

let connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected");
  } catch (error) {
    console.log(error.message);
  }
}
export default connectDB;