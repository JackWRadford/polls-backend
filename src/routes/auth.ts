import express from "express";
import {
	validateLogin,
	validateSignUp,
} from "../middleware/validation/validationChains.js";
import { checkValidationResult } from "../middleware/validation/validation.js";
import { login, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validateSignUp(), checkValidationResult, signUp);
router.post("/login", validateLogin(), checkValidationResult, login);

export default router;
