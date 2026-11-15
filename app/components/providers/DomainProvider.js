"use client";
import { currentDomain } from "@/app/lib/state-management/section/global";
import { useSetAtom } from "jotai";
import React, { Fragment, useEffect } from "react";

export default function DomainProvider({ children, subdomain }) {
	const setDepartment = useSetAtom(currentDomain);

	useEffect(() => {
		setDepartment(subdomain);
	}, [subdomain]);

	return <Fragment>{children}</Fragment>;
}
