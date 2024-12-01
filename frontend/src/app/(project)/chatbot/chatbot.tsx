"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";

export default async function ChatBot({ user }: { user: string }) {
	async function sendMessage(msg: string) {
		const options = {
			method: "POST",
			url: process.env.BACKEND_URL + "/message",
			headers: { "Content-Type": "application/json", user_id: user },
			data: {
				text: msg,
				user_info: { name: "Enrik" },
			},
		};

		try {
			const data = await axios.request(options);
			console.log("data: ", data.data);
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div>
			<Button onClick={() => sendMessage}>Start conversation</Button>
		</div>
	);
}
