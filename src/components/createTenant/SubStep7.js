import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResponsiblePartyInfo } from "../../redux/tenant/tenantSlice";

const SubStep7 = () => {
  const dispatch = useDispatch();
  const responsiblePartyInfo = useSelector((state) => state.tenant.responsiblePartyInfo);

  const [formData, setFormData] = useState(responsiblePartyInfo);

  useEffect(() => {
    setFormData(responsiblePartyInfo);
  }, [responsiblePartyInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(updateResponsiblePartyInfo({ [name]: value }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Responsible Party Information</h2>

      <div style={styles.grid}>
        <div>
          <label style={styles.label} htmlFor="firstName">First Name</label>
          <input
            style={styles.input}
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
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
            value={formData.middleName}
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
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>
      </div>

      <div style={styles.grid}>
        <div>
          <label style={styles.label} htmlFor="phoneNumber">Phone Number</label>
          <input
            style={styles.input}
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="relationship">Relationship</label>
          <input
            style={styles.input}
            type="text"
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            placeholder="Enter relationship"
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
    marginBottom: "1rem",
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

export default SubStep7;
