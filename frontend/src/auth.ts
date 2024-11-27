import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axiosClient from "./lib/axiosClient";

export const { auth, handlers, signIn, signOut } = NextAuth({
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
				console.log(res.data);
				if (res.status !== 200) {
					return null;
				}
				const user: any = {
					user: {
						id: res.data.id,
						name: res.data.username,
					},
					accessToken: res.data.access_token,
				};
				return user;
			},
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth;
		},
		async jwt({ token, user }) {
			if (user) return { ...token, ...user };

			return token;
		},

		async session({ session, token }) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
});
