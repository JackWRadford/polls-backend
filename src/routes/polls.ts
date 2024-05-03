import express from "express";
import {
	createPoll,
	getPoll,
	getPollResults,
	voteInPoll,
} from "../controllers/pollController.js";
import { checkValidationResult } from "../validation/validation.js";
import {
	validateCreatePoll,
	validateGetPoll,
} from "../validation/validationChains.js";

const router = express.Router();

// Routes
router.post("/create", validateCreatePoll(), checkValidationResult, createPoll);
router.get("/:id", validateGetPoll(), checkValidationResult, getPoll);
router.get("/:id/results", getPollResults);
router.post("/:id/vote", voteInPoll);

export default router;
