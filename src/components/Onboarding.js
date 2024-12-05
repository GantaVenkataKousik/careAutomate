import React, { useState } from "react";

const SetupAccount = () => {
    const [addChildAccount, setAddChildAccount] = useState(false);

    return (
        <div style={styles.container}>
            {/* Setup Account Section */}
            <h2 style={styles.heading}>Setup Your Account:</h2>
            <form style={styles.form}>
                <div style={styles.row}>
                    <InputField label="First Name" />
                    <InputField label="Last Name" />
                </div>
                <div style={styles.row}>
                    <InputField label="Company Name" fullWidth />
                </div>
                <div style={styles.row}>
                    <InputField label="Address Line 1" />
                    <InputField label="Address Line 2" />
                </div>
                <div style={styles.row}>
                    <InputField label="City" />
                    <InputField label="State" />
                    <InputField label="Zip Code" />
                </div>
                <div style={styles.row}>
                    <InputField label="Office Phone Number" />
                    <InputField label="Cell Phone Number" />
                </div>
                <div style={styles.row}>
                    <InputField label="Primary Email Address" />
                    <InputField label="Alternate Email Address" />
                </div>
                <div style={styles.row}>
                    <InputField label="Federal Tax ID" />
                    <InputField label="NPI/UMPI" />
                    <InputField label="Taxonomy" />
                </div>
                <div>
                    <h3 style={styles.subheading}>MNITS Login Information</h3>
                    <div style={styles.row}>
                        <InputField label="Username" />
                        <InputField label="Password" type="password" />
                        <button type="button" style={styles.updateButton}>Update</button>
                    </div>
                </div>
                <div>
                    <h3 style={styles.subheading}>Waystar Login Information</h3>
                    <div style={styles.row}>
                        <InputField label="Username" />
                        <InputField label="Password" type="password" />
                        <button type="button" style={styles.updateButton}>Update</button>
                    </div>
                </div>
                <div style={styles.buttonRow}>
                    <button type="submit" style={styles.submitButton}>Confirm</button>
                    <button type="button" style={styles.cancelButton}>Cancel</button>
                </div>
            </form>

            {/* Add Child Admin Account */}
            <h3 style={styles.childHeading}>Would you like to add a child admin account?</h3>
            <div style={styles.buttonRow}>
                <button
                    type="button"
                    style={styles.submitButton}
                    onClick={() => setAddChildAccount(true)}
                >
                    Yes
                </button>
                <button
                    type="button"
                    style={styles.cancelButton}
                    onClick={() => setAddChildAccount(false)}
                >
                    No
                </button>
            </div>
            {addChildAccount && <ChildAdminAccountForm />}
        </div>
    );
};

const ChildAdminAccountForm = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Child Admin Account:</h2>
            <form style={styles.form}>
                <div style={styles.row}>
                    <InputField label="First Name" />
                    <InputField label="Middle Name" />
                    <InputField label="Last Name" />
                </div>
                <div style={styles.row}>
                    <InputField label="Address Line 1" />
                    <InputField label="Address Line 2" />
                </div>
                <div style={styles.row}>
                    <InputField label="City" />
                    <InputField label="State" />
                    <InputField label="Zip Code" />
                </div>
                <div style={styles.row}>
                    <InputField label="Office Phone Number" />
                    <InputField label="Cell Phone Number" />
                </div>
                <div style={styles.row}>
                    <InputField label="Email Address" />
                    <InputField label="Email Address/Username" />
                </div>
                <div style={styles.row}>
                    <InputField label="Create Password" type="password" />
                    <InputField label="Reenter Password" type="password" />
                </div>
                <div>
                    <h3 style={styles.subheading}>Permissions</h3>
                    <div style={styles.permissions}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                            <label><input type="checkbox" /> Billing Administration</label>
                            <label><input type="checkbox" /> Tenant Administration</label>
                        </div>
                        <div style={{display:'flex',gap:20,flexDirection:'column',justifyContent:'space-between'}}>
                            <label><input type="checkbox" /> HCM Administration</label>
                            <label><input type="checkbox" /> Appointments Administration</label>
                        </div>
                        <div style={{display:'flex',gap:20,flexDirection:'column',justifyContent:'space-between'}}>
                            <label><input type="checkbox" /> Visit Administration</label>
                            <label><input type="checkbox" /> Communication</label>
                        </div>

                    </div>
                </div>
                <div style={styles.buttonRow}>
                    <button type="submit" style={styles.submitButton}>Create Account</button>
                    <button type="button" style={styles.cancelButton}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

const InputField = ({ label, type = "text", fullWidth = false }) => {
    return (
        <div style={{ ...styles.inputContainer, ...(fullWidth ? { gridColumn: "span 2" } : {}) }}>
            <label style={styles.label}>{label}</label>
            <input type={type} style={styles.input} />
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "10px",
        background: "#f9f9f9",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        fontSize: "1.8rem",
        marginBottom: "20px",
        color: "#333",
        textAlign: "center",
    },
    subheading: {
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#555",
        marginBottom: "8px",
        textDecoration: 'underline',
    },
    childHeading: {
        fontSize: "1.5rem",
        marginTop: "20px",
        marginBottom: "10px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    row: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
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
    permissions: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        width: "600px",
        margin: "0 auto",
    },
    buttonRow: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "20px",
    },
    submitButton: {
        padding: "5px 20px",
        background: "#4caf50",
        color: "#fff",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
    },
    cancelButton: {
        padding: "5px 20px",
        background: "#f44336",
        color: "#fff",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
    },
    updateButton: {
        padding: "5px 10px",
        background: "#2196f3",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default SetupAccount;
