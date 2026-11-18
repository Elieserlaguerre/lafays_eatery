import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import ProvidersLayout from "../../components/layouts/ProvidersLayout";
import ExternalLayout from "../../components/layouts/ExternalLayout";
import { Suspense } from "react";
import ProvidersFallback from "../../components/global-components/ProvidersFallback";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata = {
	title: "Lafay's Eatery",
	description: "Ms. Tan's online restaurant"
};

export default function RootLayout({ children }) {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}
	return (
		<html lang="en" className={classNames(geistSans.variable, geistMono.variable, "h-full antialiased")}>
			<body className="min-h-full flex flex-col">
				<Suspense fallback={<ProvidersFallback />}>
					<ProvidersLayout>
						<ExternalLayout>{children}</ExternalLayout>
					</ProvidersLayout>
				</Suspense>
			</body>
		</html>
	);
}
