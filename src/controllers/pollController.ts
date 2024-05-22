import { Option } from "../models/poll.js";
import { Poll } from "../models/poll.js";
import db from "../db/connection.js";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Vote } from "../models/vote.js";
import { matchedData } from "express-validator";

export async function createPoll(req: Request, res: Response) {
	// Destruct validated request data.
	const { title, options, endsAt } = matchedData(req);

	// Create options array with ids.
	const optionsWithIds: Option[] = options?.map(
		(option: string, index: number) => ({
			id: index.toString(),
			title: option,
		})
	);

	// Create the poll object.
	const createdAt = new Date();
	const document: Partial<Poll> = {
		title,
		options: optionsWithIds,
		createdAt,
		endsAt,
	};

	try {
		if (!db) {
			throw new Error();
		}
		// Insert the document.
		let result = await db.collection("polls").insertOne(document);
		// Send back the objectID generated by MongoDB.
		res.status(201).send({ insertedId: result.insertedId });
	} catch (error) {
		res.status(500).send({
			message: "Error while trying to save the poll.",
		});
	}
}

export async function getPoll(req: Request, res: Response) {
	const { id: pollId } = matchedData(req);

	try {
		const poll = await getPollForId(pollId);
		// Check if a poll was found.
		if (!poll) {
			return res.status(404).send({ message: "Poll not found." });
		}
		res.status(200).send(poll);
	} catch (error) {
		res.status(500).send({
			message: "An Error occured while fetching the poll.",
		});
	}
}

export async function getExamplePolls(req: Request, res: Response) {
	let { page, pageSize } = matchedData(req);
	pageSize = parseInt(pageSize, 10);
	page = parseInt(page, 10);

	try {
		const polls = await db
			?.collection("polls")
			.find({ isExample: true })
			.sort({ createdAt: -1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.toArray();

		const thereAreMorePolls = polls?.length == pageSize;
		res.status(200).send({ polls, thereAreMorePolls });
	} catch (error) {
		console.error(error);
		res.status(500).send({
			message: "An Error occured while fetching the example polls",
		});
	}
}

export async function getPollResults(req: Request, res: Response) {
	const { id: pollId } = matchedData(req);

	try {
		if (!db) {
			throw new Error();
		}
		const poll = await getPollForId(pollId);

		// Aggregate votes for each option.
		const aggregationPipeline = [
			{ $match: { poll_id: new ObjectId(pollId) } },
			{ $group: { _id: "$optionId", count: { $sum: 1 } } }, // Group votes by optionId and sum them.
			{ $project: { _id: 0, optionId: "$_id", count: 1 } }, // Remove the _id field and use it's value for the optionId field.
		];

		const pollResults = (await db
			.collection("votes")
			.aggregate(aggregationPipeline)
			.toArray()) as { optionId: string; count: number }[];

		// Calculate the total vote count
		const totalVoteCount = pollResults.reduce((count, pollResult) => {
			return count + pollResult.count;
		}, 0);

		// Create an array with the option title, vote count, and vote percentage
		let pollResultsData: {
			optionTitle: string;
			count: number;
			percentage: number;
		}[] = [];
		poll?.options.forEach((option) => {
			const voteCount =
				pollResults.find((res) => res.optionId == option.id)?.count ??
				0;
			const percentage =
				voteCount > 0 && totalVoteCount > 0
					? Math.round((voteCount / totalVoteCount) * 100)
					: 0;
			pollResultsData.push({
				optionTitle: option.title,
				count: voteCount,
				percentage: percentage,
			});
		});

		res.status(200).send({
			poll,
			pollResultsData,
			totalVoteCount,
		});
	} catch (error) {
		console.error("Error: Results fetch.", error);
		res.status(500).send({
			message: "An Error occurred while fetching the poll results.",
		});
	}
}

export async function voteInPoll(req: Request, res: Response) {
	const clientIp = req.socket.remoteAddress;
	console.log("ClientIP:", clientIp);
	const { id: pollId, optionId } = matchedData(req);

	// Check the length of the IP address.
	if (clientIp && clientIp.length > 45) {
		return res.send(400).send("Invalid IP length.");
	}

	try {
		if (!db) {
			throw new Error();
		}
		// Check if the poll exists.
		const poll = await getPollForId(pollId);
		if (!poll) {
			return res.status(404).send({ message: "Poll not found." });
		}

		// Check if the option exists.
		const option = poll.options.find((opt) => opt.id === optionId);
		if (!option) {
			return res.status(400).send({ message: "Invalid option." });
		}

		// Check for the clientIp in any existing Votes relating to the poll.
		const voteWithClientIp = await db
			.collection("votes")
			.findOne({ poll_id: new ObjectId(pollId), clientIp: clientIp });
		if (voteWithClientIp) {
			return res.status(403).send({
				message: "You can only vote once in this poll.",
			});
		}

		// Create the Vote object.
		const voteDocument: Partial<Vote> = {
			poll_id: poll._id,
			optionId: option.id,
			createdAt: new Date(),
			clientIp: clientIp,
		};
		// Insert the document.
		let result = await db.collection("votes").insertOne(voteDocument);
		// Send back the objectID generated by MongoDB.
		res.status(201).send({ insertedId: result.insertedId });
	} catch (error) {
		res.status(500).send({
			message: "An Error occurred while recording the vote.",
		});
	}
}

async function getPollForId(id: string): Promise<Poll | null | undefined> {
	const query = { _id: new ObjectId(id) };
	const poll = await db?.collection("polls").findOne(query);
	return poll as Poll | null | undefined;
}
