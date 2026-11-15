import React, { Fragment } from "react";
import { cookies } from "next/headers";

import ReduxProvider from "../providers/ReduxProvider";
import ToasterProvider from "../providers/ToasterProvider";
import JotaiProvider from "../providers/JotaiProvider";
import DomainProvider from "../providers/DomainProvider";
import Session from "../providers/SessionProvider";
import UserProvider from "../providers/UserProvider";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function ProvidersLayout({ children }) {
	const cookieStore = await cookies();
	const subdomain = cookieStore.get("domain")?.value ?? "customers";

	return (
		<Fragment>
			<ReduxProvider>
				<ToasterProvider>
					<Session>
						<JotaiProvider>
							<DomainProvider subdomain={subdomain}>
								<ThemeProvider domain={subdomain}>
									<UserProvider>{children}</UserProvider>
								</ThemeProvider>
							</DomainProvider>
						</JotaiProvider>
					</Session>
				</ToasterProvider>
			</ReduxProvider>
			<Analytics />
			<SpeedInsights />
		</Fragment>
	);
}
