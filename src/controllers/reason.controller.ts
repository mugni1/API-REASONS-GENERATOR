import { Request, Response } from 'express';
import { response } from '../utils/response.js';
import { generateReasonWithFallback } from '../utils/gemini.js';
import { generateReasonValidate } from '../validations/reason.js';

export const generateReason = async (req: Request, res: Response) => {
	// body
	const { data, success, error } = generateReasonValidate.safeParse(req.body);
	if (!success) {
		const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }));
		return response({ res, status: 400, message: 'Validation error', errors });
	}

	// generate reason
	try {
		const text = await generateReasonWithFallback(data);
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
