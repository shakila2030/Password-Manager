import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Box, Snackbar, Alert, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';

const CreatePassword = () => {
  const [manualPassword, setManualPassword] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const navigate = useNavigate();

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Feedback messages for password requirements
  const requirements = [
    { regex: /[a-z]/, message: 'At least one lowercase letter' },
    { regex: /[A-Z]/, message: 'At least one uppercase letter' },
    { regex: /\d/, message: 'At least one number' },
    { regex: /[@$!%*?&]/, message: 'At least one symbol (@$!%*?&)' },
    { regex: /.{8,}/, message: 'At least 8 characters long' }
  ];

  // Function to validate password
  const validatePassword = (password) => {
    const isValid = passwordRegex.test(password);
    setValidPassword(isValid);
    return isValid;
  };

  const handleManualPasswordChange = (e) => {
    const newPassword = e.target.value;
    setManualPassword(newPassword);
    setError('');
    validatePassword(newPassword);
  };

  const handleGeneratePassword = () => {
    const generated = generateRandomPassword();
    setGeneratedPassword(generated);
    setError('');
  };

  const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
    let password = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    setShowSnackbar(true);
  };

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Password
      </Typography>

      {/* Create your own password option */}
      <Typography variant="h6" gutterBottom>
        Create Your Own Password
      </Typography>
      <TextField
        label="Enter Password"
        variant="outlined"
        fullWidth
        value={manualPassword}
        onChange={handleManualPasswordChange}
        size="small"
        error={!validPassword && manualPassword !== ''}
        helperText={
          !validPassword && manualPassword !== ''
            ? 'Password does not meet the required criteria.'
            : ''
        }
      />
      {manualPassword && !validPassword && (
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Password must meet the following criteria:
          </Typography>
          {requirements.map((req, index) => (
            <Typography key={index} variant="body2" color={req.regex.test(manualPassword) ? 'green' : 'red'}>
              - {req.message}
            </Typography>
          ))}
        </Box>
      )}

      {validPassword && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ContentCopyIcon />}
            onClick={() => handleCopyPassword(manualPassword)}
          >
            Copy Password
          </Button>
        </Box>
      )}

      {/* Generated Password Display */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Generated Password
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGeneratePassword}
          sx={{ mr: 2, mb: 2 }}
        >
          Generate
        </Button>

        {generatedPassword && (
          <>
            <TextField
              label="Generated Password"
              variant="outlined"
              fullWidth
              value={generatedPassword}
              InputProps={{
                readOnly: true,
              }}
              size="small"
            />
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ContentCopyIcon />}
                onClick={() => handleCopyPassword(generatedPassword)}
              >
                Copy Password
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success">Password copied to clipboard!</Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatePassword;
