import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Response } from 'express';

const secret = process.env.JWT_SECRET_KEY as string;

export const generateToken = (res: Response, payload: any): string => {
	const token = jwt.sign(
		{
			id: payload.id,
			name: payload.name,
			email: payload.email,
		},
		secret,
		{ expiresIn: '7d' },
	);
	res.cookie('tokenss', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV == 'development' ? false : true,
		sameSite: process.env.NODE_ENV == 'development' ? 'lax' : 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	return token;
};

export const decodeToken = (token: string): any | null => {
	try {
		return jwt.verify(token, secret) as any;
	} catch {
		return null;
	}
};
