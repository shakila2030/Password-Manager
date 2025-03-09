import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Updated import

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', { // Ensure correct backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token in localStorage for further requests
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        console.log('Login successful');
        navigate('/password-manager');  // Redirect to the dashboard
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/'); // Redirect to the signup page
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Button
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignUpRedirect}
        >
          Don't have an account?
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
