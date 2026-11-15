import { verifyPassword } from "@/app/lib/auth/helpers";
import db from "@/app/lib/database/config";
import { platformUsers } from "@/app/lib/model/helpers";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		await db.connect();
		let query, data;
		query = await req.nextUrl.searchParams;
		// console.log("query",query);

		data = Object.fromEntries(query.entries());
		console.log("data", data);

		const { email, password, domain } = data;

		if (!email) return NextResponse.json({ message: "email is required." }, { status: 400 });
		if (!password) return NextResponse.json({ message: "password is required." }, { status: 400 });
		if (!domain) return NextResponse.json({ message: "domain is required." }, { status: 400 });

		let user, passwordMatch;

		user = await platformUsers[domain].findOne({ email }).lean();

		if (!user) return NextResponse.json({ message: "User not found." }, { status: 404 });

		passwordMatch = await verifyPassword(data);

		if (passwordMatch.verified === false) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });

		const results = {
			...user,
			password
		};

		return NextResponse.json({ results, message: "User Verified." }, { status: 200 });
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
