import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Ottieni il corpo della richiesta
    const requestBody = await request.json();

    // Controlla se un utente con lo stesso nome esiste già
    const existingUser = await prisma.user.findUnique({
      where: {
        name: requestBody.name,
      },
    });

    if (existingUser) {
      // Se l'utente esiste già, restituisci un errore
      return new Response(JSON.stringify({ error: "Il nome utente è già in uso." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Crea un nuovo utente se non esiste
    await prisma.user.create({
      data: {
        name: requestBody.name,
      },
    });

    // Restituisci una risposta di successo
    return new Response(JSON.stringify({ message: "Utente creato con successo." }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Errore durante la creazione dell'utente:", error);

    // Restituisci un errore generico in caso di eccezioni
    return new Response(JSON.stringify({ error: "Errore durante la creazione dell'utente." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
