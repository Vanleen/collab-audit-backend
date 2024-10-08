import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import entreprises from "../components/EntrepriseArray";
import { NavLink, useParams } from "react-router-dom";

const EntrepriseDashboard = () => {
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  // Récupérer les informations de l'utilisateur connecté
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        );
      }
    };

    fetchUserData();
    console.log("ID de l'entreprise:", id);
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
    window.open(fileURL, "_blank");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar />
      {entreprises.map((entreprise) => {
        if (entreprise.id == id) {
          return <div className="entreprise-name"> {entreprise.nom} </div>;
        }
      })}
      {/* Page Layout */}
      <div className="page-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li>Tableau de bord</li>

            <NavLink to={`/dashboard/entreprise/${id}`}>
              <li style={{ backgroundColor: "orange" }}>Documents</li>
            </NavLink>

            <NavLink to={`/dashboard/entreprise/alerts/${id}`}>
              <li>Alert</li>
            </NavLink>
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
              <FontAwesomeIcon
                icon={faCloudArrowDown}
                className="upload-icon"
              />
              <h2>
                Déposez vos fichiers ici, ou{" "}
                <span className="upload-link">cliquez ici</span> pour
                sélectionner
              </h2>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
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
                    <td>{file.type.split("/")[1]}</td>
                    <td>{user?.username || "Nom de l'utilisateur"}</td>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleFileOpen(file)}
                      >
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
