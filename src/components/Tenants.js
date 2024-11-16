import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import tenantImage from '../images/tenant.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tenants = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);

  const handleAddTenantClick = () => {
    navigate('/tenants/createTenant');
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

        const tenantsData = response.data?.data?.tenants || [];
        setTenants(tenantsData);
      } catch (error) {
        console.error('Error fetching tenants:', error.response?.data || error.message);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Tenants</h1>

      <div style={styles.headerActions}>
          <div style={styles.searchBar}>
            <FaSearch style={styles.searchIcon} />
            <input type="text" placeholder="Search..." style={styles.searchInput} />
          </div>

        <button style={styles.addTenantBtn} onClick={handleAddTenantClick}>
          <FaPlus style={styles.plusIcon} /> Add New Tenant
        </button>
      </div>

      <div style={styles.tenantGrid}>
        {tenants.length > 0 ? (
          tenants.map((tenant, index) => (
            <div key={tenant._id || index} style={styles.tenantBox} >
              <div style={styles.tenantInfo}>
                <div style={styles.tenantImage}>
                  <img src={tenantImage} alt="Tenant" style={styles.image} />
                </div>
                <div>
                  <h3 style={styles.tenantName}>
                    {tenant.tenantData?.firstName} {tenant.tenantData?.lastName}
                  </h3>
                  <p style={styles.tenantDetail}>{tenant.tenantData?.phoneNumber || tenant.phoneNo}</p>
                  <p style={styles.tenantDetail}>{tenant.tenantData?.email || tenant.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noDataText}>No data available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
<<<<<<< HEAD
    width: '1000px',
=======
  
    width: '1180px',
    height: '80vh',
  
>>>>>>> a53f7dee61934603defe4118b292493e0c2cde86
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  headerActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '25px',
    backgroundColor: '#fff',
    padding: '5px 10px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    width: '350px',
    height: '45px',
  },
  searchIcon: {
    color: '#555',
    marginRight: '5px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '16px',
  },
  addTenantBtn: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '8px 15px',
    borderRadius: '25px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  plusIcon: {
    marginRight: '5px',
  },
  tenantGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    padding: '10px 10px 40px',
  },
  tenantBox: {
    width:'23rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
  },
  tenantInfo: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
  },
  tenantName: {
    fontSize: '1.25em',
    fontWeight: 'bold',
    color: '#333',
  },
  tenantDetail: {
    fontSize: '0.9em',
    color: '#666',
  },
  tenantImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginTop: '15px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    fontSize: '1.2em',
  },
};

export default Tenants;
