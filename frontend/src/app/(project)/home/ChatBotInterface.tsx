import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Container, Paper, TextField, Typography, ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

interface User {
  name: string;
  email?: string;
  profession?: string;
  nomadExperience?: string;
  birthDate?: Date;
  nationality?: string;
  language?: string;
  residenceCountry?: string;
  tripCount?: number;
  transportation?: string;
  duration?: string;
  purpose?: string;
  currentLevel?: string;
  targetLevel?: string;
  timeToAchieve?: string;
  weeklyTime?: number;
  weeklyFrequency?: string;
  languageFocus?: string;
  workMode?: string;
  documents?: any[];
}

interface ChatBotInterfaceProps {
  service: string;
  title: string;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
});

const ChatBotInterface: React.FC<ChatBotInterfaceProps> = ({ title, service }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false); // Stato per gestire l'invio del messaggio
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref per l'elemento di fine messaggi
  const { data: session } = useSession();

  // Verifica se la sessione è presente
  let user: User = {
    name: session?.user?.name ?? '',  // Imposta il nome dell'utente dalla sessione
    language: "English",
  };

  async function sendMessage(msg: string) {
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/message",
      headers: { "Content-Type": "application/json", user_id: user.name },
      data: {
        text: msg,
        user_info: { name: user.name },
        service: service,
      },
    };

    try {
      const response = await axios(options);
      console.log("Risposta dal chatbot:", response.data);
      return response.data;
    } catch (error) {
      console.error("Errore nell'invio del messaggio al chatbot:", error);
      throw error;
    }
  }

  // Funzione per scorrere automaticamente all'ultimo messaggio
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Esegui lo scroll ogni volta che cambia la lista dei messaggi
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Funzione per gestire l'invio di un messaggio
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Aggiungi il messaggio dell'utente alla conversazione
    const userMessage: ChatMessage = { sender: 'user', message: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      // Chiamata all'endpoint del chatbot per ottenere la risposta
      const botResponse = await sendMessage(input);
      const content = botResponse.content;
      const botMessage: ChatMessage = { sender: 'bot', message: content };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Errore nel recupero della risposta del bot:', error);
      const errorMessage: ChatMessage = { sender: 'bot', message: 'C’è stato un errore. Riprova più tardi.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" height="100%" gap={2} p={0}>
          <Typography variant="h5" color="text.primary" textAlign="center">
            {title}
          </Typography>
          <Paper elevation={3} sx={{ p: 3, height: '60vh', overflowY: 'auto', backgroundColor: 'background.paper' }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                mb={2}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    maxWidth: '75%',
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.default',
                    color: msg.sender === 'user' ? 'text.primary' : 'text.secondary',
                  }}
                >
                  {msg.message}
                </Box>
              </Box>
            ))}
            {/* Elemento nascosto per fare scroll all'ultimo messaggio */}
            <div ref={messagesEndRef} />
          </Paper>
          <Box component="form" onSubmit={handleSendMessage} display="flex" gap={2}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Scrivi un messaggio..."
              InputProps={{
                style: { color: 'white' },
              }}
              disabled={isSending} // Disabilitare il campo di input quando si attende la risposta
            />
            <Button type="submit" variant="contained" color="primary" disabled={isSending}>
              Invia
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChatBotInterface;
