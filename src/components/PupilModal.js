import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Typography,
} from '@mui/material';

export default function ModalDialog({ data, open, onClose, sign }) {
  const [name, setName] = useState("");
  let currentPupils = [...data.pupils];

  useEffect(() => {
    setName("");
  }, [open]);

  const handleSubmit = async () => {
    const i = currentPupils.findIndex(pupil => pupil.name == name);
    
    if (sign === "-") {
      if (i == -1) {
        setName("Չկա նման աշակերտ");
        return;
      }
      currentPupils.splice(i, 1);
    } else {
      if (i != -1) {
        setName("Արդեն կա");
        return;
      }
      currentPupils.push({ name, present: false });
    }

    data.setNewPupils(currentPupils);    
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontSize={18}>
          {(sign === "-")
            ? ("Աշակերտի Հեռացում")
            : ("Աշակերտի Ավելացում")}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Անուն"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#26b8b8', '&:hover': { backgroundColor: '#1ea0a0' } }}>
          Պահպանել
        </Button>
        <Button onClick={onClose} sx={{ backgroundColor: '#ffffff' }}>
          Փակել
        </Button>
      </DialogActions>
    </Dialog>
  );
}