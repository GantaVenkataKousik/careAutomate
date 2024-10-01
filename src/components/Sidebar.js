// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/sidebar.css';
// import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaEnvelope, FaChartBar, FaCog } from 'react-icons/fa';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul className="sidebar-menu">
//         <li>
//           <Link to="/dashboard">
//             <FaTachometerAlt className="sidebar-icon" />
//             <span>Dashboard</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/tenants">
//             <FaUsers className="sidebar-icon" />
//             <span>Tenants</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/appointments">
//             <FaCalendarAlt className="sidebar-icon" />
//             <span>Appointments</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/calendar">
//             <FaCalendarAlt className="sidebar-icon" />
//             <span>Calendar</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/messages">
//             <FaEnvelope className="sidebar-icon" />
//             <span>Messages</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/reports">
//             <FaChartBar className="sidebar-icon" />
//             <span>Reports</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/settings">
//             <FaCog className="sidebar-icon" />
//             <span>Settings</span>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaEnvelope, FaChartBar, FaCog } from 'react-icons/fa';
import { FaGem } from 'react-icons/fa'; // Use FaGem or another suitable icon


const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt className="sidebar-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/tenants">
            <FaUsers className="sidebar-icon" />
            <span>Tenants</span>
          </Link>
        </li>
        <li>
          <Link to="/appointments">
            <FaCalendarAlt className="sidebar-icon" />
            <span>Appointments</span>
          </Link>
        </li>
        <li>
          <Link to="/calendar">
            <FaCalendarAlt className="sidebar-icon" />
            <span>Calendar</span>
          </Link>
        </li>
        <li>
          <Link to="/messages">
            <FaEnvelope className="sidebar-icon" />
            <span>Messages</span>
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <FaChartBar className="sidebar-icon" />
            <span>Reports</span>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="sidebar-icon" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
      <div className="upgrade-box">
        <div className="upgrade-text">
        <FaGem className="diamond-icon" />
          <p>Upgrade to Premium </p>
          <p className="p1">Your free trial <br></br>ends soon...</p>
          <Link to="/plans" className="view-plans-btn">View Plans</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;








