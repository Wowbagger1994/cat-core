import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Nationality, Language } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, response: Response) {
	const nationalities = Object.values(Nationality);
	const languages = Object.values(Language);

	return new Response(JSON.stringify({ nationalities, languages }));
}
