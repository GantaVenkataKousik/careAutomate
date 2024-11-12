import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCaseManagerInfo } from '../../redux/tenant/tenantSlice';

const SubStep5 = () => {
  const dispatch = useDispatch();
  const caseManagerInfo = useSelector((state) => state.tenant.caseManagerInfo);
  const [formData, setFormData] = useState(caseManagerInfo);

  useEffect(() => {
    setFormData(caseManagerInfo);
  }, [caseManagerInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(updateCaseManagerInfo({ [name]: value }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Case Manager Information</h2>

      <div style={styles.grid}>
        <div>
          <label style={styles.label} htmlFor="first-name">First Name</label>
          <input
            style={styles.input}
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="middle-initial">Middle Initial</label>
          <input
            style={styles.input}
            type="text"
            id="middle-initial"
            name="middleInitial"
            value={formData.middleInitial}
            onChange={handleChange}
            placeholder="Middle name"
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="last-name">Last Name</label>
          <input
            style={styles.input}
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="phone-number">Phone Number</label>
          <input
            style={styles.input}
            type="text"
            id="phone-number"
            name="phoneNumber"
            value={formData.phoneNumber}
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxHeight: "400px",
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
};

export default SubStep5;
