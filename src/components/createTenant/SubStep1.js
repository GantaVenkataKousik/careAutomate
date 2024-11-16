import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTenantInfo } from '../../redux/tenant/tenantSlice';
import Switch from '@mui/material/Switch';

const SubStep1 = () => {
  const dispatch = useDispatch();
  const tenantData = useSelector((state) => state.tenant);
  const [hasResponsibleParty, setHasResponsibleParty] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    dispatch(updateTenantInfo({ [name]: inputValue }));
  };

  return (
    <div style={styles.container}>
      <Section title="Basic Information">
        <InputField label="First Name *" name="firstName" value={tenantData.firstName} onChange={handleChange} onFocus={() => setFocusedField("firstName")} onBlur={() => setFocusedField(null)} focused={focusedField === "firstName"} required />
        <InputField label="Middle Name" name="middleName" value={tenantData.middleName} onChange={handleChange} onFocus={() => setFocusedField("middleName")} onBlur={() => setFocusedField(null)} focused={focusedField === "middleName"} />
        <InputField label="Last Name *" name="lastName" value={tenantData.lastName} onChange={handleChange} onFocus={() => setFocusedField("lastName")} onBlur={() => setFocusedField(null)} focused={focusedField === "lastName"} required />
        <InputField label="Date of Birth" name="dob" value={tenantData.dob} onChange={handleChange} type="date" onFocus={() => setFocusedField("dob")} onBlur={() => setFocusedField(null)} focused={focusedField === "dob"} required />
        <InputField label="Gender" name="gender" value={tenantData.gender} onChange={handleChange} type="select" options={["Male", "Female"]} onFocus={() => setFocusedField("gender")} onBlur={() => setFocusedField(null)} focused={focusedField === "gender"} required />
        <InputField label="MA PMI #" name="MAPMI#" value={tenantData.mapmi} onChange={handleChange}  onFocus={() => setFocusedField("mapmi")} onBlur={() => setFocusedField(null)} focused={focusedField === "mapmi"} required />
      </Section>
      <Section title="Contact Information">
        <InputField label="Phone Number *" name="phoneNumber" value={tenantData.phoneNumber} onChange={handleChange} required />
        <InputField label="Email *" name="email" value={tenantData.email} onChange={handleChange} type="email" required />
        <InputField label="Home Phone" name="homePhone" value={tenantData.homePhone} onChange={handleChange} />
        <InputField label="Cell Phone" name="cellPhone" value={tenantData.cellPhone} onChange={handleChange} />
      </Section>

      <Section title="Address Information">
        <InputField label="Address Line 1" name="addressLine1" value={tenantData.addressLine1} onChange={handleChange} required />
        <InputField label="Address Line 2" name="addressLine2" value={tenantData.addressLine2} onChange={handleChange} />
        <InputField label="City" name="city" value={tenantData.city} onChange={handleChange} required />
        <InputField label="State" name="state" value={tenantData.state} onChange={handleChange} required />
        <InputField label="Zip Code" name="zipCode" value={tenantData.zipCode} onChange={handleChange} required />
      </Section>

      <Section title="Emergency Contact Information">
        <InputField label="Emergency First Name" name="emergencyFirstName" value={tenantData.emergencyFirstName} onChange={handleChange} required />
        <InputField label="Emergency Middle Name" name="emergencyMiddleName" value={tenantData.emergencyMiddleName} onChange={handleChange} />
        <InputField label="Emergency Last Name" name="emergencyLastName" value={tenantData.emergencyLastName} onChange={handleChange} required />
        <InputField label="Emergency Phone Number" name="emergencyPhoneNumber" value={tenantData.emergencyPhoneNumber} onChange={handleChange} required />
        <InputField label="Emergency Email" name="emergencyEmail" value={tenantData.emergencyEmail} onChange={handleChange} type="email" required />
        <InputField label="Relationship" name="emergencyRelationship" value={tenantData.emergencyRelationship} onChange={handleChange} required />
      </Section>

      <Section title="Case Manager Information">
        <InputField label="First Name" name="caseManagerFirstName" value={tenantData.caseManagerFirstName} onChange={handleChange} required />
        <InputField label="Middle Initial" name="caseManagerMiddleInitial" value={tenantData.caseManagerMiddleInitial} onChange={handleChange} />
        <InputField label="Last Name" name="caseManagerLastName" value={tenantData.caseManagerLastName} onChange={handleChange} required />
        <InputField label="Phone Number" name="caseManagerPhoneNumber" value={tenantData.caseManagerPhoneNumber} onChange={handleChange} required />
        <InputField label="Email" name="caseManagerEmail" value={tenantData.caseManagerEmail} onChange={handleChange} type="email" required />
      </Section>

      <Section title="Login Information">
        <InputField label="Username" name="userName" value={tenantData.userName} onChange={handleChange} required />
        <InputField label="Password" name="password" value={tenantData.password} onChange={handleChange} type="password" required />
      </Section>
      {/* Other sections as before */}

      {/* <Section title="Responsible Party Information"> */}
        <div className="flex items-center mb-4">
          <label className="text-gray-700 mr-2">Do you have a responsible party?</label>
          <Switch checked={hasResponsibleParty} onChange={() => setHasResponsibleParty(!hasResponsibleParty)} />
        </div>
        {hasResponsibleParty && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField label="Responsible First Name" name="responsibleFirstName" value={tenantData.responsibleFirstName} onChange={handleChange} onFocus={() => setFocusedField("responsibleFirstName")} onBlur={() => setFocusedField(null)} focused={focusedField === "responsibleFirstName"} required />
            <InputField label="Responsible Middle Name" name="responsibleMiddleName" value={tenantData.responsibleMiddleName} onChange={handleChange} onFocus={() => setFocusedField("responsibleMiddleName")} onBlur={() => setFocusedField(null)} focused={focusedField === "responsibleMiddleName"} />
            <InputField label="Responsible Last Name" name="responsibleLastName" value={tenantData.responsibleLastName} onChange={handleChange} onFocus={() => setFocusedField("responsibleLastName")} onBlur={() => setFocusedField(null)} focused={focusedField === "responsibleLastName"} required />
            <InputField label="Responsible Phone Number" name="responsiblePhoneNumber" value={tenantData.responsiblePhoneNumber} onChange={handleChange} onFocus={() => setFocusedField("responsiblePhoneNumber")} onBlur={() => setFocusedField(null)} focused={focusedField === "responsiblePhoneNumber"} required />
            <InputField label="Responsible Email" name="responsibleEmail" value={tenantData.responsibleEmail} onChange={handleChange} type="email" onFocus={() => setFocusedField("responsibleEmail")} onBlur={() => setFocusedField(null)} focused={focusedField === "responsibleEmail"} required />
            <InputField label="Relationship" name="responsibleRelationship" value={tenantData.responsibleRelationship} onChange={handleChange} onFocus={() => setFocusedField("responsibleRelationship")} onBlur={() => setFocusedField(null)} focused={focusedField === "responsibleRelationship"} required />
          </div>
        )}
      {/* </Section> */}
    </div>
  );
};

// Reusable input component
const InputField = ({ label, name, value, onChange, type = "text", options = [], required = false, focused, onFocus, onBlur }) => (
  <div style={{ marginBottom: "2px" }}>
    <label style={styles.label} htmlFor={name}>
      {label}
    </label>
    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ ...styles.input, ...(focused ? styles.inputFocused : {}) }}
        required={required}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ ...styles.input, ...(focused ? styles.inputFocused : {}) }}
        required={required}
      />
    )}
  </div>
);

// Reusable Section component to wrap sections with a title
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "16px" }}>
    <h3 style={styles.sectionHeading}>{title}</h3>
    <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);

// Styles
const styles = {
  container: {
    maxHeight: "440px",
    overflowY: "auto",
    padding: "20px",
    borderRadius: "10px",
  },
  sectionHeading: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#555",
    marginBottom: "8px",
    textDecoration: 'underline',

  },

  label: {
    display: "block",
    fontSize: "1rem",
    color: "#000080",
    marginBottom: "4px",
    fontWeight: '600', 
  },
  input: {
    width: "80%",
    padding: "5px 10px",
    border: "1px solid #ddd",
    borderRadius: "25px",
    fontSize: "1rem",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
    outline: "none",
    transition: "border-color 0.3s",
    textAlign: 'center',
    
  },
  inputFocused: {
    borderColor: "#4A90E2",
    boxShadow: "0px 0px 4px rgba(74, 144, 226, 0.5)",
  },
  
};

export default SubStep1;
