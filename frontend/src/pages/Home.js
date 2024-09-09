// src/pages/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import './Home.css';
import Logo from '../assets/CollabAuditBlanc.svg';

const Home = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setBurgerOpen(!burgerOpen);
  };

  return (
    <div className={`home-container ${burgerOpen ? 'no-scroll' : ''}`}>
      <nav className="home-nav">
        <div className="nav-content">
          <img src={Logo} alt="CollabAudit Logo" className="home-logo" />
          <ul className="home-menu">
            <li>
              <Link to="/signin">Se Connecter</Link> {/* Corrigé */}
            </li>
            <li>
              <Link to="/signup">Créer un Compte</Link>
            </li>
            <li>
              <Link to="/about">A Propos de Collab'Audit</Link>
            </li>
          </ul>
          <div className="social-icons">
            <a href="https://facebook.com">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com">
              <FaInstagram />
            </a>
            <a href="https://tiktok.com">
              <FaTiktok />
            </a>
            <a href="https://youtube.com">
              <FaYoutube />
            </a>
          </div>
          <div className="burger-menu-icon" onClick={toggleBurgerMenu}>
            {burgerOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </nav>
      {burgerOpen && (
        <div className="burger-menu-overlay" onClick={toggleBurgerMenu}>
          <div className="burger-menu">
            <ul>
              <li>
                <Link to="/signin">Se Connecter</Link> {/* Corrigé */}
              </li>
              <li>
                <Link to="/signup">Créer un Compte</Link>
              </li>
              <li>
                <Link to="/about">A Propos</Link>
              </li>
            </ul>
            <div className="burger-social-icons">
              <a href="https://facebook.com">
                <FaFacebookF />
              </a>
              <a href="https://linkedin.com">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com">
                <FaInstagram />
              </a>
              <a href="https://tiktok.com">
                <FaTiktok />
              </a>
              <a href="https://youtube.com">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="home-hero">
        <div className="overlay"></div>
        <div className="home-logo-center">
          <img src={Logo} alt="CollabAudit Logo" className="logo-center" />
        </div>
        <div className="home-buttons">
          <Link to="/signin" className="btn btn-signin">
            Se Connecter
          </Link>
          <Link to="/signup" className="btn btn-signup">
            Créer un Compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
