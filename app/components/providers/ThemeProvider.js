"use client";

import { dynamicLayoutThemeColor } from "@/app/lib/util/frontend";
import React from "react";
import { createContext, useContext, useMemo } from "react";

// create context
const ThemeContext = createContext(null);

// hook (we'll export later)
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export function ThemeProvider({ children, domain }) {
	const theme = useMemo(() => {
		if (!domain) return null;
		return dynamicLayoutThemeColor(domain);
	}, [domain]);

	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
