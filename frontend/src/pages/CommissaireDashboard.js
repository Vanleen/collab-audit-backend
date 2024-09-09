import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import CollabAuditLogo from '../assets/LogoCollabAudit.svg';
import './Dashboard.css';

const CommissaireDashboard = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={CollabAuditLogo} alt="CollabAudit Logo" className="navbar-logo" />
        </div>
        <div className="navbar-right">
          <div className="user-info">
            <span>Nom de l'utilisateur</span>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li>Tableau de bord</li>
          <li>Mandats</li>
          <li>Paramètres</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Drag and Drop Zone */}
        <div className="file-upload">
          <FontAwesomeIcon icon={faCloudArrowDown} className="upload-icon" />
          <h2>Déposez vos fichiers ici, ou <span className="upload-link">cliquez ici</span> pour sélectionner</h2>
          <input type="file" multiple onChange={handleFileUpload} />
        </div>

        {/* Files Table */}
        <div className="file-list">
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
                  <td>{file.type}</td>
                  <td>Nom de l'utilisateur</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td><button className="action-btn">Ouvrir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommissaireDashboard;
