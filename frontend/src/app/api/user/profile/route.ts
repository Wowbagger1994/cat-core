import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient, Nationality, Language } from "@prisma/client";


const prisma = new PrismaClient();

// export async function GET(request: Request, response: Response) {
//   const data = 
// }
