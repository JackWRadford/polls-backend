import { ObjectId } from "mongodb";

interface Vote {
	_id: ObjectId;
	poll_id: ObjectId;
	option_id: ObjectId;
	createdAt: Date;
}

export { Vote };
