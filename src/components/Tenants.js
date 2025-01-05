import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import tenantImage from "../images/tenant.jpg";
import { useNavigate } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BASE_URL } from "../config";
import axios from "axios";

const Tenants = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTenantClick = () => {
    navigate("/tenants/createTenant");
  };

  const handleTenantClick = (tenantId) => {
    const tenant = tenants.find((t) => t._id === tenantId); // Find the tenant by ID
    if (tenant) {
      navigate("/tenants/tenantProfile", {
        state: { tenantId, tenantData: tenant },
      });
    } else {
      console.error("Tenant not found!");
    }
  };

  const handleIconClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchTenants = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      try {
        const response = await axios.post(
          `${BASE_URL}/fetchAll/fetchAllHCMsTenants`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const tenantsData = response.data?.data?.tenants || [];
        console.log(tenantsData);
        setTenants(tenantsData);
      } catch (error) {
        console.error(
          "Error fetching tenants:",
          error.response?.data || error.message
        );
      }
    };

    fetchTenants();
  }, []);

  // Combine both filters
  const filteredTenants = tenants
    .filter(
      (tenant) =>
        tenant.tenantData?.personalInfo?.firstName &&
        tenant.tenantData?.personalInfo?.lastName &&
        (tenant.tenantData?.personalInfo?.phoneNumber || tenant.phoneNo) &&
        (tenant.tenantData?.personalInfo?.email || tenant.email)
    ) // Old filter for valid tenants
    .filter((tenant) => {
      const fullName = `${tenant.tenantData?.personalInfo?.firstName || ""} ${
        tenant.tenantData?.personalInfo?.lastName || ""
      }`;
      const phone =
        tenant.tenantData?.personalInfo?.phoneNumber || tenant.phoneNo || "";
      const email =
        tenant.tenantData?.personalInfo?.email || tenant.email || "";

      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }); // New search filter
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Tenants</h1>

      <div style={styles.headerActions}>
        <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={styles.searchButton}>Search</button>
        </div>

        <button style={styles.addTenantBtn} onClick={handleAddTenantClick}>
          <FaPlus style={styles.plusIcon} />
          Add New Tenant
        </button>
      </div>

      <div style={styles.tenantGrid}>
        {filteredTenants.length > 0 ? (
          filteredTenants.map((tenant, index) => (
            <div style={styles.tenantCard} key={tenant._id || index}>
              <div style={styles.tenantCardUpperContainer}>
                <div style={styles.tenantDetails}>
                  <p
                    style={styles.tenantNameUI}
                    onClick={() => handleTenantClick(tenant._id)}
                  >
                    {tenant.tenantData?.personalInfo?.firstName}{" "}
                    {tenant.tenantData?.personalInfo?.lastName}
                  </p>
                  <p style={styles.tenantSubNameUI}>
                    {" "}
                    {tenant.tenantData?.personalInfo?.phoneNumber ||
                      tenant.phoneNo}
                  </p>
                  <p style={styles.tenantSubNameUI}>
                    {" "}
                    {tenant.tenantData?.personalInfo?.email || tenant.email}
                  </p>
                </div>
                <div>
                  <img
                    style={styles.tenantImg}
                    onClick={() => handleTenantClick(tenant._id)}
                    src={tenantImage}
                  ></img>
                </div>
              </div>
              <div style={styles.tenantIconsContainer}>
                <CiCalendarDate
                  style={styles.tenantIcon}
                  onClick={() => handleIconClick("/appointments")}
                />
                <IoIosMenu
                  style={styles.tenantIcon}
                  onClick={() => handleIconClick("/visits")}
                />
                <TbMessage
                  style={styles.tenantIcon}
                  onClick={() => handleIconClick("/communication")}
                />
                <IoDocumentTextOutline
                  style={styles.tenantIcon}
                  onClick={() => handleIconClick("/settings")}
                />
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noDataText}>Loading...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    margin: "1rem",
    fontFamily: "Poppins",
  },
  header: {
    fontSize: "2em",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    borderRadius: "25px",
    backgroundColor: "#fff",
    padding: "5px 15px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    width: "350px",
    height: "45px",
    marginRight: "1rem",
  },
  searchIcon: {
    color: "#555",
    marginRight: "10px",
    fontSize: "1.5rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "16px",
  },
  addTenantBtn: {
    backgroundColor: "#6F84F8",
    color: "#fff",
    padding: "8px 25px",
    borderRadius: "25px",
    border: "none",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  plusIcon: {
    marginRight: "5px",
  },
  tenantGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 280px))",
    gap: "20px",
    padding: "10px 10px 40px",
  },
  tenantCard: {
    boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: "0.5rem 1rem",
  },
  tenantDetails: {
    flex: "1",
    marginRight: "1rem",
  },
  tenantNameUI: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "rgba(0, 0, 0, 0.73)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
    cursor: "pointer",
  },

  tenantSubNameUI: {
    fontSize: "0.8rem",
    color: "rgba(0, 0, 0, 0.73)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
  },
  tenantImg: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "1rem",
    cursor: "pointer",
  },
  tenantCardUpperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tenantIconsContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  tenantIcon: {
    fontSize: "1.3rem",
    marginRight: "0.6rem",
    color: "rgba(0, 0, 0, 0.73)",
    cursor: "pointer",
  },

  noDataText: {
    textAlign: "center",
    color: "#999",
    fontSize: "1.2em",
  },
};

export default Tenants;
