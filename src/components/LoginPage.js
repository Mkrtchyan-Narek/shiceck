import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage({ onLogin, classCode, setClassCode, setAdminMode }) {
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  useEffect(() => {
    if(document.cookie == "") {
      document.cookie = "classCode=noClass; path=/; max-age=3600";
      return;
    }
    const cookieValue = `; ${document.cookie}`;
    const parts = cookieValue.split(`; classCode=`);
    let code;
    const combined = parts.pop().split(';').shift();
    const [classCodePart] = combined.split('&');
    code = classCodePart.split('=')[1] || classCodePart;
    
    

    if (code != "noClass") {
      setAdminMode(code == "shiadmin");
      setClassCode(code.toLocaleLowerCase());
      onLogin();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password == "" || classCode == "") {
      setSnackbar({ open: true, message: 'Լրացրեք դաշտերը', severity: 'error' });
    }
    setAdminMode(false);
    try {
      await signInWithEmailAndPassword(auth, `${classCode.toLowerCase()}@gmail.com`, password);
      setClassCode(classCode.toLowerCase());
      document.cookie = `classCode=${classCode.toLowerCase()}; path=/; max-age=3600`;
      
      if(classCode.toLowerCase() == "shiadmin") {
        
        setAdminMode(true);
      }
      onLogin();
    } catch (err) {
     switch (err.code) {
      case "auth/user-not-found":
        setSnackbar({ open: true, message: 'Սխալ համար', severity: 'error' });
        break;
      case "auth/invalid-login-credentials":
        setSnackbar({ open: true, message: 'Սխալ գաղտնաբառ', severity: 'error' });
        break;
      default:
        console.log("Login error:", err.message);
    }
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h5" mb={2}>Մուտք</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Երթուղու համար"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Գաղտնաբառ"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#26b8b8',
              '&:hover': { backgroundColor: '#1ea0a0' },
            }}
          >
            Մուտք
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}