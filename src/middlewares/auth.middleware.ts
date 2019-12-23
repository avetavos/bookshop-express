import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
	const token = req.cookies.authorization;
	if (!token) {
		return res.redirect('/');
	}
	try {
		await jwt.verify(token, process.env.JWT_SECRET as Secret);
		return next();
	} catch {
		return res.redirect('/');
	}
}

export default authMiddleware;
