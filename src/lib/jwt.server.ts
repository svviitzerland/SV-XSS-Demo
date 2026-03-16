import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

const secret = env.JWT_SECRET || 'fallback-secret-for-local-dev';

export function signJwt(payload: object): string {
	// Token expires in 7 days to match our cookie maxAge
	return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyJwt(token: string): any {
	try {
		return jwt.verify(token, secret);
	} catch (err) {
		return null;
	}
}
