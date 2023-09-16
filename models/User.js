import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    set: (v) => v.charAt(0).toUpperCase() + v.slice(1) // to store names capitalized
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    set: (v) => v.charAt(0).toUpperCase() + v.slice(1)
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  picturePath: {
    type: String,
    default: "" 
  }
},
{ timestamps: true })

const User = mongoose.model('User', UserSchema);
export default User;