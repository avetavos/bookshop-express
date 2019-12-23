import { check } from 'express-validator';
import UserModel from '../../models/user.model';

const validator = [
	check('name', 'Name is required.')
		.not()
		.isEmpty()
		.withMessage('Name is required.'),
	check('email')
		.isEmail()
		.withMessage('Please include a valid email.')
		.custom(email => {
			return UserModel.findOne({ email }).then(user => {
				if (user) {
					return Promise.reject('Email already exists.');
				}
			});
		})
		.withMessage('Email already exists.'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Please enter a password with 6 or more characters.'),
	check('confirmPassword')
		.custom((value, { req }) => value === req.body.password)
		.withMessage('Passwords and confirm password must match.'),
	check('gender')
		.not()
		.isEmpty()
		.withMessage('Gender is required.'),
	check('addressOne')
		.not()
		.isEmpty()
		.withMessage('Address one is required.'),
	check('province')
		.not()
		.isEmpty()
		.withMessage('Province is required.'),
	check('zipcode')
		.not()
		.isEmpty()
		.withMessage('Zip code is required.')
];

export default validator;
