import { auth } from "@/auth";
import ChatBot from "./chatbot";

export default async function ChatBotPage() {
	const session = await auth();
	console.log(session);

	console.log("ChatBotPage");
	return <ChatBot user={session?.user.name} />;
}
