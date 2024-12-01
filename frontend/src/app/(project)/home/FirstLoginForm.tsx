import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import axios from 'axios';

interface FirstLoginFormProps {
  onSubmit: () => void;
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

const FirstLoginForm: React.FC<FirstLoginFormProps> = ({ onSubmit }) => {
  // States for form responses
  const [profession, setProfession] = useState<string>('');
  const [nomadExperience, setNomadExperience] = useState<string>('');
  const [otherProfession, setOtherProfession] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [languages, setLanguages] = useState<string>('');
  const [residenceCountry, setResidenceCountry] = useState<string>('');

  // States for dropdown options
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

  // Fetch nationalities and languages on mount
  useEffect(() => {
    const fetchEnums = async () => {
      try {
        // Assuming you have an API endpoint to fetch enums
        const response = await axios.get('/api/user/enums');
        setNationalities(response.data.nationalities);
        setAvailableLanguages(response.data.languages);
      } catch (error) {
        console.error('Errore nel recupero delle opzioni:', error);
      }
    };

    
    fetchEnums();
  }, []);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      profession: profession === 'Altro' ? otherProfession : profession,
      nomadExperience,
      birthDate,
      nationality,
      languages,
      residenceCountry,
    });

    // Call the onSubmit function after form submission
    onSubmit();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3} p={4} bgcolor="background.paper" borderRadius={2}>
          <Typography variant="h5" color="text.primary" textAlign="center">
            Complete Your Profile
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Attraverso queste informazioni, ci aiuti a capire meglio alcuni aspetti da tenere conto per riuscire a supportarti durante la tua esperienza con l'applicazione.
          </Typography>

          <Box display="flex" gap={2}>
            {/* Birth Date Field */}
            <TextField
              label="Data di nascita"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />

            {/* Nationality Field */}
            <FormControl fullWidth required>
              <InputLabel id="nationality-label">Nazionalità</InputLabel>
              <Select
                labelId="nationality-label"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                label="Nazionalità"
              >
                {nationalities.map((nation) => (
                  <MenuItem key={nation} value={nation}>
                    {nation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" gap={2}>
            {/* Languages Field */}
            <FormControl fullWidth required>
              <InputLabel id="language-label">Lingue parlate</InputLabel>
              <Select
                labelId="language-label"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                label="Lingue parlate"
              >
                {availableLanguages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Residence Country Field */}
            <TextField
              label="Paese in cui vivo regolarmente"
              value={residenceCountry}
              onChange={(e) => setResidenceCountry(e.target.value)}
              placeholder="Inserisci il paese in cui vivi"
              fullWidth
              required
            />
          </Box>

          {/* Profession Field */}
          <FormControl fullWidth required>
            <InputLabel>Quale professione svolgi?</InputLabel>
            <Select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              label="Quale professione svolgi?"
            >
              <MenuItem value="" disabled>
                Seleziona la tua professione...
              </MenuItem>
              <MenuItem value="Professionista tecnologico">
                Professionista tecnologico (es. Programmatore, Designer, Project Manager)
              </MenuItem>
              <MenuItem value="Creativo digitale">
                Creativo digitale (es. Content Creator, Marketer, Videomaker)
              </MenuItem>
              <MenuItem value="Consulente/Freelancer aziendale">
                Consulente/Freelancer aziendale (es. Consulente di business, Coach)
              </MenuItem>
              <MenuItem value="Educatore/Formatore">
                Educatore/Formatore (es. Insegnante online, Tutor)
              </MenuItem>
              <MenuItem value="Artista/Creativo">
                Artista/Creativo (es. Artista visuale, Musicista, Fotografo)
              </MenuItem>
              <MenuItem value="Ricercatore/Accademico">
                Ricercatore/Accademico
              </MenuItem>
              <MenuItem value="Sanitario/Medico">
                Sanitario/Medico (es. Medico, Psicologo, Fisioterapista che lavora da remoto)
              </MenuItem>
              <MenuItem value="Altro">Altro (specificare)</MenuItem>
            </Select>
            {profession === 'Altro' && (
              <TextField
                value={otherProfession}
                onChange={(e) => setOtherProfession(e.target.value)}
                placeholder="Specifica la tua professione"
                fullWidth
                required
              />
            )}
          </FormControl>

          {/* Nomad Experience Field */}
          <FormControl fullWidth required>
            <InputLabel>Hai già avuto esperienze come Nomade Digitale?</InputLabel>
            <Select
              value={nomadExperience}
              onChange={(e) => setNomadExperience(e.target.value)}
              label="Hai già avuto esperienze come Nomade Digitale?"
            >
              <MenuItem value="" disabled>
                Seleziona la tua esperienza...
              </MenuItem>
              <MenuItem value="Sì, ho vissuto e lavorato in più paesi">
                Sì, ho vissuto e lavorato in più paesi.
              </MenuItem>
              <MenuItem value="Sì, ma ho avuto solo esperienze in un altro paese">
                Sì, ma ho avuto solo esperienze in un altro paese.
              </MenuItem>
              <MenuItem value="No, questa è la mia prima esperienza">
                No, questa è la mia prima esperienza.
              </MenuItem>
              <MenuItem value="No, ma ho lavorato da remoto senza viaggiare">
                No, ma ho lavorato da remoto senza viaggiare.
              </MenuItem>
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '150px', alignSelf: 'center', mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FirstLoginForm;
