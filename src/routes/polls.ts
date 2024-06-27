import express from "express";
import {
	createPoll,
	deletePoll,
	getExamplePolls,
	getMyPolls,
	getPoll,
	getPollResults,
	voteInPoll,
} from "../controllers/pollController.js";
import { checkValidationResult } from "../middleware/validationMiddleware/validation.js";
import {
	validateCreatePoll,
	validateMongoIdInParams,
	validatePagination,
	validateVote,
} from "../middleware/validationMiddleware/validationChains.js";
import {
	authenticateJWT,
	optionalAuthenticateJWT,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes.
router.post(
	"/create",
	optionalAuthenticateJWT,
	validateCreatePoll(),
	checkValidationResult,
	createPoll
);
router.get(
	"/my-polls",
	authenticateJWT,
	validatePagination(),
	checkValidationResult,
	getMyPolls
);
router.get(
	"/examples",
	validatePagination(),
	checkValidationResult,
	getExamplePolls
);
router.get(
	"/:id",
	optionalAuthenticateJWT,
	validateMongoIdInParams(),
	checkValidationResult,
	getPoll
);
router.get(
	"/:id/results",
	optionalAuthenticateJWT,
	validateMongoIdInParams(),
	checkValidationResult,
	getPollResults
);
router.post(
	"/:id/vote",
	optionalAuthenticateJWT,
	validateMongoIdInParams(),
	validateVote(),
	checkValidationResult,
	voteInPoll
);
router.post(
	"/:id/delete",
	authenticateJWT,
	validateMongoIdInParams(),
	checkValidationResult,
	deletePoll
);

export default router;
