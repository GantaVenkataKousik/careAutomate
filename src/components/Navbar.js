import React from 'react';
import '../styles/navbar.css';
import tenantImage from '../images/tenant.jpg';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'))



  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>CareAutomate</h2>
      </div>
      <div className="navbar-right">

        <div className="user-profile">
          <img src={tenantImage} alt="User" />
          <span className="username">{user?.name}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


