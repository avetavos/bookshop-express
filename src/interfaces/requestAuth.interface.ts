import { Request } from 'express';

export default interface RequestAuth extends Request {
	user?: {
		_id: string;
	};
}
