import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PasswordManager from './components/PasswordManager';
import Navbar from './components/Navbar';
import CreatePassword from './components/CreatePassword';


function App() {
  return (
    <Router>
       <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password-manager" element={<PasswordManager />} />
      <Route path="/create-password" element={<CreatePassword />} />
      {/* Other routes */}
    </Routes>
  </Router>
  );
}

export default App;
