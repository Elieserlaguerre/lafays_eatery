import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata = {
	title: "Layfay's Eatery",
	description: "Ms. Tan's online restaurant"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>{children}</body>
		</html>
	);
}
