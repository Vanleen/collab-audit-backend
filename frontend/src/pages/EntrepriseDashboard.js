import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import CollabAuditLogo from '../assets/LogoCollabAudit.svg';
import './Dashboard.css';
import axios from 'axios';

const EntrepriseDashboard = () => {
  const [files, setFiles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  // Récupérer les informations de l'utilisateur connecté
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleFileOpen = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={CollabAuditLogo} alt="CollabAudit Logo" className="navbar-logo" />
        </div>
        <div className="navbar-right">
          <div
            className="user-info"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="username">{user?.username || "Nom de l'utilisateur"}</span>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          </div>
          {menuOpen && (
            <div className="user-menu">
              <ul>
                <li>Gérer le compte</li>
                <li>Se déconnecter</li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Page Layout */}
      <div className="page-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li>Tableau de bord</li>
            <li>Documents</li>
            <li>Paramètres</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content-area">
          {/* Drag and Drop Zone */}
          <div className="file-upload-section">
            <div
              className="file-upload"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <FontAwesomeIcon icon={faCloudArrowDown} className="upload-icon" />
              <h2>
                Déposez vos fichiers ici, ou{' '}
                <span className="upload-link">cliquez ici</span> pour sélectionner
              </h2>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* Files Table */}
          <div className="file-list-section">
            <h3>Fichiers téléchargés</h3>
            <table className="file-table">
              <thead>
                <tr>
                  <th>Nom du document</th>
                  <th>État</th>
                  <th>Type</th>
                  <th>Dépôt par</th>
                  <th>Date de dépôt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.name}</td>
                    <td>En cours de traitement</td>
                    <td>{file.type.split('/')[1]}</td>
                    <td>{user?.username || "Nom de l'utilisateur"}</td>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>
                      <button className="action-btn" onClick={() => handleFileOpen(file)}>
                        Ouvrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseDashboard;
