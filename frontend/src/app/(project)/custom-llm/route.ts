import { OpenAI } from "openai";

const api = new OpenAI({
	baseURL: "https://api.aimlapi.com/v1",
	apiKey: "fc0d8669ce7c45de97ad3969736b6537",
});

export async function GET(request: Request) {
	return new Response("GET request received");
}

export async function POST(request: Request) {
	const requestBody = await request.json();
	console.log(requestBody.text);
	const result = await api.chat.completions.create({
		model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
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
