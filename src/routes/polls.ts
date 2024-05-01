import express from "express";
import {
	createPoll,
	getPoll,
	getPollResults,
	voteInPoll,
} from "../controllers/pollController.js";

const router = express.Router();

// Routes
router.post("/create", createPoll);
router.get("/:id", getPoll);
router.get("/:id/results", getPollResults);
router.post("/:id/vote", voteInPoll);

export default router;
