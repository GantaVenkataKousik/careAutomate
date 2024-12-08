import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaCalendarAlt,
  FaBars,
  FaEnvelope,
  FaFileAlt,
} from "react-icons/fa";
import HcmImage from "../images/tenant.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { he } from "date-fns/locale";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Hcms() {
  const navigate = useNavigate();
  const [Hcms, setHcms] = useState([]);

  const handleAddHcmClick = () => {
    navigate("/hcms/createHcm");
  };

  const handleHcmNameClick = () => {
    navigate("/hcms/planUsage");
  };

  useEffect(() => {
    const fetchHcms = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      try {
        const response = await axios.post(
          "https://careautomate-backend.vercel.app/fetchAll/fetchAllHCMsTenants",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const HcmsData = response.data?.data?.hcm || [];
        setHcms(HcmsData);
      } catch (error) {
        console.error(
          "Error fetching Hcms:",
          error.response?.data || error.message
        );
      }
    };

    fetchHcms();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>HCM</h1>

      <div style={styles.headerActions}>
        <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>Search</button>
        </div>

        <button style={styles.addHcmBtn} onClick={handleAddHcmClick}>
          <FaPlus style={styles.plusIcon} /> Add New HCM
        </button>
      </div>

      <div style={styles.HcmGrid}>
        {Hcms.length > 0 ? (
          Hcms.map((Hcm, index) => (
            <div key={Hcm._id || index} style={styles.HcmCard}>
              <div style={styles.HcmCardUpperContainer}>
                <div style={styles.HcmDetails}>
                  <h3 style={styles.HcmNameUI}>{Hcm?.name}</h3>
                  <p style={styles.HcmSubNameUI}>{Hcm?.phoneNo}</p>
                  <p style={styles.HcmSubNameUI}>{Hcm.email}</p>
                </div>
                <div>
                  <img src={HcmImage} alt="Hcm" style={styles.HcmImg} />
                </div>
              </div>
              <div style={styles.HcmIconsContainer}>
                <CiCalendarDate style={styles.HcmIcon} />
                <IoIosMenu style={styles.HcmIcon} />
                <TbMessage style={styles.HcmIcon} />
                <IoDocumentTextOutline style={styles.HcmIcon} />
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noDataText}>No data available</p>
        )}
      </div>
    </div>
  );
}

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
    color: "#505254",
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

  addHcmBtn: {
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
  HcmGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    padding: "10px 10px 40px",
  },
  HcmCard: {
    boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: "0.5rem 1rem",
  },
  HcmDetails: {
    flex: "1",
    marginRight: "1rem",
  },
  HcmNameUI: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "rgba(0, 0, 0, 0.73)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
    cursor: "pointer",
  },

  HcmSubNameUI: {
    fontSize: "0.8rem",
    color: "rgba(0, 0, 0, 0.73)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
  },
  HcmImg: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "1rem",
    cursor: "pointer",
  },
  HcmCardUpperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HcmIconsContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  HcmIcon: {
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
