import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignedHCMs } from "../../redux/tenant/tenantSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { BASE_URL } from "../../config";

const ChecklistHCMs = ({ tenantId }) => {
  const dispatch = useDispatch();
  const assignedHCMs = useSelector((state) => state.tenant.assignedHCMs); // Redux state
  const [allHCMs, setAllHCMs] = useState([]); // List of all HCMs fetched from API
  const [selectedHCMs, setSelectedHCMs] = useState([]); // Local state for selected HCMs
  const [searchQuery, setSearchQuery] = useState("");

  // Sync local state with Redux state when component mounts
  useEffect(() => {
    setSelectedHCMs(
      assignedHCMs.ids.map((id, index) => ({
        id,
        name: assignedHCMs.names[index],
      }))
    );
  }, [assignedHCMs]);

  // Fetch all HCMs from API
  useEffect(() => {
    const fetchHCMs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(
          `${BASE_URL}/fetchAll/fetchAllHCMsTenants`,
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
          const hcmData = data.data.hcm
            .map((hcm) => ({
              id: hcm._id,
              name: hcm.name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
          setAllHCMs(hcmData);
        } else {
          console.error("Failed to fetch HCMs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching HCMs:", error);
      }
    };

    fetchHCMs();
  }, []);

  // Handle individual checkbox toggle
  const handleCheckboxChange = (hcm) => {
    let updatedHCMs;
    if (selectedHCMs.some((selected) => selected.id === hcm.id)) {
      // Remove HCM if already selected
      updatedHCMs = selectedHCMs.filter((selected) => selected.id !== hcm.id);
    } else {
      // Add HCM if not already selected
      updatedHCMs = [...selectedHCMs, hcm];
    }

    setSelectedHCMs(updatedHCMs);

    // Update Redux state
    dispatch(
      updateAssignedHCMs({
        ids: updatedHCMs.map((hcm) => hcm.id),
        names: updatedHCMs.map((hcm) => hcm.name),
      })
    );
  };

  // Handle Select All / Deselect All
  const handleSelectAllToggle = () => {
    if (selectedHCMs.length === allHCMs.length) {
      // Deselect all
      setSelectedHCMs([]);
      dispatch(updateAssignedHCMs({ ids: [], names: [] }));
    } else {
      // Select all
      setSelectedHCMs(allHCMs);
      dispatch(
        updateAssignedHCMs({
          ids: allHCMs.map((hcm) => hcm.id),
          names: allHCMs.map((hcm) => hcm.name),
        })
      );
    }
  };

  // Filter HCMs based on search query
  const filteredHCMs = allHCMs.filter((hcm) =>
    hcm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Step 2: Designate HCMs</h2>

      <div style={styles.checklistSection}>
        <div style={styles.tenantBox}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search HCMs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <button
            style={styles.selectAllButton}
            onClick={handleSelectAllToggle}
          >
            {selectedHCMs.length === allHCMs.length
              ? "Deselect All"
              : "Select All"}
          </button>
          <div className="overflow-y-auto max-h-60">
            <ul style={styles.tenantList}>
              {filteredHCMs.map((hcm) => (
                <li
                  key={hcm.id}
                  style={{
                    ...styles.tenantItem,
                    backgroundColor: selectedHCMs.some(
                      (selected) => selected.id === hcm.id
                    )
                      ? "#6F84F8"
                      : "#fff",
                    color: selectedHCMs.some(
                      (selected) => selected.id === hcm.id
                    )
                      ? "#fff"
                      : "#000",
                  }}
                  onClick={() => handleCheckboxChange(hcm)}
                >
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedHCMs.some(
                        (selected) => selected.id === hcm.id
                      )}
                      onChange={() => handleCheckboxChange(hcm)}
                      style={styles.hiddenCheckbox}
                    />
                    {hcm.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={styles.arrows}>
          <FaArrowRightLong />
        </div>
        <div style={styles.tenantBox}>
          <h3 style={styles.boxHeading}>Selected HCMs</h3>
          <div className="overflow-y-auto max-h-60">
            <ul style={styles.tenantList}>
              {selectedHCMs.map((hcm) => (
                <li key={hcm.id} style={styles.tenantItem}>
                  {hcm.name}
                </li>
              ))}
            </ul>
          </div>
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
    margin: "8px 0",
    padding: "0.7rem 1rem",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "30px",
    width: "100%",
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

export default ChecklistHCMs;
