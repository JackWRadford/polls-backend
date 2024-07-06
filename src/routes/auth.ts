import express from "express";
import { login, me, signUp } from "../controllers/authController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import { checkValidationResult } from "../middleware/validationMiddleware/validation.js";
import {
	validateLogin,
	validateSignUp,
} from "../middleware/validationMiddleware/validationChains.js";

const router = express.Router();

router.post("/signup", validateSignUp(), checkValidationResult, signUp);
router.post("/login", validateLogin(), checkValidationResult, login);
router.get("/me", authenticateJWT, me);

export default router;
