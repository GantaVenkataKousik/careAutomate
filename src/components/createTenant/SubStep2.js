import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressInfo } from '../../redux/tenant/tenantSlice';

const SubStep2 = () => {
  const dispatch = useDispatch();
  const addressInfo = useSelector((state) => state.tenant.addressInfo);
  const [address, setAddress] = useState(addressInfo);

  useEffect(() => {
    setAddress(addressInfo);
  }, [addressInfo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setAddress({
      ...address,
      [name]: updatedValue,
    });

    dispatch(updateAddressInfo({ [name]: updatedValue }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Address Information</h2>
      <div style={styles.grid}>
        <div>
          <label style={styles.label} htmlFor="addressLine1">Address Line 1*</label>
          <input
            style={styles.input}
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label style={styles.label} htmlFor="addressLine2">Address Line 2</label>
          <input
            style={styles.input}
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label style={styles.label} htmlFor="city">City*</label>
          <input
            style={styles.input}
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label style={styles.label} htmlFor="state">State*</label>
          <input
            style={styles.input}
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label style={styles.label} htmlFor="zipCode">Zip Code*</label>
          <input
            style={styles.input}
            type="text"
            id="zipCode"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h3 style={styles.subHeader}>Mailing Address</h3>
      <div style={styles.checkboxContainer}>
        <label style={styles.checkboxLabel}>
          <input
            style={styles.checkbox}
            type="checkbox"
            id="mailingSameAsAbove"
            name="mailingSameAsAbove"
            checked={address.mailingSameAsAbove}
            onChange={handleChange}
          />
          Same as Above
        </label>
        <label style={styles.checkboxLabel}>
          <input
            style={styles.checkbox}
            type="checkbox"
            id="mailingDifferent"
            name="mailingDifferent"
            checked={address.mailingDifferent}
            onChange={handleChange}
          />
          Different
        </label>
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
  header: {
    fontSize: "1.5rem",
    fontWeight: "500",
    marginBottom: "1rem",
    color: "#333"
  },
  subHeader: {
    fontSize: "1.3rem",
    fontWeight: "500",
    marginTop: "1rem",
    marginBottom: "0.5rem",
    color: "#333"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "0.5rem"
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    marginBottom: "5px",
    color: "#555"
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "25px",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  },
  checkboxContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "10px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    color: "#333"
  },
  checkbox: {
    marginRight: "8px",
    width: "18px",
    height: "18px",
  }
};

export default SubStep2;
