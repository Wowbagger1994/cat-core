import React from 'react';
import { Box, Button, Typography, Paper, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface SidebarProps {
  onSelect: (section: string) => void;
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
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
});

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 2, height: '100%', bgcolor: 'background.paper', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Service */}
        <div className='flex flex-col gap-4'>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => onSelect('burocracy')}
              sx={{ py: 2 }}
            >
              Burocracy
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => onSelect('langLearn')}
              sx={{ py: 2 }}
            >
              Lang Learn
            </Button>
          </Box>
        </div>

        {/* Edit Trip Button */}
        <div className='flex flex-col gap-2'>
          <Box mt={4}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => onSelect('editTrip')}
              sx={{ py: 2 }}
            >
              Edit Trip
            </Button>
          </Box>
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default Sidebar;
