import express from "express";
import { login, signUp } from "../controllers/authController.js";
import { checkValidationResult } from "../middleware/validationMiddleware/validation.js";
import {
	validateLogin,
	validateSignUp,
} from "../middleware/validationMiddleware/validationChains.js";

const router = express.Router();

router.post("/signup", validateSignUp(), checkValidationResult, signUp);
router.post("/login", validateLogin(), checkValidationResult, login);

export default router;
