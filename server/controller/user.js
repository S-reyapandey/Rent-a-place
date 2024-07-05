import User2 from "../models/user2.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";

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
