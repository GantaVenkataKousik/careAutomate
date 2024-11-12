import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmergencyContactInfo } from '../../redux/tenant/tenantSlice';

const SubStep4 = () => {
  const dispatch = useDispatch();
  const emergencyContactInfo = useSelector((state) => state.tenant.emergencyContactInfo);
  const [emergencyContact, setEmergencyContact] = useState(emergencyContactInfo);

  useEffect(() => {
    setEmergencyContact(emergencyContactInfo);
  }, [emergencyContactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContact({
      ...emergencyContact,
      [name]: value,
    });

    dispatch(updateEmergencyContactInfo({ [name]: value }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Emergency Contact Information</h2>
      <div style={styles.grid}>
        <div>
          <label style={styles.label} htmlFor="firstName">First Name</label>
          <input
            style={styles.input}
            type="text"
            id="firstName"
            name="firstName"
            value={emergencyContact.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="middleName">Middle Name</label>
          <input
            style={styles.input}
            type="text"
            id="middleName"
            name="middleName"
            value={emergencyContact.middleName}
            onChange={handleChange}
            placeholder="Enter middle name"
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="lastName">Last Name</label>
          <input
            style={styles.input}
            type="text"
            id="lastName"
            name="lastName"
            value={emergencyContact.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="phoneNumber">Phone Number</label>
          <input
            style={styles.input}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={emergencyContact.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div style={styles.fullWidth}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={emergencyContact.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div style={styles.fullWidth}>
          <label style={styles.label} htmlFor="relationship">Relationship</label>
          <select
            style={styles.select}
            id="relationship"
            name="relationship"
            value={emergencyContact.relationship}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxHeight: "420px",
    overflowY: "auto",
    padding: "20px",
    borderRadius: "10px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "500",
    marginBottom: "1rem",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  fullWidth: {
    gridColumn: "1 / span 2",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "0.9rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "25px",
    fontSize: "1rem",
    outline: "none",
    backgroundColor: "#fff",
    transition: "border-color 0.3s",
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "25px",
    fontSize: "1rem",
    outline: "none",
    backgroundColor: "#fff",
    transition: "border-color 0.3s",
    appearance: "none",
  },
};

export default SubStep4;
