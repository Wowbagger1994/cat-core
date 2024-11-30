import React, { useState, useEffect } from 'react';
import ChatBotInterface from '../ChatBotInterface';
import LangLearnForm from './LangLearnForm'; // Import del form
import { CircularProgress, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Funzione per simulare una richiesta all'endpoint
const sendLangLearnMessage = async (message: string): Promise<string> => {
  // Simulazione di una risposta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Risposta del chatbot Lang Learn a: "${message}"`);
    }, 1000);
  });
};

// Tema scuro Material UI 3
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
    button: {
      textTransform: 'none',
    },
  },
});

const LangLearn: React.FC = () => {
  const [formCompleted, setFormCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Controlla localStorage per verificare se il form è già stato compilato
    const isFormCompleted = localStorage.getItem('langLearnFormCompleted') === 'true';
    setFormCompleted(isFormCompleted);
    setLoading(false); // Imposta il caricamento come completo
  }, []);

  // Funzione per gestire il submit del form e segnare come completato
  const handleFormSubmit = () => {
    setFormCompleted(true);
    localStorage.setItem('langLearnFormCompleted', 'true');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Mostra un loader durante la fase di caricamento */}
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {/* Se il form non è stato completato, mostra il form invece del chatbot */}
          {!formCompleted ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={3}
              bgcolor="background.paper"
              borderRadius={2}
              minHeight="500px"
              mx="auto"
              maxWidth="800px"
            >
              <LangLearnForm onSubmit={handleFormSubmit} />
            </Box>
          ) : (
            <ChatBotInterface
              onMessageSend={sendLangLearnMessage}
              title="Lang Learn Assistant"
            />
          )}
        </>
      )}
    </ThemeProvider>
  );
};

export default LangLearn;
