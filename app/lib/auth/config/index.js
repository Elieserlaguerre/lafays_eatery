import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../helpers";


const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
				domain: { label: "domain", type: "text" }
			},
			async authorize(credentials, req) {
				try {
					const { verified, user } = await verifyPassword(credentials, req);
					if (verified) return user;
					return null;
				} catch (error) {
					console.log("NextAuth authorize Fn:", error.message);
					return null;
				}
			}
		})
	],

	secret: process.env.NEXTAUTH_SECRET,

	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 8 // logout of idle sessions after 8 hours
	},

	callbacks: {
		async signIn({ user }) {
			return !!user;
		},

		async jwt({ token, user, trigger, session }) {
			//Create token when user logs in.
			if (user) {
				token.userId = user._id;
				token.name = user.name;
				token.image = user.image;
				token.cloudinarySubfolder = user.cloudinarySubfolder;
				token.status = user.status;
				token.domain = user.domain;
			}

			//Update token when session is manually updated via `update()`
			if (trigger === "update" && session?.user) {
				token.userId = session.user._id ?? token.userId;
				token.name = session.user.name ?? token.name;
				token.image = session.user.image ?? token.image;
				token.status = session.user.status ?? token.status;
				token.domain = session.user.domain ?? token.domain;
			}

			return token;
		},

		async session({ session, token }) {
			if (!token) return session;

			// persist token data to login session.
			session.user._id = token.userId;
			session.user.name = token.name;
			session.user.image = token.image;
			session.user.cloudinarySubfolder = token.cloudinarySubfolder;
			session.user.status = token.status;
			session.user.domain = token.domain;

			return session;
		}
	}
};

export default authOptions;
