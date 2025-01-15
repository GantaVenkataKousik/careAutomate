import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import HcmImage from "../images/tenant.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LiaFileInvoiceDollarSolid,
  LiaUserEditSolid,
  LiaTrashSolid,
} from "react-icons/lia";
import { MdOutlineEventAvailable } from "react-icons/md";
import { BiUserCheck } from "react-icons/bi";
import { TbMessage } from "react-icons/tb";
import { BASE_URL } from "../config";
import EditHcmPopup from "./hcmsPage/EditHcmPopup";
import HcmFilter from "./hcmsPage/HcmFilter";
import { BorderBottom, Padding } from "@mui/icons-material";

export default function Hcms() {
  const navigate = useNavigate();
  const [Hcms, setHcms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const [selectedHCM, setSelectedHCM] = useState(null); // Track selected tenant

  const handleEditClick = (hcm) => {
    setSelectedHCM(hcm); // Set selected hcm
    setOpenModal(true); // Open the modal
  };
  const handleAddHcmClick = () => {
    navigate("/hcms/createHcm");
  };

  const handleIconClick = (path) => {
    navigate(path);
  };
  const handleHcmClick = (hcmId, Hcm) => {
    if (!Hcm) {
      console.error("HCM not found for ID:", hcmId);
      return;
    }
    // console.log(hcmId, Hcm, Hcms);
    navigate("/hcms/hcmProfile", {
      state: { hcms: Hcm, hcmId: hcmId },
    });
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
          `${BASE_URL}/fetchAll/fetchAllHCMsTenants`,
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
  const filteredHcms = Hcms.filter(
    (hcm) =>
      hcm.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hcm.phoneNo?.includes(searchQuery) ||
      hcm.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log(filteredHcms);
  return (
    <div style={styles.container}>
      <h1 style={styles.header} className="text-2xl flex items-center gap-2">
        <span>Hcms</span>
        <span className="h-9 w-9 flex items-center justify-center rounded-full font-bold text-lg p-2 bg-[#6F84F8] text-white">
          {Hcms.length}
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

          <button style={styles.searchButton}>Search</button>
        </div>

        <button style={styles.addHcmBtn} onClick={handleAddHcmClick}>
          <FaPlus style={styles.plusIcon} /> Add New HCM
        </button>
      </div>

      <div style={styles.mainContainer}>
        <div style={styles.HcmGridContainer}>
          <div style={styles.HcmGrid}>
            {filteredHcms.length > 0 ? (
              filteredHcms.map((Hcm, index) => (
                <div key={Hcm._id || index} style={styles.HcmCard}>
                  {/* {console.log(index, Hcm)} */}

                  <div style={styles.HcmCardUpperContainer}>
                    <div style={styles.HcmDetails}>
                      <h3
                        style={styles.HcmNameUI}
                        onClick={() => handleHcmClick(Hcm?._id, Hcm.hcmData)}
                      >
                        {Hcm?.name}
                      </h3>
                      <p style={styles.HcmSubNameUI}>{Hcm?.phoneNo}</p>
                      <p style={styles.HcmSubNameUI}>{Hcm.email}</p>
                    </div>
                    <div>
                      <img
                        src={HcmImage}
                        alt="Hcm"
                        style={styles.HcmImg}
                        onClick={() => handleHcmClick(Hcm?._id, Hcm.hcmData)}
                      />
                    </div>
                  </div>

                  {/**Bottom Icons div */}
                  <div className="flex justify-between">
                    <div style={styles.HcmIconsContainer}>
                      <MdOutlineEventAvailable
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() => handleIconClick("/appointments")}
                      />
                      <BiUserCheck
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() => handleIconClick("/visits")}
                      />
                      <TbMessage
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() => handleIconClick("/communication")}
                      />
                      <LiaFileInvoiceDollarSolid
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() => handleIconClick("planUsage")}
                      />
                    </div>

                    {/**Right side icons */}
                    <div style={styles.HcmIconsContainer}>
                      <LiaUserEditSolid
                        className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#6F84F8] cursor-pointer"
                        onClick={() => handleEditClick(Hcm)}
                      />
                      <LiaTrashSolid className="text-[1.3rem] mr-2 text-gray-700 hover:text-[#F57070] cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noDataText}>No data available</p>
            )}
          </div>
        </div>

        <div style={styles.filterContainer} className="tenant-visits-scrollbar">
          <HcmFilter />
        </div>
      </div>

      {/**Edit HCM Modal */}
      <EditHcmPopup
        open={openModal} // Pass open state to EditTenant
        setOpen={setOpenModal} // Pass setOpen to control modal visibility
        hcm={selectedHCM} // Pass the selected tenant to EditTenant
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "10px",
    margin: "1rem",
    fontFamily: "Poppins",
  },
  header: {
    fontWeight: "bold",
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
  HcmGridContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    height: "100%",
  },
  HcmGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 280px))",
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
