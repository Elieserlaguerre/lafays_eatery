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
		console.log("get current user data", data);

		const { userId, domain } = data;

		if (!userId) return NextResponse.json({ message: "user Id is required." }, { status: 400 });
		if (!domain) return NextResponse.json({ message: "domain is required." }, { status: 400 });

		let user;

		switch (domain) {
			case "admin":
				user = await platformUsers[domain].findById({ _id: userId }).select({ password: 0 });
				return NextResponse.json({ results: user, message: "current user successfully accessed." }, { status: 200 });

			default:
				user = await platformUsers[domain].findById({ _id: userId }).select({ password: 0 });
				return NextResponse.json({ results: user, message: "current user successfully accessed." }, { status: 200 });
		}
	} catch (error) {
		console.log("GET route error:", error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
