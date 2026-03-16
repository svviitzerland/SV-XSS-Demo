import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export function signJwt(payload: object): string {
	// Token expires in 7 days to match our cookie maxAge
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string): any {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (err) {
		return null;
	}
}
