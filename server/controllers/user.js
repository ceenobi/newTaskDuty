import User from "../models/user.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import generateToken from "../config/generateToken.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(createHttpError(400, "Formfields must be filled"));
  }
  try {
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      return next(createHttpError(400, "username already exists"));
    }
    const userEmailExists = await User.findOne({ email: email });
    if (userEmailExists) {
      return next(createHttpError(400, "email already exists"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const accessToken = generateToken(user._id);
    res.status(201).json({ accessToken, msg: "User registration sucessfull" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(createHttpError(400, "Username or password is required"));
  }
  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return next(createHttpError(404, "user not found"));
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return next(createHttpError(401, "Invalid credentials"));
    }
    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken, msg: "Login successfull" });
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, "user not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
