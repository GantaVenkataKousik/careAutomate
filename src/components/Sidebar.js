import React from "react";
import "../styles/sidebar.css";
// import { FaGem } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiUserCheck } from "react-icons/bi";
import { TbMessage } from "react-icons/tb";
import { RiAdminLine, RiDashboardLine, RiGroupLine } from "react-icons/ri";
import { MdOutlineEventAvailable } from "react-icons/md";
import { HiOutlineCog } from "react-icons/hi";
import { BsClipboardData } from "react-icons/bs";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li
          className={location.pathname.startsWith("/dashboard") ? "active" : ""}
        >
          <Link to="/dashboard">
            <RiDashboardLine className="sidebar-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li
          className={location.pathname.startsWith("/tenants") ? "active" : ""}
        >
          <Link to="/tenants">
            <RiGroupLine className="sidebar-icon" />
            <span>Tenants</span>
          </Link>
        </li>
        <li className={location.pathname.startsWith("/hcms") ? "active" : ""}>
          <Link to="/hcms">
            <RiAdminLine className="sidebar-icon" />
            <span>Hcms</span>
          </Link>
        </li>
        <li className={location.pathname === "/appointments" ? "active" : ""}>
          <Link to="/appointments">
            <MdOutlineEventAvailable className="sidebar-icon" />
            <span>Appointments</span>
          </Link>
        </li>
        <li className={location.pathname === "/visits" ? "active" : ""}>
          <Link to="/visits">
            <BiUserCheck className="sidebar-icon" />
            <span>Visits</span>
          </Link>
        </li>
        <li className={location.pathname === "/communication" ? "active" : ""}>
          <Link to="/communication">
            <TbMessage className="sidebar-icon" />
            <span>Communication</span>
          </Link>
        </li>
        <li className={location.pathname === "/reports" ? "active" : ""}>
          <Link to="/reports">
            <BsClipboardData className="sidebar-icon" />
            <span>Reports</span>
          </Link>
        </li>
        <li className={location.pathname === "/settings" ? "active" : ""}>
          <Link to="/settings">
            <HiOutlineCog className="sidebar-icon" />
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
