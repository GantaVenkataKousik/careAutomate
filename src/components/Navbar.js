import React from 'react';
import '../styles/navbar.css';
import tenantImage from '../images/tenant.jpg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>CareAutomate</h2>
      </div>
      <div className="navbar-right">
        <div className="search-bar-navbar">
          <input type="text" placeholder="Search..." />
        </div>
        {/* <div className="notification-icon">🔔</div> */}
        <div className="notification-icon">
  <span className="notification-badge">3</span> 
</div>

        <div className="user-profile">
          <img src={tenantImage} alt="User" />
          <span className="username">Mr.John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


