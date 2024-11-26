import axiosClient from "@/lib/axiosClient";
import { Session } from "next-auth";
import { auth } from "@/auth";

export default async function DashboardPage() {
	const session = await auth();

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}
