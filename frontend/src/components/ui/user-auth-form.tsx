"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import axiosClient from "@/lib/axiosClient";
import axios from "axios";
import prisma from "@/lib/prisma";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isLogin, setIsLogin] = React.useState<boolean>(true);

	const credentialsAction = (formData: FormData) => {
		signIn("credentials", {
			name: formData.get("name"),
			password: formData.get("password"),
			redirectTo: "/home",
		})
			.then(() => {
				setIsLoading(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	async function registerAction(formData: FormData) {
		let name = formData.get("name") as string;
		let password = formData.get("password") as string;
		await axios
			.post("http://localhost:1865/users ", {
				username: name,
				password: password,
				permissions: {
					CONVERSATION: ["WRITE", "EDIT", "LIST", "READ", "DELETE"],
				},
			})
			.then(() => {
				setIsLoading(true);
				fetch("/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name: name }),
				});
			})
			.finally(() => {
				setIsLoading(false);
				setIsLogin(true);
			});
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			{isLogin ? (
				<form action={credentialsAction}>
					<div className="grid gap-2">
						<div className="grid gap-1">
							<Label className="sr-only" htmlFor="name">
								name
							</Label>
							<Input
								id="name"
								placeholder="Name"
								type="text"
								name="name"
								autoCapitalize="none"
								autoComplete="name"
								autoCorrect="off"
								required
								disabled={isLoading}
							/>
							<Label className="sr-only" htmlFor="password">
								Password
							</Label>
							<Input
								id="password"
								type="password"
								name="password"
								placeholder="Password"
								autoCorrect="off"
								required
								disabled={isLoading}
							/>
						</div>
						<Button disabled={isLoading}>
							{isLoading && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
							Sign In
						</Button>
					</div>
				</form>
			) : (
				<form action={registerAction}>
					<div className="grid gap-2">
						<div className="grid gap-1">
							<Input
								id="name"
								name="name"
								type="name"
								placeholder="Name"
								autoComplete="name"
								required
								disabled={isLoading}
							/>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Password"
								required
								disabled={isLoading}
							/>
						</div>
						<Button disabled={isLoading}>
							{isLoading && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
							Register
						</Button>
					</div>
				</form>
			)}
			<Button
				variant="ghost"
				onClick={() => setIsLogin(!isLogin)}
				// className={cn("absolute  md:right-8 md:top-8")}
			>
				{isLogin
					? "Create an account"
					: "Already have an account? Sign In"}
			</Button>
		</div>
	);
}