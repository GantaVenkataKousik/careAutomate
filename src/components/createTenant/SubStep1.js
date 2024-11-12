import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalInfo } from "../../redux/tenant/tenantSlice";
import usflag from "../../images/usa.png";

const SubStep1 = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.tenant.personalInfo);

  const [formData, setFormData] = useState(personalInfo);

  useEffect(() => {
    setFormData(personalInfo);
  }, [personalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(updatePersonalInfo({ [name]: value }));
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", padding: "20px", borderRadius: "10px" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "500", marginBottom: "1rem", color: "#333" }}>Basic Information</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "1rem" }}>
        <div>
          <label style={styles.label} htmlFor="firstName">First Name*</label>
          <input
            style={styles.input}
            type="text"
            id="firstName"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
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
            value={personalInfo.middleName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={styles.label} htmlFor="lastName">Last Name*</label>
          <input
            style={styles.input}
            type="text"
            id="lastName"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "1rem" }}>
        <div>
          <label style={styles.label} htmlFor="dob">DOB*</label>
          <input
            style={styles.input}
            type="date"
            id="dob"
            name="dob"
            value={personalInfo.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={styles.label} htmlFor="gender">Gender*</label>
          <select
            style={styles.input}
            id="gender"
            name="gender"
            value={personalInfo.gender || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr", gap: "15px", marginBottom: "1rem" }}>
        <div>
          <label style={styles.label} htmlFor="phoneNumber">Phone Number*</label>
          <div style={{ display: "flex" }}>
            <div style={{ ...styles.input, ...styles.prefix }}>
              <img src={usflag} alt="US Flag" style={{ marginRight: "5px", height: "16px" }} />
              <span>+1</span>
            </div>
            <input
              style={{ ...styles.input, borderRadius: "0 25px 25px 0" }}
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={personalInfo.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label style={styles.label} htmlFor="email">Email*</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  label: {
    display: "block",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "25px",
    fontSize: "1rem",
    outline: "none",
  },
  prefix: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRight: "none",
    borderRadius: "25px 0 0 25px",
  },
};

export default SubStep1;
