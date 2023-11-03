import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Welcome from './Welcome';
import './App.css';
import Board from './Board';
import Navbar from './Navbar';

const PrivateRoute = ({ children, authed }) => {
  return authed ? children : <Navigate to={"/"} />;
};

function App() {
  const [authed, setAuthed] = useState(false);
  const googleClientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Welcome setAuthed={setAuthed} />} />
          <Route path="/board" element={<PrivateRoute authed={authed}><Board /></PrivateRoute>} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
