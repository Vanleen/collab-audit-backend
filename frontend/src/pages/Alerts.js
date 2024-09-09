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
              <li>Documents</li>
            </NavLink>

            <NavLink to={`/dashboard/entreprise/alerts/${id}`}>
              <li style={{ backgroundColor: "orange" }}>Alert</li>
            </NavLink>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content-area">
          {entreprises.map((entreprise) => {
            if (entreprise.id === parseInt(id)) {
              return <li key={entreprise.id}>{entreprise.alert}</li>;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default EntrepriseDashboard;
