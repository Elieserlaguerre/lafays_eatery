"use client";
import React from "react";
import { useAtomValue } from "jotai";
import { currentDomain } from "@/app/lib/state-management/section/global";
import Register from "../global-components/Register";
import Login from "../global-components/Login";
import Navbar from "../navigation/components/Navbar";
import { dynamicExternalNavlist } from "@/app/lib/util/frontend";
import Footer from "../navigation/components/Footer";

export default function ExternalLayout({ children }) {
	const domain = useAtomValue(currentDomain);

	const dynamicNavbar = () => {
		switch (domain) {
			case "admin":
				return <Navbar navList={dynamicExternalNavlist(domain)} />;

			default:
				return;
		}
	};

	return (
		<div>
			<div>{dynamicNavbar()}</div>
			<div className="min-h-screen">{children}</div>
			<div>
				<Footer />
			</div>
			<div className="hidden">
				<Register />
				<Login />
			</div>
		</div>
	);
}
