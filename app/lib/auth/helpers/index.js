import bcrypt from "bcryptjs";
import { platformUsers } from "../../model/helpers";
import db from "../../database/config";

export const encryptPassword = async (password) => {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(password, saltRounds);
	return hash;
};

export const verifyPassword = async (credentials, req) => {
	try {
		await db.connect();

		const { email, password, select_account, department } = credentials;

		let user = null;
		let passwordMatch = false;

		if (department) {
			user = await platformUsers[department].findOne({ email });
			passwordMatch = user && (await bcrypt.compare(password, user.password));
		} else {
			throw new Error("Document model is not recognized.");
		}

		if (!passwordMatch || !user) {
			return { verified: false, user: null };
		}

		// ✅ Return plain object
		const userObj = {
			_id: user?._id?.toString(),
			name: `${user?.firstName} ${user?.lastName}`,
			email: user.email,
			image: user?.image ?? "",
			cloudinarySubfolder: user?.cloudinarySubfolder ?? "",
			status: user?.status || null,
			department: department
		};

		return { verified: true, user: userObj };
	} catch (error) {
		console.log("verifyPassword error:", error.message);
		return { verified: false };
	}
};
