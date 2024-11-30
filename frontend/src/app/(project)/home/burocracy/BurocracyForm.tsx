import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

interface BurocracyFormProps {
  onSubmit: () => void;
}

const BurocracyForm: React.FC<BurocracyFormProps> = ({ onSubmit }) => {
  const [documents, setDocuments] = useState<string[]>([]);
  const [workMode, setWorkMode] = useState<string>('');
  const [healthInsurance, setHealthInsurance] = useState<string>('');
  const [otherDocument, setOtherDocument] = useState<string>('');
  const [otherWorkMode, setOtherWorkMode] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      documents: documents.includes('Altro') ? [...documents, otherDocument] : documents,
      workMode: workMode === 'Altro' ? otherWorkMode : workMode,
      healthInsurance,
    });
    onSubmit();
  };

  const handleDocumentChange = (selectedDocument: string) => {
    if (documents.includes(selectedDocument)) {
      setDocuments(documents.filter((doc) => doc !== selectedDocument));
    } else {
      setDocuments([...documents, selectedDocument]);
    }
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
        overflowY: 'auto', // Scroll per l'intero form
        maxHeight: 'calc(100vh - 100px)', // Limitare l'altezza del form per mantenere la dimensione del viewport
      }}
    >
      <Typography variant="h4" color="primary" textAlign="center">
        Normative e Regolamentazioni
      </Typography>
      <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ width: '70%' }}>
        Fornisci alcune informazioni per aiutarti con i documenti e le normative locali.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, width: '100%' }}>
        {/* Left Column */}
        <Box sx={{ flex: 1, maxHeight: '300px', overflowY: 'auto', p: 1 }}> {/* Scroll per la colonna di sinistra */}
          <Typography variant="h6" color="textPrimary" textAlign="center">
            Di quali documenti e visti sei già in possesso?
          </Typography>
          <FormGroup sx={{ mt: 0, width: '100%', color: "white" }}>
            {[
              "Passaporto valido",
              "Visto turistico per l’Italia",
              "Visto per lavoro autonomo",
              "Visto per lavoro subordinato",
              "Visto per nomadi digitali",
              "Permesso di soggiorno per studio",
              "Permesso di soggiorno temporaneo",
              "Altro",
              "Nessuno",
            ].map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={documents.includes(option)}
                    onChange={() => handleDocumentChange(option)}
                    color="primary"
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
          {documents.includes('Altro') && (
            <TextField
              value={otherDocument}
              onChange={(e) => setOtherDocument(e.target.value)}
              label="Specifica il documento"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              required
            />
          )}
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1, maxHeight: '400px', overflowY: 'auto', p: 1 }}> {/* Scroll per la colonna di destra */}
          {/* Modalità di Lavoro */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="work-mode-label">Modalità di Lavoro</InputLabel>
            <Select
              labelId="work-mode-label"
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              label="Modalità di Lavoro"
              required
            >
              <MenuItem value="" disabled>Seleziona la tua modalità di lavoro...</MenuItem>
              <MenuItem value="Dipendente da remoto per un’azienda estera">Dipendente da remoto per un’azienda estera</MenuItem>
              <MenuItem value="Freelancer con clienti internazionali">Freelancer con clienti internazionali</MenuItem>
              <MenuItem value="Proprietario di una mia attività registrata all’estero">Proprietario di una mia attività registrata all’estero</MenuItem>
              <MenuItem value="Freelancer con clienti italiani">Freelancer con clienti italiani</MenuItem>
              <MenuItem value="Startup o progetto imprenditoriale locale">Startup o progetto imprenditoriale locale</MenuItem>
              <MenuItem value="Altro">Altro (specificare)</MenuItem>
            </Select>
          </FormControl>
          {workMode === 'Altro' && (
            <TextField
              value={otherWorkMode}
              onChange={(e) => setOtherWorkMode(e.target.value)}
              label="Specifica la modalità di lavoro"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              required
            />
          )}

          {/* Assicurazione Sanitaria */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 4 }}>
            <InputLabel id="health-insurance-label">Assicurazione Sanitaria</InputLabel>
            <Select
              labelId="health-insurance-label"
              value={healthInsurance}
              onChange={(e) => setHealthInsurance(e.target.value)}
              label="Assicurazione Sanitaria"
              required
            >
              <MenuItem value="" disabled>Seleziona la tua necessità di assicurazione...</MenuItem>
              <MenuItem value="Sì, necessito di una copertura completa per tutta la durata del soggiorno">Sì, necessito di una copertura completa per tutta la durata del soggiorno</MenuItem>
              <MenuItem value="Sì, ma solo per situazioni di emergenza">Sì, ma solo per situazioni di emergenza</MenuItem>
              <MenuItem value="Sì, ho bisogno di una polizza per esigenze lavorative specifiche">Sì, ho bisogno di una polizza per esigenze lavorative specifiche</MenuItem>
              <MenuItem value="No, ho già una copertura internazionale valida">No, ho già una copertura internazionale valida</MenuItem>
              <MenuItem value="No, non ritengo necessario avere un’assicurazione sanitaria">No, non ritengo necessario avere un’assicurazione sanitaria</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 4, width: '200px' }}>
        Submit
      </Button>
    </Box>
  );
};

export default BurocracyForm;
