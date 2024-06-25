import express from "express";
import { validateSignUp } from "../middleware/validation/validationChains.js";
import { checkValidationResult } from "../middleware/validation/validation.js";
import { signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validateSignUp(), checkValidationResult, signUp);

export default router;
