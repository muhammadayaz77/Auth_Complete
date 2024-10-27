import mongoose from "mongoose";
import bcrypt from 'bcrypt';

let userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Exit if password is not modified
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save the document
  } catch (error) {
    next(error); // Pass any errors to Mongoose for error handling
  }
});

// Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

let User = mongoose.model('User', userSchema);
export default User;
