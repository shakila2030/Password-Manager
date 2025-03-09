import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Box, Card, CardContent, CardActions, Grid } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([
    { id: 1, site: 'Facebook', password: 'old_password_123' },
    { id: 2, site: 'Google', password: 'old_password_456' },
    { id: 3, site: 'Twitter', password: 'old_password_789' }
  ]);

  // Use an object to track new passwords for each site
  const [newPasswords, setNewPasswords] = useState({});

  const navigate = useNavigate();

  // Handle password change
  const handlePasswordChange = (id) => {
    const updatedPasswords = passwords.map(password => 
      password.id === id ? { ...password, password: newPasswords[id] || password.password } : password
    );
    setPasswords(updatedPasswords);
    // Reset the new password input after change
    setNewPasswords(prev => ({ ...prev, [id]: '' }));
  };

  const handleLogout = () => {
    // Logic to log out (clear auth token, etc.)
    navigate('/login'); // Redirect to login
  };

  const handleNewPasswordChange = (id, newPassword) => {
    setNewPasswords(prev => ({ ...prev, [id]: newPassword }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Password Manager
      </Typography>
      {/* <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button> */}

      <Grid container spacing={3} mt={2}>
        {passwords.map((password) => (
          <Grid item xs={12} sm={6} md={4} key={password.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{password.site}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Password: {password.password}
                </Typography>
              </CardContent>
              <CardActions>
                <TextField
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  value={newPasswords[password.id] || ''}
                  onChange={(e) => handleNewPasswordChange(password.id, e.target.value)}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePasswordChange(password.id)}
                >
                  Change Password
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PasswordManager;
