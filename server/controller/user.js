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
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User2.create({
    name,
    email: emailLowercase,
    password: hashedPassword,
  });
  const { _id: id, photoURL, role, active } = user;
  const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    result: { id, name, email: user.email, photoURL, token, role, active },
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
  const { _id: id, name, photoURL, role, active } = existedUser;
  if (!active) {
    return res.status(400).json({
      success: false,
      message: "This account has been suspended! Try to contact the admin.",
    });
  }
  const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    result: { id, name, email: emailLowercase, photoURL, token, role, active },
  });
});

export const updateProfile = tryCatch(async (req, res) => {
  const fields = req.body?.photoURL
    ? { name: req.body.name, photoURL: req.body.photoURL }
    : { name: req.body.name };

  const updatedUser = await User2.findByIdAndUpdate(req.user.id, fields, {
    new: true,
  });
  const { _id: id, name, photoURL, role } = updatedUser;

  await Room.updateMany({ uid: id }, { uName: name, uPhoto: photoURL });

  const token = jwt.sign(
    {
      id,
      name,
      photoURL,
      role,
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

export const getUsers = tryCatch(async (req, res) => {
  const users = await User2.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const updateStatus = tryCatch(async (req, res) => {
  const { role, active } = req.body;
  await User2.findByIdAndUpdate(req.params.userId, { role, active });
  res.status(200).json({
    success: true,
    result: { _id: req.params.userId },
  });
});
