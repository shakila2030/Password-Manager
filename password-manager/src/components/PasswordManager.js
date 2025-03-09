import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Box, Card, CardContent, CardActions, Grid, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]); // Empty array for dynamic platforms
  const [newPlatform, setNewPlatform] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswords, setNewPasswords] = useState({}); // Track new passwords for each platform
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  // Handle adding new password
  const handleAddNewPassword = () => {
    if (newPlatform && newPassword) {
      const newPasswordEntry = {
        id: Date.now(), // Unique id based on timestamp
        site: newPlatform,
        password: newPassword,
      };
      setPasswords([...passwords, newPasswordEntry]); // Add the new password to the list
      setNewPlatform('');
      setNewPassword('');
      setShowSnackbar(true); // Show success message
    } else {
      alert("Please provide both platform and password.");
    }
  };

  // Handle password change
  const handlePasswordChange = (id) => {
    const updatedPasswords = passwords.map(password =>
      password.id === id ? { ...password, password: newPasswords[id] || password.password } : password
    );
    setPasswords(updatedPasswords);
    // Reset the new password input after change
    setNewPasswords(prev => ({ ...prev, [id]: '' }));
  };

  const handleNewPasswordChange = (id, newPassword) => {
    setNewPasswords(prev => ({ ...prev, [id]: newPassword }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Password Manager
      </Typography>

      {/* Form to add new platform */}
      <Box mb={3}>
        <TextField
          label="Platform Name"
          variant="outlined"
          fullWidth
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
        //   type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNewPassword}
          sx={{ mt: 2 }}
        >
          Add New Platform
        </Button>
      </Box>

      {/* Displaying added platforms */}
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

      {/* Snackbar for success message */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success">New platform added successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default PasswordManager;
