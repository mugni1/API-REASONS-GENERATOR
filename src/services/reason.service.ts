import Reason from '../models/reason.model.js';
import { CreateReasonV2Payload } from '../validations/reason.js';

export const createReasonService = (payload: CreateReasonV2Payload) => {
	return Reason.create(payload);
};
