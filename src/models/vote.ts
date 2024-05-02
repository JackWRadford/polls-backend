import { ObjectId } from "mongodb";

interface Vote {
	_id: ObjectId;
	poll_id: ObjectId;
	optionId: string;
	createdAt: Date;
	clientIp?: string;
}

export { Vote };
