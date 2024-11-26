import express from "express";
import {
  handleLoginRequest,
  handleLogoutRequest,
  handleSignupRequest,
} from "../controller/auth.controller.js";
const router = express.Router();

router.post("/signup", handleSignupRequest);
router.post("/logout", handleLogoutRequest);
router.post("/login", handleLoginRequest);
export default router;
