import React, { useState, useEffect } from 'react';
import ChatBotInterface from '../ChatBotInterface';
import BurocracyForm from './BurocracyForm'; // Import del form
import { ThemeProvider, createTheme, CssBaseline, CircularProgress, Box } from '@mui/material';

// Funzione per simulare una richiesta all'endpoint
const sendBurocracyMessage = async (message: string): Promise<string> => {
  // Simulazione di una risposta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Risposta del chatbot Burocracy a: "${message}"`);
    }, 1000);
  });
};

// Tema scuro per Material UI, in linea con Material 3
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

const Burocracy: React.FC = () => {
  const [formCompleted, setFormCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Controlla localStorage per verificare se il form è già stato compilato
    const isFormCompleted = localStorage.getItem('burocracyFormCompleted') === 'true';
    setFormCompleted(isFormCompleted);
    setLoading(false); // Imposta il caricamento come completo
  }, []);

  // Funzione per gestire il submit del form e segnare come completato
  const handleFormSubmit = () => {
    setFormCompleted(true);
    localStorage.setItem('burocracyFormCompleted', 'true');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          !formCompleted ? (
            <BurocracyForm onSubmit={handleFormSubmit} />
          ) : (
            <ChatBotInterface 
              service='burocracy'
              title="Burocracy Assistant" />
          )
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Burocracy;
