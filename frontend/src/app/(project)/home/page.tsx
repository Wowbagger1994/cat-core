"use client";

import React, { useState } from 'react';
import {
  Box,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createTheme,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Importa l'icona del menu
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import Sidebar from './Sidebar';
import Burocracy from './burocracy/Burocracy';
import LangLearn from './langlearn/LangLearn';
import CreateTripForm from './CreateTripForm';
import FirstLoginForm from './FirstLoginForm';
import EditTripForm from './EditTripForm';
import { UserNav } from "@/components/ui/user-nav";

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

const HomePage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>(''); // Stato per tracciare la sezione selezionata
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(true); // Stato per verificare se è il primo login
  const [hasCreatedTrip, setHasCreatedTrip] = useState<boolean>(false); // Stato per verificare se un viaggio è stato creato

  // Funzione per rendere dinamico il contenuto principale
  const renderContent = () => {
    if (isFirstLogin) {
      // Se è il primo login, mostra il form di completamento profilo
      return <FirstLoginForm onSubmit={() => setIsFirstLogin(false)} />;
    }

    if (!hasCreatedTrip) {
      // Se il viaggio non è stato creato, mostra il modulo per creare un viaggio
      return <CreateTripForm onSubmit={() => setHasCreatedTrip(true)} />;
    }

    switch (selectedSection) {
      case 'burocracy':
        return <Burocracy />;
      case 'langLearn':
        return <LangLearn />;
      case 'editTrip':
        return <EditTripForm onSubmit={() => setSelectedSection('')} />; // Resetta la sezione una volta salvato
      default:
        return (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Typography variant="h6" color="textSecondary">
              Please select a section from the sidebar.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        
        {/* Navbar */}
        <AppBar position="static" sx={{ bgcolor: 'background.paper', mb: 2 }}>
          <Toolbar>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome to Nomad Nexus
            </Typography>
            
            {/* User Navigation Icons */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
              <UserNav />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Body */}
        <Container maxWidth="xl" sx={{ display: 'flex', flexGrow: 1, py: 2 }}>
          {/* Sidebar (mostra solo se non è il primo login e se il viaggio è stato creato) */}
          {!isFirstLogin && hasCreatedTrip && (
            <Box sx={{ width: '20%', minWidth: '200px', mr: 4 }}>
              <Sidebar onSelect={(section) => setSelectedSection(section)} />
            </Box>
          )}

          {/* Content */}
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 3,
              overflow: 'auto',
              maxWidth: isFirstLogin || !hasCreatedTrip ? '100%' : '75%',
              minHeight: '500px',
            }}
          >
            {renderContent()}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
