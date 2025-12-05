import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  
  document.body.style.backgroundColor ='white';
  document.body.style.color = "black";
  return (
    <>
      <AppBar position="static" sx={{backgroundColor: '#26b8b8', '&:hover': { backgroundColor: '#1ea0a0' }}} elevation={4}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            ShiCheck
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {(loggedIn
          ? <Dashboard onLogout={() => setLoggedIn(false)} classCode={classCode} setClassCode={setClassCode} adminMode={adminMode} />
          : <LoginPage onLogin={() => setLoggedIn(true)} classCode={classCode} setClassCode={setClassCode} setAdminMode={setAdminMode} />
        )}
      </Container>
    </>
  );
}
