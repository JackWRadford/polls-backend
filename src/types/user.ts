import { ObjectId } from "mongodb";

export type User = {
	_id: ObjectId;
	email: string;
	username: string;
	passwordHash: string;
	createdAt: Date;
};
