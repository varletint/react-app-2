import User from "../models/user.model.js";
import { errorHandler } from "../utilities/error.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

dotenv.config();

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All field are required"));
  }
  if (password.length < 6) {
    next(errorHandler(400, "Password must be at least 6 characters"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Sign up Successfull");
  } catch (error) {
    next(error);
  }
};
