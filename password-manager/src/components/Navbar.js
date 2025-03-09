import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Password Manager
        </Typography>
        <Button color="inherit" component={Link} to="/password-manager">
          Password Manager
        </Button>
        <Button color="inherit" component={Link} to="/create-password">
          Create Password
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
