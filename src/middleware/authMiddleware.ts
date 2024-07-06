import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwtUtils.js";

export const authenticateJWT = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Get the JWT.
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).send({ message: "Access denied." });
	}

	try {
		// Verify the JWT.
		const decodedToken = await verifyJWT(token);
		req.userId = decodedToken.id;
		next();
	} catch (error) {
		return res
			.status(401)
			.send({ message: "Failed to authenticate token." });
	}
};

export const optionalAuthenticateJWT = async (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;

	if (token) {
		try {
			const decodedToken = await verifyJWT(token);
			req.userId = decodedToken.id;
		} catch (error) {
			console.error("JWT verification failed:", error);
		}
	}

	next();
};
