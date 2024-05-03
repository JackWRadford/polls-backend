import { body } from "express-validator";

// CreatePoll Validation.
export const validateCreate = () => [
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
