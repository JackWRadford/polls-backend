import { body, param } from "express-validator";

// CreatePoll Validation.
export const validateCreatePoll = () => [
	body("title")
		.isString()
		.withMessage("The title must be a string.")
		.trim()
		.notEmpty()
		.withMessage("The Title must not be empty.")
		.escape(),

	body("options")
		.isArray({ min: 2, max: 10 })
		.withMessage("There must be 2 to 10 options."),
	body("options.*")
		.isString()
		.withMessage("The Answers must be strings.")
		.trim()
		.isLength({ min: 1, max: 280 })
		.withMessage("The Answers must be 1 to 180 characters in length.")
		.escape(),

	body("endAt")
		.optional()
		.isDate()
		.withMessage("The end at date must be a Date."),
];

export const validateMongoIdInParams = () => [
	param("id").isMongoId().withMessage("Invalid Poll id."),
];

export const validateVote = () => [
	body("optionId")
		.isString()
		.withMessage("The option id must be a string.")
		.trim()
		.isLength({ min: 1, max: 2 })
		.withMessage("The option id must be 1 to 2 characters in length.")
		.escape(),
];
