import { Request, Response } from 'express';
import { response } from '../utils/response.js';
import { generateReasonV1WithFallback, generateReasonV2WithFallback } from '../utils/gemini.js';
import { generateReasonV1Validate, generateReasonV2Validate } from '../validations/reason.js';
import { createReasonService } from '../services/reason.service.js';

export const generateReasonV1 = async (req: Request, res: Response) => {
	// body
	const { data, success, error } = generateReasonV1Validate.safeParse(req.body);
	if (!success) {
		const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }));
		return response({ res, status: 400, message: 'Validation error', errors });
	}

	// generate reason
	try {
		const text = await generateReasonV1WithFallback(data);
		const cleaned = text.replace(/```json/g, '').replace(/```/g, '');
		return response({
			res,
			status: 201,
			message: 'Success generate reason',
			data: {
				reason: cleaned,
			},
		});
	} catch (error) {
		return response({
			res,
			status: 500,
			message: 'Failed to generate reason',
		});
	}
};

export const generateReasonV2 = async (req: Request, res: Response) => {
	// body
	const { data, success, error } = generateReasonV2Validate.safeParse(req.body);
	if (!success) {
		const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }));
		return response({ res, status: 400, message: 'Validation error', errors });
	}

	// generate reason
	try {
		const text = await generateReasonV2WithFallback(data);
		const cleaned = text.replace(/```json/g, '').replace(/```/g, '');
		const results = await createReasonService({ ...data, reason: cleaned });

		if (!results) {
			return response({
				res,
				status: 500,
				message: 'Failed to save reason',
			});
		}

		return response({
			res,
			status: 201,
			message: 'Success generate reason',
			data: {
				reason: cleaned,
			},
		});
	} catch (error) {
		return response({
			res,
			status: 500,
			message: 'Failed to generate reason',
		});
	}
};
