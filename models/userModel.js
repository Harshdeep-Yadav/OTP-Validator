import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  opt: {
    type: Number,
  },
  password:{
    type: String,
    required: true,
  }
});

export default mongoose.model(" user", userSchema);
