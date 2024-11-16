import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssignedTenants } from '../../redux/hcm/hcmSlice'; // Import the Redux action

const DragDropTenants = () => {
  const dispatch = useDispatch();
  const assignedTenantsRedux = useSelector((state) => state.hcm.assignedTenants); // Access Redux state
  const [allTenants, setAllTenants] = useState([
    'Abdi Fathima',
    'Michael Ron',
    'Frischer Bour',
    'Christine Nate',
    'Matt Hane',
    'Vue Lee',
  ]);

  // Initialize the assigned tenants state from Redux
  const [assignedTenants, setAssignedTenants] = useState(assignedTenantsRedux || []);

  // Drag and Drop Handlers
  const handleDragStart = (e, tenant, source) => {
    e.dataTransfer.setData('tenant', tenant);
    e.dataTransfer.setData('source', source);
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const tenant = e.dataTransfer.getData('tenant');
    const source = e.dataTransfer.getData('source');

    if (source === 'all' && target === 'assigned') {
      const updatedAllTenants = allTenants.filter((name) => name !== tenant);
      const updatedAssignedTenants = [...assignedTenants, tenant];
      setAllTenants(updatedAllTenants);
      setAssignedTenants(updatedAssignedTenants);

      // Update Redux state
      dispatch(updateAssignedTenants(updatedAssignedTenants));
    } else if (source === 'assigned' && target === 'all') {
      const updatedAssignedTenants = assignedTenants.filter((name) => name !== tenant);
      const updatedAllTenants = [...allTenants, tenant];
      setAssignedTenants(updatedAssignedTenants);
      setAllTenants(updatedAllTenants);

      // Update Redux state
      dispatch(updateAssignedTenants(updatedAssignedTenants));
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
            {allTenants.map((tenant, index) => (
              <li
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, tenant, 'all')}
                style={styles.tenantItem}
              >
                {tenant}
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
            {assignedTenants.map((tenant, index) => (
              <li
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, tenant, 'assigned')}
                style={styles.tenantItem}
              >
                {tenant}
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
