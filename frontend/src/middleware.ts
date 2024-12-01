import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Recupera il token utilizzando next-auth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Verifica se il token è presente
  if (!token) {
    // Se il token non è presente, reindirizza l'utente alla pagina di login
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Se il token è presente, lascia che la richiesta continui
  return NextResponse.next();
}

// Definisci su quali percorsi deve essere applicato il middleware
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Aggiungi qui tutti i percorsi che desideri proteggere
};
