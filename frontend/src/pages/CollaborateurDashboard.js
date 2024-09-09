import React, { useState } from 'react';
import './Dashboard.css';

const CommissaireDashboard = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img src="/path/to/logo.svg" alt="Logo" className="sidebar-logo" />
        <ul className="sidebar-menu">
          <li>Tableau de Bord</li>
          <li>Mandats</li>
          <li>Paramètres</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="file-upload">
          <h2>Déposer des fichiers</h2>
          <input type="file" multiple onChange={handleFileUpload} />
        </div>

        <div className="file-list">
          <h3>Fichiers téléchargés</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommissaireDashboard;
