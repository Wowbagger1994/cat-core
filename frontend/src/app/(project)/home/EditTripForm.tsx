import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

interface EditTripFormProps {
  onSubmit: () => void;
}

const EditTripForm: React.FC<EditTripFormProps> = ({ onSubmit }) => {
  // Recupera i dati dalla localStorage al caricamento del componente
  const initialData = JSON.parse(localStorage.getItem('tripData') || '{}');

  // Stati per le domande del form, inizializzati con i dati recuperati
  const [transportation, setTransportation] = useState<string>(initialData.transportation || '');
  const [otherTransportation, setOtherTransportation] = useState<string>(initialData.otherTransportation || '');
  const [duration, setDuration] = useState<string>(initialData.duration || '');
  const [purpose, setPurpose] = useState<string>(initialData.purpose || '');
  const [otherPurpose, setOtherPurpose] = useState<string>(initialData.otherPurpose || '');

  // Funzione per gestire l'invio del form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Salva i dati modificati nella localStorage
    const updatedTripData = {
      transportation: transportation === 'Altro' ? otherTransportation : transportation,
      duration,
      purpose: purpose === 'Altro' ? otherPurpose : purpose,
    };
    localStorage.setItem('tripData', JSON.stringify(updatedTripData));

    alert('Trip updated successfully!');

    // Chiamare la funzione onSubmit per notificare il genitore
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', alignItems: 'center' }}>
      <Typography variant="h4" color="primary" textAlign="center">
        Edit Trip
      </Typography>

      {/* Mezzo di Trasporto */}
      <FormControl fullWidth variant="outlined" sx={{ width: '70%' }}>
        <InputLabel id="transportation-label">Mezzo di Trasporto</InputLabel>
        <Select
          labelId="transportation-label"
          value={transportation}
          onChange={(e) => setTransportation(e.target.value)}
          label="Mezzo di Trasporto"
          required
        >
          <MenuItem value="" disabled>Seleziona il mezzo di trasporto...</MenuItem>
          <MenuItem value="Aereo">Aereo</MenuItem>
          <MenuItem value="Treno">Treno</MenuItem>
          <MenuItem value="Auto">Auto</MenuItem>
          <MenuItem value="Autobus">Autobus</MenuItem>
          <MenuItem value="Nave/Traghetto">Nave/Traghetto</MenuItem>
          <MenuItem value="Altro">Altro (specificare)</MenuItem>
        </Select>
        {transportation === 'Altro' && (
          <TextField
            value={otherTransportation}
            onChange={(e) => setOtherTransportation(e.target.value)}
            label="Specifica il mezzo di trasporto"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
      </FormControl>

      {/* Durata del Soggiorno */}
      <FormControl fullWidth variant="outlined" sx={{ width: '70%' }}>
        <InputLabel id="duration-label">Durata del Soggiorno</InputLabel>
        <Select
          labelId="duration-label"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          label="Durata del Soggiorno"
          required
        >
          <MenuItem value="" disabled>Seleziona la durata del soggiorno...</MenuItem>
          <MenuItem value="Meno di 1 mese">Meno di 1 mese</MenuItem>
          <MenuItem value="Da 1 a 3 mesi">Da 1 a 3 mesi</MenuItem>
          <MenuItem value="Da 3 a 6 mesi">Da 3 a 6 mesi</MenuItem>
          <MenuItem value="Più di 6 mesi ma meno di 1 anno">Più di 6 mesi ma meno di 1 anno</MenuItem>
          <MenuItem value="Più di 1 anno">Più di 1 anno</MenuItem>
        </Select>
      </FormControl>

      {/* Motivo del Viaggio */}
      <FormControl fullWidth variant="outlined" sx={{ width: '70%' }}>
        <InputLabel id="purpose-label">Motivo del Viaggio</InputLabel>
        <Select
          labelId="purpose-label"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          label="Motivo del Viaggio"
          required
        >
          <MenuItem value="" disabled>Seleziona il motivo del viaggio...</MenuItem>
          <MenuItem value="Lavoro da remoto">Lavoro da remoto</MenuItem>
          <MenuItem value="Studio">Studio</MenuItem>
          <MenuItem value="Turismo">Turismo</MenuItem>
          <MenuItem value="Networking professionale">Networking professionale</MenuItem>
          <MenuItem value="Famiglia o motivi personali">Famiglia o motivi personali</MenuItem>
          <MenuItem value="Altro">Altro (specificare)</MenuItem>
        </Select>
        {purpose === 'Altro' && (
          <TextField
            value={otherPurpose}
            onChange={(e) => setOtherPurpose(e.target.value)}
            label="Specifica il motivo del viaggio"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" sx={{ width: '200px' }}>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditTripForm;
