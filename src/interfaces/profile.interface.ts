interface Profile {
	_id: string;
	user: string;
	name: string;
	gender: string;
	addressOne: string;
	addressTwo?: string;
	province: string;
	zipcode: number;
}

export default Profile;
