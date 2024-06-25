import { body, param, query } from "express-validator";

// CreatePoll Validation.
export const validateCreatePoll = () => [
	body("title")
		.isString()
		.withMessage("The title must be a string.")
		.trim()
		.isLength({ min: 1, max: 1000 })
		.withMessage("The Title must be 1 to 1000 characters in length."),

	body("options")
		.isArray({ min: 2, max: 30 })
		.withMessage("There must be 2 to 30 options."),
	body("options.*")
		.isString()
		.withMessage("The Answers must be strings.")
		.trim()
		.isLength({ min: 1, max: 280 })
		.withMessage("The Answers must be 1 to 180 characters in length."),

	body("limitVotesByIp")
		.optional()
		.isBoolean()
		.withMessage("limitVotesByIp must be of type Boolean."),
];

export const validateMongoIdInParams = () => [
	param("id").isMongoId().withMessage("Invalid Poll id."),
];

export const validatePagination = () => [
	query("page")
		.default(1)
		.isInt({ min: 1 })
		.withMessage("Page must be a positive integer."),
	query("pageSize")
		.default(10)
		.isInt({ min: 1, max: 30 })
		.withMessage("Page size must be an integer between 1 and 30."),
];

export const validateVote = () => [
	body("optionId")
		.isString()
		.withMessage("The option id must be a string.")
		.trim()
		.isLength({ min: 1, max: 2 })
		.withMessage("The option id must be 1 to 2 characters in length."),
];

export const validateSignUp = () => [
	body("email")
		.isString()
		.withMessage("The email must be a string.")
		.trim()
		.isEmail()
		.withMessage("The email string must be a valid email."),
	body("username")
		.isString()
		.withMessage("The username must be a string.")
		.trim()
		.isLength({ min: 1, max: 15 })
		.withMessage("The username must be 1 to 15 characters in length."),
	body("password")
		.isString()
		.withMessage("The password must be a string.")
		.trim()
		.isLength({ min: 8, max: 20 })
		.withMessage("The password must be 8 to 20 characters in length."),
];
