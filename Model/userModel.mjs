import mongoose from "mongoose";
import bcrypt from 'bcrypt';

let userSchema = mongoose.Schema({
  username : String,
  email : String,
  password : String,
},{timestamps : true});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

// Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
let User = mongoose.model('user',userSchema);
export default User;