import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown, faUser } from "@fortawesome/free-solid-svg-icons";
import CollabAuditLogo from "../assets/LogoCollabAudit.svg";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Navbar = () => {
  const [user, setUser] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={CollabAuditLogo}
            alt="CollabAudit Logo"
            className="navbar-logo"
          />
        </div>
        <div className="navbar-right">
          <div className="user-info">
            <DropdownButton
              id="dropdown-basic-button"
              title="Dropdown button"
              className="btn-nav"
            >
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            {/* <FontAwesomeIcon icon={faUser} className="user-icon" /> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
