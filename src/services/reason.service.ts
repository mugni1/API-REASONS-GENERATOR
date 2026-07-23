import Reason from '../models/reason.model.js';
import { CreateReasonV2Payload } from '../validations/reason.js';

export const createReasonService = (payload: CreateReasonV2Payload) => {
	return Reason.create(payload);
};

export const getReasonService = () => {
	return Reason.find().sort({ createdAt: -1 }).limit(10);
};

export const getCountReasonService = () => {
	return Reason.countDocuments();
};
