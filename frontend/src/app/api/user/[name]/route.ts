import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient, Nationality, Language } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ name: string }>}) {
  const name = (await params).name;
  const data = await prisma.user.findUnique({
    where: {
      name: name
    }
  });
  return new Response(JSON.stringify(data));
}
