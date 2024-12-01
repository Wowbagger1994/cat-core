import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axiosClient from "./lib/axiosClient";

export const { auth, handlers, signIn, signOut } = NextAuth({
	secret: process.env.NEXTAUTH_SECRET, // Aggiungi questa linea
	pages: {
		signIn: "/",
	},
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "email",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}
				const { email, password } = credentials;

				try {
					const res = await axiosClient.post(
						"/auth/token",
						{
							username: email,
							password: password,
						},
						{
							headers: {
								"Content-Type": "application/json",
							},
						}
					);

					if (res.status !== 200) {
						return null;
					}

					const user = {
						id: res.data.id,
						name: res.data.username,
						accessToken: res.data.access_token,
					};
					return user;
				} catch (error) {
					console.error("Errore di autenticazione:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) return { ...token, ...user };
			return token;
		},

		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.user = token.user;
			return session;
		},
	},
});
