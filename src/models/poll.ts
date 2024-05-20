import { ObjectId } from "mongodb";

interface Option {
	id: string;
	title: string;
}

interface Poll {
	_id: ObjectId;
	title: string;
	options: Option[];
	createdAt: Date;
	endsAt: Date;
	isExample?: boolean;
}

export { Poll, Option };
