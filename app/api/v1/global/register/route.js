import { encryptPassword } from "@/app/lib/auth/helpers";
import db from "@/app/lib/database/config";
import { platformUsers } from "@/app/lib/model/helpers";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await db.connect();
		let data;
		data = await req.json();
		console.log("data", data);

		const { user, department } = data;

		if (!user) return NextResponse.json({ message: "user data is required." }, { status: 400 });
		if (!department) return NextResponse.json({ message: "current department is required." }, { status: 400 });

		const newUser = {
			...user,
			cloudinarySubfolder: `Lafays_Eatery/${slugify(`${user.firstName} ${user.lastName}`)}/${department}`
		};

		let createdUser, userAlreadyExist;

		userAlreadyExist = await platformUsers[department].findOne({ email: user.email });

		if (userAlreadyExist) return NextResponse.json({ results: userAlreadyExist, message: "user already exist." }, { status: 200 });

		newUser.password = await encryptPassword(user.password);

		createdUser = await platformUsers[department].create(newUser);

		return NextResponse.json({ results: createdUser, message: `${createdUser.docType}: ${createdUser.firstName} ${createdUser.lastName} was successfully created.` }, { status: 200 });
	} catch (error) {
		console.log("POST route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
