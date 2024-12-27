import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import tenantImage from "../images/tenant.jpg";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionClick = (option) => {
    setDropdownVisible(false);
    switch (option) {
      case "Settings":
        navigate("/settings");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Help":
        navigate("/help");
        break;
      case "Logout":
        logout();
        navigate("/login");
        break;
      default:
        console.log(option);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const dropdown = document.querySelector(".dropdown");
      const userProfile = document.querySelector(".user-profile");

      if (
        dropdownVisible &&
        !dropdown?.contains(event.target) &&
        !userProfile?.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownVisible]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>CareAutomate</h2>
      </div>
      <div className="navbar-right">
        <div className="user-profile" onClick={toggleDropdown}>
          <img
            src={tenantImage}
            alt="User"
            className="w-28 h-24 rounded-full object-cover cursor-pointer"
          />
          <span className="username cursor-pointer">{currentUser?.name}</span>
        </div>
        {dropdownVisible && (
          <div className="dropdown">
            <div onClick={() => handleOptionClick("Profile")}>
              <CgProfile
                className="profile-icon"
                // style={{
                //   marginRight: "10px",
                //   color: "#6f84f8",
                //   fontSize: "20px",
                // }}
              />
              Profile
            </div>
            <div onClick={() => handleOptionClick("Settings")}>
              <IoSettingsOutline
                className="profile-icon"
                // style={{
                //   marginRight: "10px",
                //   color: "#6f84f8",
                //   fontSize: "20px",
                // }}
              />
              Settings
            </div>
            <div onClick={() => handleOptionClick("Help")}>
              <FiHelpCircle
                className="profile-icon"
                // style={{
                //   marginRight: "10px",
                //   color: "#6f84f8",
                //   fontSize: "20px",
                // }}
              />
              Help
            </div>
            <div onClick={() => handleOptionClick("Logout")}>
              <IoLogOutOutline
                className="profile-icon"
                // style={{
                //   marginRight: "10px",
                //   color: "#6f84f8",
                //   fontSize: "20px",
                // }}
              />
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
