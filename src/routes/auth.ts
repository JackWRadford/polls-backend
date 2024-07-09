import express from "express";
import {
	deleteUserAndPolls,
	login,
	logout,
	me,
	signUp,
} from "../controllers/authController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import { checkValidationResult } from "../middleware/validationMiddleware/validation.js";
import {
	validateLogin,
	validateSignUp,
} from "../middleware/validationMiddleware/validationChains.js";

const router = express.Router();

router.post("/signup", validateSignUp(), checkValidationResult, signUp);
router.post("/login", validateLogin(), checkValidationResult, login);
router.post("/logout", logout);
router.get("/me", authenticateJWT, me);
router.post("/delete", authenticateJWT, deleteUserAndPolls);

export default router;
