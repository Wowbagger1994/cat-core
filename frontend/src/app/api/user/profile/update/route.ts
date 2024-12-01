import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, profession, nomadExperience, birthDate, nationality, languages, residenceCountry } = req.body;

      // Verifica se il nome dell'utente esiste nel DB
      const existingUser = await prisma.user.findUnique({
        where: {
          name: name,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Aggiorna il profilo utente con i nuovi dati
      const updatedUser = await prisma.user.update({
        where: {
          name: name,
        },
        data: {
          profession,
          nomadExperience,
          birthDate: new Date(birthDate),
          nationality,
          language: languages,
          residenceCountry,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del profilo utente:', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
