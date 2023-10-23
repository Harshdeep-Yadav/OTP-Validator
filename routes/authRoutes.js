import express, { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authConroller.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
