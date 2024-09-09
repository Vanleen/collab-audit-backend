import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/LogoCollabAudit.svg';
import './Auth.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      const { token, user } = response.data;

      // Stocker le token JWT dans localStorage
      localStorage.setItem('token', token);

      // Redirection en fonction du rôle
      if (user.role === 'commissaire') {
        navigate('/dashboard/commissaire');
      } else if (user.role === 'collaborateur') {
        navigate('/dashboard/collaborateur');
      } else if (user.role === 'entreprise') {
        navigate('/dashboard/entreprise');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      alert('Erreur lors de la connexion.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Link to="/">
          <img src={Logo} alt="CollabAudit Logo" className="auth-logo" />
        </Link>
        <h2>Connexion</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            Se connecter
          </button>
        </form>
        <div className="auth-text">
          <span>Pas encore de compte ? </span>
          <Link to="/signup">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
