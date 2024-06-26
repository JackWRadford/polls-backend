import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwtUtils.js";

export const authenticateJWT = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Get the JWT.
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).send({ message: "Access denied." });
	}

	try {
		// Verify the JWT.
		const decodedToken = await verifyJWT(token);
		req.body.userId = decodedToken.id;
		next();
	} catch (error) {
		return res
			.status(401)
			.send({ message: "Failed to authenticate token." });
	}
};
