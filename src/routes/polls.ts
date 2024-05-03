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
	validateMongoIdInParams,
	validateVote,
} from "../validation/validationChains.js";

const router = express.Router();

// Routes
router.post("/create", validateCreatePoll(), checkValidationResult, createPoll);
router.get("/:id", validateMongoIdInParams(), checkValidationResult, getPoll);
router.get(
	"/:id/results",
	validateMongoIdInParams(),
	checkValidationResult,
	getPollResults
);
router.post(
	"/:id/vote",
	validateMongoIdInParams(),
	validateVote(),
	checkValidationResult,
	voteInPoll
);

export default router;
