import axiosClient from "@/lib/axiosClient";
import { Session } from "next-auth";
import { auth } from "@/auth";
import { CatClient } from "ccat-api";

export default async function ChatBotPage() {
	const session = await auth();
	console.log(session);

	// const cat = new CatClient({
	// 	host: "localhost",
	// 	userId: "admin",
	// 	port: 1865,
	// 	//... other settings
	// });

	// function startConversation() {
	// 	cat.send("Hello, who are you and what can you do for me?");
	// 	console.log(cat.api?.users);
	// }

	// cat.onConnected(startConversation);
	// cat.init();
	console.log("ChatBotPage");
	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}
