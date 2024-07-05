import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
      required: true,
    },
    email: {
      type: String,
      min: 5,
      max: 50,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User2 = mongoose.model('user2', userSchema);
export default User2;
