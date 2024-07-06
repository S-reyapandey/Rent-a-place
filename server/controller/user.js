import User2 from "../models/user2.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";
import Room from "../models/Room.js";

export const register = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }
  const emailLowercase = email.toLowerCase();
  const existedUser = await User2.findOne({ email: emailLowercase });
  if (existedUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User2.create({
    name,
    email: emailLowercase,
    password: hashedPassword,
  });
  const { _id: id, photoURL } = user;
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    result: { id, name, email: user.email, photoURL, token },
  });
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowercase = email.toLowerCase();
  const existedUser = await User2.findOne({ email: emailLowercase });
  if (!existedUser) {
    return res.status(404).json({
      success: false,
      message: "User doesn't exist!",
    });
  }
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword) {
    return res.status(400).json({
      success: false,
      message: "Password is incorrect!",
    });
  }
  const { _id: id, name, photoURL } = existedUser;
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    message: "User logged in successfully",
    result: { id, name, email: emailLowercase, photoURL, token },
  });
});

export const updateProfile = tryCatch(async (req, res) => {
  const updatedUser = await User2.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  const { _id: id, name, photoURL } = updatedUser;


  await Room.updateMany({uid: id}, {uName: name, uPhoto: photoURL});

  const token = jwt.sign(
    {
      id,
      name,
      photoURL,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.status(201).json({
    success: true,
    message: "User updated successfully",
    result: { name, photoURL, token },
  });
});
