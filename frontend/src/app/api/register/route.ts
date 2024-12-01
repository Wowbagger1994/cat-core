import prisma from "@/lib/prisma";

export async function POST(request: Request) {
	const requestBody = await request.json();

	prisma.user
		.create({
			data: {
				name: requestBody.name,
			},
		})
		.then(() => console.log("User created"));

	//Check response
	return new Response("User created");
}
