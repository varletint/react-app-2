import User from "../models/user.model.js";
import { errorHandler } from "../utilities/error.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

dotenv.config();

export const signUp = async (req, res, next) => {
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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  // check user inputs
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All field are required"));
  }

  // Find user by email from the database (i.e compare users
  // email from the frontend with the backend( database ) )
  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(errorHandler(400, "User not found"));
  }
  try {
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // checking the input password from
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign(
      { id: validUser._id, isPeqer: validUser.isPeqer },
      process.env.JWT_KEY
    );

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);

    const { password: pass, ...rest } = validUser._doc;
  } catch (error) {
    next(error);
  }
};
