"use client";
import React from "react";
import { useAtomValue } from "jotai";
import { currentDomain } from "@/app/lib/state-management/section/global";
import CustomersFooter from "../navigation/components/CustomersFooter";
import AdminFooter from "../navigation/components/AdminFooter";
import Register from "../global-components/Register";
import Login from "../global-components/Login";

export default function ExternalLayout({ children }) {
	const domain = useAtomValue(currentDomain);

	const dynamicFooter = () => {
		switch (domain) {
			case "admin":
				return <AdminFooter />;
			default:
				return <CustomersFooter />;
		}
	};

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
			<div>{dynamicFooter()}</div>
			<div className="hidden">
				<Register />
				<Login />
			</div>
		</div>
	);
}
