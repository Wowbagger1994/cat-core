import axios from "axios";

export async function GET(request: Request) {
	return new Response("GET request received");
}

export async function POST(request: Request) {
	const requestBody = await request.json();
	const options = {
		method: "POST",
		headers: {
			//Set key
			Authorization: "Bearer ",
			"Content-Type": "application/json",
		},
		//Check body
		body: JSON.stringify({
			model: "meta-llama/Meta-Llama-3-70B-Instruct-Turbo",
			messages: [
				{
					role: "user",
					content: requestBody.text,
				},
			],
			max_tokens: 512,
			stream: false,
		}),
	};
	const res = await axios(options);
	//Check response
	return new Response(JSON.stringify(res.data));
}
