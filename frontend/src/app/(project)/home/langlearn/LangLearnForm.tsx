import React, { useState } from 'react';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

interface LangLearnFormProps {
  onSubmit: () => void;
}

const LangLearnForm: React.FC<LangLearnFormProps> = ({ onSubmit }) => {
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [targetLevel, setTargetLevel] = useState<string>('');
  const [timeToAchieve, setTimeToAchieve] = useState<string>('');
  const [weeklyTime, setWeeklyTime] = useState<string>('');
  const [interactionFrequency, setInteractionFrequency] = useState<string>('');
  const [languageFocus, setLanguageFocus] = useState<string>('');
  const [otherLanguageFocus, setOtherLanguageFocus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const langLearnData = {
      currentLevel,
      targetLevel,
      timeToAchieve,
      weeklyTime,
      interactionFrequency,
      languageFocus: languageFocus === 'Altro' ? otherLanguageFocus : languageFocus,
    };
    console.log('Language learning data:', langLearnData);

    // try {
    //   // Effettua una chiamata POST per salvare i dati nel database
    //   await axios.post('/api/user/langlearn', langLearnData);
    //   alert('Language learning information saved successfully!');
    // } catch (error) {
    //   console.error('Errore nel salvataggio delle informazioni linguistiche:', error);
    //   alert('Si è verificato un errore durante il salvataggio delle informazioni.');
    // } finally {
    // }
    setLoading(false);
    onSubmit(); // Notifica il componente genitore che il form è stato inviato con successo
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        alignItems: 'center',
        p: 2,
        height: '100%',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 100px)', // Limitare l'altezza del form per mantenere la dimensione del viewport
      }}
    >
      <Typography variant="h4" color="primary" textAlign="center">
        Apprendimento della Lingua Locale
      </Typography>
      <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ width: '70%' }}>
        Compila queste informazioni per supportarti al meglio nell'apprendimento della lingua del paese selezionato.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, width: '100%' }}>
        {/* Left Column */}
        <Box sx={{ flex: 1, maxHeight: '300px', overflowY: 'auto', p: 1 }}>
          {/* Current Level */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="current-level-label">Livello Linguistico Attuale</InputLabel>
            <Select
              labelId="current-level-label"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              label="Livello Linguistico Attuale"
              required
            >
              <MenuItem value="" disabled>Seleziona il tuo livello...</MenuItem>
              <MenuItem value="Nessuna conoscenza (principiante assoluto)">Nessuna conoscenza (principiante assoluto)</MenuItem>
              <MenuItem value="A1">A1 (Comprendo e uso espressioni familiari di uso quotidiano)</MenuItem>
              <MenuItem value="A2">A2 (Posso comunicare in attività semplici e scambiare informazioni su argomenti comuni)</MenuItem>
              <MenuItem value="B1">B1 (Riesco a comprendere e rispondere su argomenti familiari)</MenuItem>
              <MenuItem value="B2">B2 (Sono in grado di interagire con fluidità e spontaneità in contesti complessi)</MenuItem>
              <MenuItem value="C1">C1 (Posso esprimermi in modo fluente e strutturato su una vasta gamma di argomenti)</MenuItem>
              <MenuItem value="C2">C2 (Livello madrelingua o quasi)</MenuItem>
            </Select>
          </FormControl>

          {/* Weekly Time Dedication */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 4 }}>
            <InputLabel id="weekly-time-label">Tempo Settimanale di Studio</InputLabel>
            <Select
              labelId="weekly-time-label"
              value={weeklyTime}
              onChange={(e) => setWeeklyTime(e.target.value)}
              label="Tempo Settimanale di Studio"
              required
            >
              <MenuItem value="" disabled>Seleziona il tempo settimanale...</MenuItem>
              <MenuItem value="Meno di 2 ore a settimana">Meno di 2 ore a settimana</MenuItem>
              <MenuItem value="2-5 ore a settimana">2-5 ore a settimana</MenuItem>
              <MenuItem value="5-10 ore a settimana">5-10 ore a settimana</MenuItem>
              <MenuItem value="10-15 ore a settimana">10-15 ore a settimana</MenuItem>
              <MenuItem value="Oltre 15 ore a settimana">Oltre 15 ore a settimana</MenuItem>
            </Select>
          </FormControl>

          {/* Interaction Frequency */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 4 }}>
            <InputLabel id="interaction-frequency-label">Frequenza delle Interazioni Locali</InputLabel>
            <Select
              labelId="interaction-frequency-label"
              value={interactionFrequency}
              onChange={(e) => setInteractionFrequency(e.target.value)}
              label="Frequenza delle Interazioni Locali"
              required
            >
              <MenuItem value="" disabled>Seleziona la frequenza...</MenuItem>
              <MenuItem value="Quasi mai (interazioni minime)">Quasi mai (interazioni minime)</MenuItem>
              <MenuItem value="Raramente (una o due volte a settimana)">Raramente (una o due volte a settimana)</MenuItem>
              <MenuItem value="Qualche volta (tre o quattro volte a settimana)">Qualche volta (tre o quattro volte a settimana)</MenuItem>
              <MenuItem value="Frequentemente (quasi ogni giorno)">Frequentemente (quasi ogni giorno)</MenuItem>
              <MenuItem value="Quotidianamente (interazioni continue)">Quotidianamente (interazioni continue)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1, maxHeight: '400px', overflowY: 'auto', p: 1 }}>
          {/* Target Level */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="target-level-label">Livello Linguistico da Raggiungere</InputLabel>
            <Select
              labelId="target-level-label"
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
              label="Livello Linguistico da Raggiungere"
              required
            >
              <MenuItem value="" disabled>Seleziona il livello che vuoi raggiungere...</MenuItem>
              <MenuItem value="A1">A1 (Comprendere e usare espressioni quotidiane di base)</MenuItem>
              <MenuItem value="A2">A2 (Interagire in conversazioni semplici su argomenti comuni)</MenuItem>
              <MenuItem value="B1">B1 (Comunicare in modo autonomo su argomenti familiari)</MenuItem>
              <MenuItem value="B2">B2 (Interagire con naturalezza in situazioni lavorative e sociali)</MenuItem>
              <MenuItem value="C1">C1 (Esprimere idee complesse con precisione e fluidità)</MenuItem>
              <MenuItem value="C2">C2 (Padroneggiare la lingua quasi come un madrelingua)</MenuItem>
            </Select>
          </FormControl>

          {/* Time to Achieve Target Level */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 4 }}>
            <InputLabel id="time-to-achieve-label">Tempo per Raggiungere il Livello</InputLabel>
            <Select
              labelId="time-to-achieve-label"
              value={timeToAchieve}
              onChange={(e) => setTimeToAchieve(e.target.value)}
              label="Tempo per Raggiungere il Livello"
              required
            >
              <MenuItem value="" disabled>Seleziona il tempo per raggiungere il livello...</MenuItem>
              <MenuItem value="Meno di 1 mese">Meno di 1 mese</MenuItem>
              <MenuItem value="1-2 mesi">1-2 mesi</MenuItem>
              <MenuItem value="2-3 mesi">2-3 mesi</MenuItem>
              <MenuItem value="3-6 mesi">3-6 mesi</MenuItem>
              <MenuItem value="Più di 6 mesi">Più di 6 mesi</MenuItem>
              <MenuItem value="Non ho un limite di tempo specifico">Non ho un limite di tempo specifico</MenuItem>
            </Select>
          </FormControl>

          {/* Language Focus */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 4 }}>
            <InputLabel id="language-focus-label">Settore di Interesse Linguistico</InputLabel>
            <Select
              labelId="language-focus-label"
              value={languageFocus}
              onChange={(e) => setLanguageFocus(e.target.value)}
              label="Settore di Interesse Linguistico"
              required
            >
              <MenuItem value="" disabled>Seleziona il linguaggio d'interesse...</MenuItem>
              <MenuItem value="Linguaggio quotidiano">Linguaggio quotidiano (es. acquisti, ristoranti, socializzazione)</MenuItem>
              <MenuItem value="Linguaggio professionale">Linguaggio professionale (es. terminologia lavorativa, e-mail formali)</MenuItem>
              <MenuItem value="Linguaggio legale/amministrativo">Linguaggio legale/amministrativo (es. documenti, pratiche burocratiche)</MenuItem>
              <MenuItem value="Linguaggio accademico">Linguaggio accademico (es. studi universitari, conferenze)</MenuItem>
              <MenuItem value="Linguaggio tecnico">Linguaggio tecnico (es. tecnologia, ingegneria, scienze)</MenuItem>
              <MenuItem value="Altro">Altro (specificare)</MenuItem>
            </Select>
          </FormControl>
          {languageFocus === 'Altro' && (
            <TextField
              value={otherLanguageFocus}
              onChange={(e) => setOtherLanguageFocus(e.target.value)}
              label="Specifica il linguaggio d'interesse"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              required
            />
          )}
        </Box>
      </Box>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 4, width: '200px' }} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
    </Box>
  );
};

export default LangLearnForm;
