import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, response: Response) {
      const nationalities = Object.values(prisma.$enumTypes.enumMap.Nationality);
      const languages = Object.values(prisma.$enumTypes.enumMap.Language);

      return new Response(JSON.stringify({ nationalities, languages }));
      
}
