import React from "react";
import "../styles/sidebar.css";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaEnvelope,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
// import { FaGem } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li
          className={location.pathname.startsWith("/dashboard") ? "active" : ""}
        >
          <Link to="/dashboard">
            <FaTachometerAlt className="sidebar-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li
          className={location.pathname.startsWith("/tenants") ? "active" : ""}
        >
          <Link to="/tenants">
            <FaUsers className="sidebar-icon" />
            <span>Tenants</span>
          </Link>
        </li>
        <li className={location.pathname.startsWith("/hcms") ? "active" : ""}>
          <Link to="/hcms">
            <FaUsers className="sidebar-icon" />
            <span>Hcms</span>
          </Link>
        </li>
        <li className={location.pathname === "/appointments" ? "active" : ""}>
          <Link to="/appointments">
            <FaCalendarAlt className="sidebar-icon" />
            <span>Appointments</span>
          </Link>
        </li>
        <li className={location.pathname === "/visits" ? "active" : ""}>
          <Link to="/visits">
            <FaCalendarAlt className="sidebar-icon" />
            <span>Visits</span>
          </Link>
        </li>
        <li className={location.pathname === "/communication" ? "active" : ""}>
          <Link to="/communication">
            <FaEnvelope className="sidebar-icon" />
            <span>Communication</span>
          </Link>
        </li>
        <li className={location.pathname === "/reports" ? "active" : ""}>
          <Link to="/reports">
            <FaChartBar className="sidebar-icon" />
            <span>Reports</span>
          </Link>
        </li>
        <li className={location.pathname === "/settings" ? "active" : ""}>
          <Link to="/settings">
            <FaCog className="sidebar-icon" />
            <span>Settings</span>
          </Link>
        </li>
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">
            <CgProfile className="sidebar-icon" />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
