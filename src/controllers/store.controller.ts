import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import AuthMiddleware from '../middlewares/auth.middleware';

export default class Store {
	public readonly router = Router();
	private readonly path = '/store';

	constructor() {
		this.router.get(this.path, AuthMiddleware, this.getBooks);
	}

	private async getBooks(req, res) {
		return res.render('shop', { auth: true });
	}
}
