import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { Db } from "mongodb";
import db from "../db/connection.js";
import { User, UserWithoutPasswordHash } from "../types/user.js";
import { comparePassword, hashPassword } from "../utils/hasher.js";
import { generateJWT } from "../utils/jwtUtils.js";

export const signUp = async (req: Request, res: Response) => {
	// Destruct validated request data.
	const { email, username, password } = matchedData(req);

	try {
		if (!db) {
			throw new Error("Could not connect to database.");
		}

		// Check for an existing user with the same email.
		const existingUserWithEmail = await isExistingUserWith(
			"email",
			email,
			db
		);
		if (existingUserWithEmail) {
			return res
				.status(400)
				.send({ message: "A user with that email already exists." });
		}
		// Check for an existing user with the same username.
		const existingUserWithUsername = await isExistingUserWith(
			"username",
			username,
			db
		);
		if (existingUserWithUsername) {
			return res.status(400).send({
				message:
					"That username is already taken. Please choose a different username.",
			});
		}

		// Hash password.
		const passwordHash = await hashPassword(password);

		// Create new user.
		const newUser: Partial<User> = {
			email: email,
			username: username,
			passwordHash: passwordHash,
			createdAt: new Date(),
		};

		// Insert new user.
		const result = await db.collection("users").insertOne(newUser);
		const userId = result.insertedId;
		const user = (await db
			.collection("users")
			.findOne({ _id: userId })) as User;

		const userWithoutPasswordHash = removePasswordHash(user);

		// Generate JWT.
		// The hex string representation of the ObjectId is always 24 characters long.
		const jwt = generateJWT(userId.toHexString());
		res.cookie("token", jwt, {
			secure: true,
			httpOnly: false,
		});
		res.status(201).send({
			userWithoutPasswordHash,
			message: "Signed Up successfully.",
		});
	} catch (error) {
		console.error("Error occurred while signing up:", error);
		res.status(500).send({
			message: "An Error occurred while signing up.",
		});
	}
};

export const login = async (req: Request, res: Response) => {
	if (!db) {
		throw new Error("Could not connect to database.");
	}
	// Destruct validated request data.
	const { email, password } = matchedData(req);
	const emailPasswordIncorrect = {
		message: "Your email or password was incorrect.",
	};
	try {
		// Check for user with email.
		const user = (await db
			.collection("users")
			.findOne({ email: email })) as User;
		if (!user) {
			return res.status(400).send(emailPasswordIncorrect);
		}
		// Check the password.
		const passwordWasCorrect = await comparePassword(
			password,
			user.passwordHash
		);
		if (!passwordWasCorrect) {
			return res.status(400).send(emailPasswordIncorrect);
		}

		const userWithoutPasswordHash = removePasswordHash(user);

		// Generate JWT.
		const jwt = generateJWT(user._id.toHexString());
		res.cookie("token", jwt, {
			secure: true,
			httpOnly: false,
		});
		res.status(200).send({
			userWithoutPasswordHash,
			message: "Login successfull.",
		});
	} catch (error) {
		console.error("Error occurred while logging in:", error);
		res.status(500).send({
			message: "An Error occurred while logging in.",
		});
	}
};

const isExistingUserWith = async (
	property: string,
	value: string,
	db: Db
): Promise<boolean> => {
	const userWithEmail = await db
		.collection("users")
		.findOne({ [property]: value });
	if (userWithEmail) return true;
	return false;
};

const removePasswordHash = (user: User): UserWithoutPasswordHash => {
	const { passwordHash, ...userWithoutPasswordHash } = user;
	return userWithoutPasswordHash;
};
