import { ObjectId } from "mongodb";

type Option = {
	id: string;
	title: string;
};

type Poll = {
	_id: ObjectId;
	title: string;
	options: Option[];
	createdAt: Date;
	limitVotesByIp?: boolean;
	isExample?: boolean;
};

type Vote = {
	_id: ObjectId;
	poll_id: ObjectId;
	optionId: string;
	createdAt: Date;
	clientIp?: string;
};

export { Poll, Option, Vote };
