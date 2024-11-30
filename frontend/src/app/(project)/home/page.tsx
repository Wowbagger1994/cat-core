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
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import Sidebar from './Sidebar';
import Burocracy from './burocracy/Burocracy';
import LangLearn from './langlearn/LangLearn';
import CreateTripForm from './CreateTripForm';
import FirstLoginForm from './FirstLoginForm';
import EditTripForm from './EditTripForm';

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Stato per gestire il menu a tendina
  const open = Boolean(anchorEl);

  // Funzione per gestire l'apertura del menu utente
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Funzione per gestire la chiusura del menu utente
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Funzione per gestire il logout
  const handleLogout = () => {
    window.location.href = '/api/auth/signout';
    console.log("Logout");
    handleMenuClose();
  };

  // Funzione per rendere dinamico il contenuto principale
  const renderContent = () => {
    if (isFirstLogin) {
      return <FirstLoginForm onSubmit={() => setIsFirstLogin(false)} />;
    }

    if (!hasCreatedTrip) {
      return <CreateTripForm onSubmit={() => setHasCreatedTrip(true)} />;
    }

    switch (selectedSection) {
      case 'burocracy':
        return <Burocracy />;
      case 'langLearn':
        return <LangLearn />;
      case 'editTrip':
        return <EditTripForm onSubmit={() => setSelectedSection('')} />;
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

              {/* Aggiungere un'icona utente che ti permette di aprire un menu a tendina per il logout */}
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </IconButton>

              {/* Menu a tendina per il logout */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1, // Sposta il menu verso il basso di 1 spacing unit
                  },
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
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
