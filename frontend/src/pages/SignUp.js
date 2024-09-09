import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Utilisation de useNavigate pour redirection après la création du compte
import Logo from '../assets/LogoCollabAudit.svg';
import './Auth.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('entreprise');  // Rôle par défaut: entreprise
  const [sirenOrSiret, setSirenOrSiret] = useState('');

  const navigate = useNavigate();  // Hook de redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
        role,
        sirenOrSiret: role === 'entreprise' ? sirenOrSiret : null,
      });

      console.log('Compte créé :', response.data);
      alert('Compte créé avec succès!');
      navigate('/signin');  // Redirection vers la page de connexion après la création du compte
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
      alert('Erreur lors de la création du compte.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Link to="/">
          <img src={Logo} alt="CollabAudit Logo" className="auth-logo" />
        </Link>
        <h2>Créer un compte</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="commissaire">Commissaire aux Comptes</option>
            <option value="collaborateur">Collaborateur</option>
            <option value="entreprise">Entreprise</option>
          </select>
          {role === 'entreprise' && (
            <input
              type="text"
              placeholder="SIREN ou SIRET"
              value={sirenOrSiret}
              onChange={(e) => setSirenOrSiret(e.target.value)}
              required
            />
          )}
          <button type="submit" className="auth-button">
            Créer un compte
          </button>
        </form>
        <div className="auth-text">
          <span>Déjà un compte ? </span>
          <Link to="/signin">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
