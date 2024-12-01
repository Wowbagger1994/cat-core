import { OpenAI } from "openai";

const api = new OpenAI({
	baseURL: "https://api.aimlapi.com/v1",
	apiKey: "1234d0c783954b6d8062f61148fe85be",
});

export async function GET(request: Request) {
	return new Response("GET request received");
}

export async function POST(request: Request) {
	const requestBody = await request.json();
	console.log(requestBody.text);
	const result = await api.chat.completions.create({
		model: process.env.MODEL as string,
		messages: [
			{
				role: "user",
				content: requestBody.text,
			},
		],
	});

	//Check response
	return new Response(
		JSON.stringify({ text: result.choices[0].message.content })
	);
}
