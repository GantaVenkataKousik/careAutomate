import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContactInfo } from '../../redux/tenant/tenantSlice';

const SubStep3 = () => {
  const dispatch = useDispatch();
  const contactInfo = useSelector((state) => state.tenant.contactInfo);
  const [contact, setContact] = useState(contactInfo);

  useEffect(() => {
    setContact(contactInfo);
  }, [contactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });

    dispatch(updateContactInfo({ [name]: value }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Information</h2>
      <div style={styles.grid}>
        <div>
          <label style={styles.label} htmlFor="homePhone">Home Phone Number</label>
          <input
            style={styles.input}
            type="text"
            id="homePhone"
            name="homePhone"
            value={contact.homePhone}
            onChange={handleChange}
            placeholder="Enter home phone"
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="cellPhone">Cell Phone Number</label>
          <input
            style={styles.input}
            type="text"
            id="cellPhone"
            name="cellPhone"
            value={contact.cellPhone}
            onChange={handleChange}
            placeholder="Enter cell phone"
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="workPhone">Work Phone Number</label>
          <input
            style={styles.input}
            type="text"
            id="workPhone"
            name="workPhone"
            value={contact.workPhone}
            onChange={handleChange}
            placeholder="Enter work phone"
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="extension">Extension</label>
          <input
            style={styles.input}
            type="text"
            id="extension"
            name="extension"
            value={contact.extension}
            onChange={handleChange}
            placeholder="Extension"
          />
        </div>

        {/* <div style={styles.fullWidth}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div> */}
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

export default SubStep3;
