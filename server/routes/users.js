import express from "express";
import { SignIn, SingUp } from "../controller/userController.js";

const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", SingUp);

export default router;