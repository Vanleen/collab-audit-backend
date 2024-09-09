// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CommissaireDashboard from './pages/CommissaireDashboard';
import CollaborateurDashboard from './pages/CollaborateurDashboard';
import EntrepriseDashboard from './pages/EntrepriseDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Dashboards spécifiques */}
        <Route path="/dashboard/commissaire" element={<CommissaireDashboard />} />
        <Route path="/dashboard/collaborateur" element={<CollaborateurDashboard />} />
        <Route path="/dashboard/entreprise" element={<EntrepriseDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
