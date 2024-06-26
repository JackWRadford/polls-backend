import { ObjectId } from "mongodb";

export type User = {
	_id: ObjectId;
	email: string;
	username: string;
	passwordHash: string;
	createdAt: Date;
};

export type UserWithoutPasswordHash = Omit<User, "passwordHash">;
