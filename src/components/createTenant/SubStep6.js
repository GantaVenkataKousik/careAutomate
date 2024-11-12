import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginInfo } from '../../redux/tenant/tenantSlice';

const SubStep6 = () => {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.tenant.loginInfo);
  const [formData, setFormData] = useState(loginInfo);

  useEffect(() => {
    setFormData(loginInfo);
  }, [loginInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(updateLoginInfo({ [name]: value }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login Information</h2>

      <div style={styles.grid}>
        <div>
          <label style={styles.label} htmlFor="user-name">Username</label>
          <input
            style={styles.input}
            type="text"
            id="user-name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter username"
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
            placeholder="Enter email"
            required
          />
        </div>

        <div style={styles.fullWidth}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
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
    display:'flex',
    flexDirection:'column',
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

export default SubStep6;
