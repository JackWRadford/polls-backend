import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function checkValidationResult(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const validationRes = validationResult(req);
	// Check that the request is valid.
	if (!validationRes.isEmpty()) {
		console.error(validationRes.array());
		return res.status(400).send({
			message: "Invalid request.",
			errors: validationRes.array(),
		});
	}
	next();
}
