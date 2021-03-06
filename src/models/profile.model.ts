import { Schema, model, Document } from 'mongoose';
import Profile from '../interfaces/profile.interface';

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	gender: {
		type: String,
		required: true
	},
	addressOne: {
		type: String,
		required: true
	},
	addressTwo: String,
	province: {
		type: String,
		required: true
	},
	zipcode: {
		type: Number,
		required: true
	}
});

const ProfileModel = model<Document & Profile>('profile', ProfileSchema);

export default ProfileModel;
