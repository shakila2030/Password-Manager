import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Box, Card, CardContent, CardActions, Grid, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]); // Empty array for dynamic platforms
  const [newPlatform, setNewPlatform] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswords, setNewPasswords] = useState({}); // Track new passwords for each platform
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);  // Store the userId in state
  
      // Fetch existing platforms for the user
      const fetchPlatforms = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/platforms/${storedUserId}`);
          if (response.status === 200) {
            setPasswords(response.data.platforms); // Set fetched platforms in state
          }
        } catch (error) {
          console.error('Error fetching platforms:', error);
        }
      };
  
      fetchPlatforms();
    } else {
      // Redirect to login if no userId is found
      navigate('/login');
    }
  }, [navigate]);
  

  // Handle adding new platforms
  const handleAddNewPassword = async () => {
    if (newPlatform && newPassword && userId) {
      const newPasswordEntry = {
        userId: userId,  // Include the userId from state
        platformName: newPlatform,
        platformPassword: newPassword,
      };

      try {
        // Send POST request to backend API
        const response = await axios.post('http://localhost:5000/api/platforms', newPasswordEntry);
        
        if (response.status === 201) {
          // On success, update the state and show the success message
          setPasswords([...passwords, { ...newPasswordEntry, id: Date.now() }]);
          setNewPlatform('');
          setNewPassword('');
          setShowSnackbar(true); // Show success message
        }
      } catch (error) {
        console.error('Error adding platform:', error);
        alert('Failed to add platform. Please try again.');
      }
    } else {
      alert('Please provide both platform and password.');
    }
  };

  // Handle password change
const handlePasswordChange = async (id) => {
    const passwordToUpdate = passwords.find(password => password.id === id);
    const updatedPassword = newPasswords[id] || passwordToUpdate.platformPassword;
  
    if (updatedPassword !== passwordToUpdate.platformPassword) {
      try {
        // Send PUT request to backend to update the password
        const response = await axios.put('http://localhost:5000/api/platforms/change-password', {
          userId: userId,
          platformName: passwordToUpdate.platformName,
          newPlatformPassword: updatedPassword
        });
  
        if (response.status === 200) {
          // Update the frontend state with the new password
          const updatedPasswordsList = passwords.map(password =>
            password.id === id ? { ...password, platformPassword: updatedPassword } : password
          );
          setPasswords(updatedPasswordsList);
          setNewPasswords(prev => ({ ...prev, [id]: '' })); // Clear the input field after change
        }
      } catch (error) {
        console.error('Error changing password:', error);
        alert('Failed to update password. Please try again.');
      }
    }
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
                <Typography variant="h6">{password.platformName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Password: {password.platformPassword}
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
