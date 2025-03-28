import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {  
    type: String,
    required: true, 
    unique: true 
  },
  password: { 
    type: String,
    required: true 
  },
  name: {
    type: String,
    default: null
  },
  contact: {
    type: String, 
    default: null
  },
  dob: {
    type: Date,
    default: null
  }
  }
, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User
