import React, { useState } from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import entreprises from "../components/EntrepriseArray";
import { NavLink } from "react-router-dom";
import "./EntreprisesCard.css";
import { CircleAlert } from "lucide-react";
import Logo from "../assets/LogoCollabAudit.svg";
import Button from "react-bootstrap/Button";
import { CircleChevronRight } from "lucide-react";

const CommissaireDashboard = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div class="dashboard-containt">
        <div class="side-bar">
          <div class="top-side">
            <img src={Logo} alt="CollabAudit Logo" className="home-logo" />
            <p>_____________________</p>
            <p>
              Choix de la société <CircleChevronRight />
            </p>
          </div>
          <div class="bot-side">
            <Button className="btnn" variant="success">
              Nous contacter
            </Button>
          </div>
        </div>
        <div class="entreprise-list">
          {entreprises.map((entreprise) => {
            return (
              <NavLink to={`/dashboard/entreprise/${entreprise.id}`}>
                <div class="entreprise-card">
                  <div class="top-card">
                    <div class="logo-container">
                      <img
                        className="logo-entreprise"
                        src={entreprise.img}
                        alt={entreprise.nom}
                      />
                    </div>

                    <div class="right-header">
                      <h2 className="name-entreprise">{entreprise.nom}</h2>
                      <p className="desc-entreprise">
                        {entreprise.secteur} / {entreprise.nombreEmployes}{" "}
                        employés
                      </p>
                    </div>
                  </div>
                  <div class="bot-card">
                    <div class="alert-container">
                      <CircleAlert />
                      <p className="alert">{entreprise.alert.length} alerts</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommissaireDashboard;
