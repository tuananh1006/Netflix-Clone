import envVars from "../config/envVars.js";
import jwt from "jsonwebtoken";
const generateToken = (userID, res) => {
  const payload = {
    id: userID,
  };
  const JWT_SECRET = envVars.JWT_SECRET;
  const options = {
    expiresIn: "15d",
  };

  const token = jwt.sign(payload, JWT_SECRET, options);

  res.cookie("jwt-netflix", token, {
    httpOnly: true,
    secure: envVars.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days,
    sameSite: "strict",
  });
  return token;
};

export default generateToken;
