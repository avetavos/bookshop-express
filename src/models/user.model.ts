import { Schema, model } from 'mongoose';

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

const UserModel = model('user', UserSchema);

export default UserModel;
