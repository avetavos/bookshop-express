import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserModel from '../models/user.model';
import ProfileModel from '../models/profile.model';
import AuthMiddleware from '../middlewares/auth.middleware';
import RegisterValidator from '../middlewares/validators/register.validator';

export default class Authentication {
	public readonly router = Router();
	private readonly path = '/auth';

	constructor() {
		this.router.get(`${this.path}/login`, this.Login);
		this.router.post(`${this.path}/login`, this.Signin);
		this.router.get(`${this.path}/register`, this.Register);
		this.router.post(`${this.path}/register`, RegisterValidator, this.Signup);
		this.router.get(`${this.path}/logout`, AuthMiddleware, this.Signout);
	}

	private async Login(req, res) {
		return await res.render('login');
	}

	private async Signin(req, res) {
		return res.json(req.body);
	}

	private async Register(req, res) {
		return await res.render('register');
	}

	private async Signup(req, res) {
		const { name, email, password, gender, addressOne, addressTwo, province, zipcode } = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.render('register', {
				name,
				email,
				gender,
				addressOne,
				addressTwo,
				province,
				zipcode,
				errors: errors.array()
			});
		}
		try {
			const user = new UserModel({ email, password });
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			user.password = await undefined;
			const profile = new ProfileModel({
				user: user._id,
				name,
				gender,
				addressOne,
				addressTwo,
				province,
				zipcode
			});
			await profile.save();
			const expiresIn = 60 * 60;
			const secret = process.env.JWT_SECRET as Secret;
			const dataStoredInToken = {
				_id: user._id
			};
			// req.user = jwt.sign(dataStoredInToken, secret, { expiresIn });
			return res.redirect('/store');
		} catch (err) {}
	}

	private async Signout(req, res) {
		await res.clearCookie('authorization');
		return res.redirect('/');
	}
}
