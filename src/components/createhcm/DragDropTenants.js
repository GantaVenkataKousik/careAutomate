import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignedTenants } from "../../redux/hcm/hcmSlice";
import { FaArrowRightLong } from "react-icons/fa6";

const ChecklistTenants = () => {
  const dispatch = useDispatch();
  const assignedTenantsRedux = useSelector(
    (state) => state.hcm.assignedTenants
  );
  const [allTenants, setAllTenants] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState(
    assignedTenantsRedux || []
  );
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(
          "https://careautomate-backend.vercel.app/tenant/all",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const tenantData = data.tenants.map((tenant) => ({
            id: tenant._id,
            name: tenant.name,
          }));
          setAllTenants(tenantData);
        } else {
          console.error("Failed to fetch tenants:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };

    fetchTenants();
  }, []);

  const handleCheckboxChange = (tenant) => {
    if (selectedTenants.some((t) => t.id === tenant.id)) {
      const updatedTenants = selectedTenants.filter((t) => t.id !== tenant.id);
      setSelectedTenants(updatedTenants);
      dispatch(updateAssignedTenants(updatedTenants.map((t) => t.id)));
    } else {
      const updatedTenants = [...selectedTenants, tenant];
      setSelectedTenants(updatedTenants);
      dispatch(updateAssignedTenants(updatedTenants.map((t) => t.id)));
    }
  };

  const handleSelectAllToggle = () => {
    if (selectedTenants.length === allTenants.length) {
      // Deselect All
      setSelectedTenants([]);
      dispatch(updateAssignedTenants([]));
    } else {
      // Select All
      setSelectedTenants(allTenants);
      dispatch(updateAssignedTenants(allTenants.map((tenant) => tenant.id)));
    }
  };

  // Filter tenants based on search query
  const filteredTenants = allTenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Step 2: Designate Tenants</h2>

      <div style={styles.checklistSection}>
        <div style={styles.tenantBox}>
          <div style={styles.boxHeader}>
            <h3 style={styles.boxHeading}>All Tenants</h3>
            <button
              style={styles.selectAllButton}
              onClick={handleSelectAllToggle}
            >
              {selectedTenants.length === allTenants.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
          {/* Search bar inside the All Tenants section */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <ul style={styles.tenantList}>
            {filteredTenants.map((tenant) => (
              <li
                key={tenant.id}
                style={{
                  ...styles.tenantItem,
                  backgroundColor: selectedTenants.some(
                    (t) => t.id === tenant.id
                  )
                    ? "#6F84F8"
                    : "#fff",
                  color: selectedTenants.some((t) => t.id === tenant.id)
                    ? "#fff"
                    : "#000",
                }}
                onClick={() => handleCheckboxChange(tenant)} // Handle selection on click
              >
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedTenants.some((t) => t.id === tenant.id)}
                    onChange={() => handleCheckboxChange(tenant)}
                    style={styles.hiddenCheckbox} // Hide the checkbox
                  />
                  {tenant.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.arrows}>
          <FaArrowRightLong />
        </div>
        <div style={styles.tenantBox}>
          <h3 style={styles.boxHeading}>Selected Tenants</h3>
          <ul style={styles.tenantList}>
            {selectedTenants.map((tenant) => (
              <li key={tenant.id} style={styles.tenantItem}>
                {tenant.name}
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
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Poppins",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  searchContainer: {
    marginBottom: "16px",
    textAlign: "center",
  },
  searchInput: {
    padding: "0.5rem 0.5rem",
    borderRadius: "30px",
    fontSize: "16px",
    width: "100%",
    // borderRadius: "4px",
    border: "1px solid #ccc",
    margin: "0 auto",
  },
  checklistSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tenantBox: {
    width: "45%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    minHeight: "200px",
  },
  boxHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxHeading: {
    marginBottom: "16px",
    fontSize: "1.2rem",
    fontFamily: "Poppins",
  },
  selectAllButton: {
    padding: "8px 12px",
    backgroundColor: "#6F84F8",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  tenantList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  tenantItem: {
    margin: "8px 0",
    padding: "0.7rem 1rem",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "30px",
    transition: "background-color 0.3s",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  arrows: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    margin: "0 16px",
  },
};

export default ChecklistTenants;
