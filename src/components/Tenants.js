import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import {
  LiaFileInvoiceDollarSolid,
  LiaUserEditSolid,
  LiaTrashSolid,
} from "react-icons/lia";
import { MdOutlineEventAvailable } from "react-icons/md";
import tenantImage from "../images/tenant.jpg";
import { useNavigate } from "react-router-dom";
import { BiUserCheck } from "react-icons/bi";
import { TbMessage } from "react-icons/tb";
import { BASE_URL } from "../config";
import axios from "axios";
import EditTenant from "./tenantsPage/EditTenant";
import TenantFilter from "./tenantsPage/TenantFilter";
import { applyTenantFilters } from "../utils/tenants/filterTenantsUtils/filterTenantsData";

const Tenants = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    services: [],
    insurances: [],
    cities: [],
  });

  const handleAddTenantClick = () => {
    navigate("/tenants/createTenant");
  };

  const handleEditClick = (tenant) => {
    setSelectedTenant(tenant);
    setOpenModal(true);
  };

  const handleTenantClick = (tenantId) => {
    const tenant = tenants.find((t) => t._id === tenantId);
    if (tenant) {
      navigate("/tenants/tenantProfile", {
        state: { tenantId, tenantData: tenant },
      });
    } else {
      console.error("Tenant not found!");
    }
  };

  const handleIconClick = (path, tenant) => {
    if (tenant) {
      navigate(path, {
        state: { tenantId: tenant._id },
      });
    } else {
      navigate(path);
    }
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

  const handleFilterUpdate = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const filteredTenants = applyTenantFilters(
    tenants,
    activeFilters,
    searchQuery
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header} className="text-2xl flex items-center gap-2">
        <span>Tenants</span>
        <span className="h-9 w-9 flex items-center justify-center rounded-full font-bold text-lg p-2 bg-[#6F84F8] text-white">
          {filteredTenants.length}
        </span>
      </h1>
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
        </div>

        <button style={styles.addTenantBtn} onClick={handleAddTenantClick}>
          <FaPlus style={styles.plusIcon} />
          Add New Tenant
        </button>
      </div>

      <div style={styles.mainContainer}>
        <div style={styles.tenantGridContainer}>
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
                        {tenant.tenantData?.personalInfo?.maPMINumber}
                      </p>
                      <p style={styles.tenantSubNameUI}>
                        {" "}
                        {tenant.tenantData?.admissionInfo?.insurance}
                      </p>
                      <p style={styles.tenantSubNameUI}>
                        {" "}
                        {tenant.tenantData?.admissionInfo?.insuranceNumber}
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

                  <div className="flex justify-between">
                    <div style={styles.tenantIconsContainer}>
                      <MdOutlineEventAvailable
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() => handleIconClick("/appointments", tenant)}
                      />
                      <BiUserCheck
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() => handleIconClick("/visits", tenant)}
                      />
                      <TbMessage
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() =>
                          handleIconClick("/communication", tenant)
                        }
                      />
                      <LiaFileInvoiceDollarSolid
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() =>
                          handleIconClick("/tenants/planUsage", tenant)
                        }
                      />
                    </div>
                    <div style={styles.tenantIconsContainer}>
                      <LiaUserEditSolid
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() => handleEditClick(tenant)}
                      />
                      <LiaTrashSolid className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#F57070] cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noDataText}>Loading...</p>
            )}
          </div>
        </div>
        <div style={styles.filterContainer} className="tenant-visits-scrollbar">
          <TenantFilter onFilterUpdate={handleFilterUpdate} />
        </div>
      </div>
      <EditTenant
        open={openModal}
        setOpen={setOpenModal}
        tenant={selectedTenant}
      />
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    margin: "1rem",
    fontFamily: "Poppins",
  },
  header: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 20px 20px 20px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
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
  // Updated and new styles:
  mainContainer: {
    display: "flex",
    gap: "20px",
    width: "100%",
    height: "calc(100vh - 150px)", // Adjust based on your header height
    overflow: "hidden",
  },
  filterContainer: {
    width: "280px", // Fixed width for filter
    flexShrink: 0,
    border: "1px solid #6f84f8",
    borderRadius: "20px",
    padding: "10px",
    height: "100%",
    overflowY: "auto",
    marginTop: "10px",
  },
  tenantGridContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    height: "100%",
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
    height: "fit-content",
  },
  container: {
    padding: "20px",
    margin: "0",
    fontFamily: "Poppins",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  tenantBody: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
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
