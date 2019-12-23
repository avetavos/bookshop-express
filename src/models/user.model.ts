import { Schema, model, Document } from 'mongoose';
import User from '../interfaces/user.interface';

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

const UserModel = model<Document & User>('user', UserSchema);

export default UserModel;
