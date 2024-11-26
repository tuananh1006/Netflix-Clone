import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
}

function comparePassword(password, hash) {
  return bcryptjs.compareSync(password, hash);
}

export async function handleSignupRequest(req, res) {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).send("Missing required fields");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email");
  }
  if (password.length < 6) {
    return res.status(400).send("Password is too short");
  }

  const existingUserByEmail = await User.findOne({ email: email });
  if (existingUserByEmail) {
    console.log({
      ...existingUserByEmail._doc,
      password: hashPassword(password),
    });
    return res.status(409).send("Email already exists");
  }
  const existingUserByUserName = await User.findOne({ userName: userName });
  if (existingUserByUserName) {
    return res.status(409).send("Username already exists");
  }
  const image_path = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
  const image_random =
    image_path[Math.floor(Math.random() * image_path.length)];
  const newUser = new User({
    userName: userName,
    password: hashPassword(password),
    email: email,
    image: image_random,
  });
  if (newUser) {
    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).send("User created successfully");
  }
}

export async function handleLogoutRequest(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).send("Logged out successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

export async function handleLoginRequest(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Missing required fields");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    generateToken(user._id, res);
    res.status(200).send("Logged in successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}
