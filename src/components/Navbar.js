import React from "react";
import "../styles/navbar.css";
import tenantImage from "../images/tenant.jpg";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>CareAutomate</h2>
      </div>
      <div className=" flex gap-10">
        {/* <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>Search</button>
        </div> */}
        <div className="user-profile">
          <img
            src={tenantImage}
            alt="User"
            className="w-28 h-24 rounded-full object-cover"
          />
          <span className="username">{user?.name}</span>
        </div>
      </div>
    </nav>
  );
};
const styles = {
  searchBar: {
    display: "flex",
    alignItems: "center",
    borderRadius: "25px",
    backgroundColor: "#fff",
    padding: "5px 15px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    width: "350px",
    height: "45px",
    marginRight: "1rem",
    fontFamily: "Poppins",
  },
  searchIcon: {
    color: "#555",
    marginRight: "10px",
    fontSize: "1.5rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "16px",
    color: "#505254",
  },
  searchButton: {
    color: "#505254",
  },
};
export default Navbar;
