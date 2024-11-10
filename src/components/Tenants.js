import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaFilter, FaSort, FaCalendarAlt, FaBars, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import '../styles/tenants1.css';
import '../styles/filter.css';
import '../styles/sort.css';
import tenantImage from '../images/tenant.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tenants = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);

  const handleAddTenantClick = () => {
    navigate('/tenants/createTenant');
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
    if (!isFilterVisible) {
      setIsSortVisible(false);
    }
  };

  const toggleSort = () => {
    setIsSortVisible(!isSortVisible);
    setIsFilterVisible(true);
  };

  useEffect(() => {
    const fetchTenants = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const response = await axios.post(
          'https://careautomate-backend.vercel.app/fetchAll/fetchAllHCMsTenants',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const tenantsData = response.data?.data?.tenants || []; // Extract tenants data
        setTenants(tenantsData);
        console.log('Fetched tenants:', tenantsData);
      } catch (error) {
        console.error('Error fetching tenants:', error.response?.data || error.message);
      }
    };

    fetchTenants();
  }, []);

  const handleFilterChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className=''>
      <h1>Tenants</h1>

      <div className="tenants-header">
        <div className="search-add-container">
          <div className="search-bar1">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search....." />
          </div>

          <button className="add-tenant-btn" onClick={handleAddTenantClick}>
            <FaPlus className="plus-icon" /> Add New Tenant
          </button>
        </div>
      </div>

      {/* <div className="filters">
        <button className="filter-btn" onClick={toggleFilter}>
          <FaFilter className="filter-icon" /> Filter
        </button>
        <button className={`sort-btn ${isFilterVisible ? 'active' : ''}`} onClick={toggleSort}>
          <FaSort className="sort-icon" /> Sort By
        </button>
      </div> */}
      <br />

      {/* Filter Box */}
      {/* <div className={`filter-container ${isFilterVisible ? 'show' : ''}`}>
        <div className="search-bar-filter">
          <FaSearch className="search-icon1" />
          <input type="text" placeholder="Search by PM/Name" onChange={handleFilterChange} />
        </div>
        {/* Filter options */}
      {/* </div> */} 

      {/* Sort Box */}
      {/* <div className={`sort-container ${isSortVisible ? 'show' : ''}`}>
        <div className="search-bar-sort">
          <FaSearch className="search-icon1" />
          <input type="text" placeholder="Search by PM/Name" />
        </div>
        {/* Sort options */}
      {/* </div> */} 

      {/* Tenant Profiles Grid */}
      <div className={`tenant-grid ${isFilterVisible && isSortVisible ? 'shift-right-both' : isFilterVisible ? 'shift-right-filter' : ''}`}>
        {tenants.length > 0 ? (
          tenants.map((tenant, index) => (
            <div key={tenant._id || index} className="tenant-box">
              <div className="tenant-info">
                <h3>{tenant?.name}</h3>
                <p>{tenant?.phoneNo}</p>
                <p>{tenant.email}</p>
                <div className="tenant-icons">
                  <FaCalendarAlt className="tenant-icon" />
                  <FaBars className="tenant-icon" />
                  <FaEnvelope className="tenant-icon" />
                  <FaFileAlt className="tenant-icon" />
                </div>
              </div>
              <div className="tenant-image">
                <img src={tenantImage} alt="Tenant" />
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p> // Show message if no tenants data
        )}
      </div>

      {isPopupVisible && (
        <div className="popup">
          <h2>Add New Tenant</h2>
          <button className="close-btn" onClick={() => setIsPopupVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Tenants;
