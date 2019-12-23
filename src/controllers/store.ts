import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import AuthMiddleware from '../middlewares/auth.middleware';

export default class Store {
	public readonly router: Router = Router();
	private readonly path: string = '/store';

	constructor() {
		this.router.get(this.path, AuthMiddleware, this.getBooks);
	}

	private async getBooks(req: Request, res: Response) {
		return res.render('shop', { auth: true });
	}
}
