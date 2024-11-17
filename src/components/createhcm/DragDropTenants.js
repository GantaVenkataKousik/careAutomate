import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssignedTenants } from '../../redux/hcm/hcmSlice';

const DragDropTenants = () => {
  const dispatch = useDispatch();
  const assignedTenantsRedux = useSelector((state) => state.hcm.assignedTenants);
  const [allTenants, setAllTenants] = useState([]);
  const [assignedTenants, setAssignedTenants] = useState(assignedTenantsRedux || []);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token'); // Ensure the token is correctly retrieved
        if (!token) {
          console.error('Authorization token is missing.');
          return;
        }

        const response = await fetch(
          'https://careautomate-backend.vercel.app/tenant/all',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          }
        );

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const tenantData = data.tenants.map((tenant) => ({
            id: tenant._id,
            name: tenant.name,
          }));
          setAllTenants(tenantData); // Update state with fetched tenants
        } else {
          console.error('Failed to fetch tenants:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  const handleDragStart = (e, tenant, source) => {
    e.dataTransfer.setData('tenant', JSON.stringify(tenant)); // Save entire tenant object for better handling
    e.dataTransfer.setData('source', source);
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const tenantData = JSON.parse(e.dataTransfer.getData('tenant')); // Retrieve the full tenant object
    const source = e.dataTransfer.getData('source');

    if (source === 'all' && target === 'assigned') {
      const updatedAllTenants = allTenants.filter((tenantObj) => tenantObj.id !== tenantData.id);
      const updatedAssignedTenants = [...assignedTenants, tenantData];

      setAllTenants(updatedAllTenants);
      setAssignedTenants(updatedAssignedTenants);

      // Update Redux state with only tenant IDs
      dispatch(updateAssignedTenants(updatedAssignedTenants.map((tenantObj) => tenantObj.id)));

      // Log only tenant IDs
      console.log('Assigned Tenant IDs:', updatedAssignedTenants.map((tenantObj) => tenantObj.id));
    } else if (source === 'assigned' && target === 'all') {
      const updatedAssignedTenants = assignedTenants.filter((tenantObj) => tenantObj.id !== tenantData.id);
      const updatedAllTenants = [...allTenants, tenantData];

      setAssignedTenants(updatedAssignedTenants);
      setAllTenants(updatedAllTenants);

      // Update Redux state with only tenant IDs
      dispatch(updateAssignedTenants(updatedAssignedTenants.map((tenantObj) => tenantObj.id)));

      // Log only tenant IDs
      console.log('Assigned Tenant IDs:', updatedAssignedTenants.map((tenantObj) => tenantObj.id));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Step 2: Designate Tenants</h2>
      <div style={styles.dragDropSection}>
        <div
          style={styles.tenantBox}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'all')}
        >
          <h3 style={styles.boxHeading}>All Tenants</h3>
          <ul style={styles.tenantList}>
            {allTenants.map((tenant) => (
              <li
                key={tenant.id} // Ensure that the key is unique
                draggable
                onDragStart={(e) => handleDragStart(e, tenant, 'all')}
                style={styles.tenantItem}
              >
                {tenant.name}
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.arrows}>
          <span>&#8594;</span>
          <span>&#8592;</span>
        </div>
        <div
          style={styles.tenantBox}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'assigned')}
        >
          <h3 style={styles.boxHeading}>Assigned Tenants</h3>
          <ul style={styles.tenantList}>
            {assignedTenants.map((tenant) => (
              <li
                key={tenant.id} // Ensure that the key is unique
                draggable
                onDragStart={(e) => handleDragStart(e, tenant, 'assigned')}
                style={styles.tenantItem}
              >
                {tenant.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  dragDropSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tenantBox: {
    width: '45%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    minHeight: '200px',
  },
  boxHeading: {
    marginBottom: '16px',
    textAlign: 'center',
  },
  tenantList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  tenantItem: {
    margin: '8px 0',
    padding: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'grab',
    transition: 'background-color 0.3s',
  },
  arrows: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    margin: '0 16px',
  },
};

export default DragDropTenants;
