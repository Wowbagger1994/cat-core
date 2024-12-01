import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verifica che sia una richiesta di tipo GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Ottieni la sessione corrente tramite next-auth
    const session = await getSession({ req });

    // Se non c'è sessione, l'utente non è autenticato
    if (!session) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }

    // Estrai l'email dalla sessione
    const userEmail = session.user?.email;

    if (!userEmail) {
      return res.status(400).json({ message: 'User email is missing from session.' });
    }

    // Recupera i dati dell'utente dal database
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    // Se l'utente non è trovato
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Restituisci i dati del profilo dell'utente
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
