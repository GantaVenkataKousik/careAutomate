import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import Modal from "react-modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { API_ROUTES } from "../../routes";
import { useLocation } from "react-router-dom";
import RenderPlanData from "./RenderPlanData";

Modal.setAppElement("#root");

export default function PlanUsage() {
  const location = useLocation();
  const { tenantId } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitsData, setUnitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [yearOptions, setYearOptions] = useState([]);
  const [currentPlanType, setCurrentPlanType] = useState("");

  useEffect(() => {
    const fetchUnitsData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          API_ROUTES.BILLING.PLAN_USAGE,
          {
            tenantId: tenantId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.response;
        setUnitsData(data);

        // Get unique periods from all service types
        const uniquePeriods = Array.from(
          new Set(data.map((item) => item.period))
        ).map((period) => ({ period }));

        setYearOptions(uniquePeriods);
        if (uniquePeriods.length > 0) {
          setSelectedYear(uniquePeriods[0].period);
        }
      } catch (error) {
        console.error("Error fetching units data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tenantId) {
      fetchUnitsData();
    }
  }, [tenantId]);

  const hasPlanUsage = unitsData.length > 0;

  const handleDownloadClick = (planType) => {
    setCurrentPlanType(planType);
    setIsModalOpen(true);
  };

  const handleDownloadFormat = (format) => {
    const element = document.querySelector(`#${currentPlanType}Grid`);
    if (!element) {
      console.error("Element not found for download");
      return;
    }

    html2canvas(element)
      .then((canvas) => {
        if (format === "image") {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.setAttribute("download", `${currentPlanType}_usage.png`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (format === "pdf") {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
          pdf.save(`${currentPlanType}_usage.pdf`);
        }
      })
      .catch((error) => {
        console.error("Error generating download:", error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title} className="mb-[1rem]">
        {" "}
        Plan Usage :
      </h2>


      {loading ? (
        <p style={styles.loadingMessage}>Loading service information...</p>
      ) : hasPlanUsage ? (
        <>
          {unitsData.map((serviceData, index) => (
            <div key={index} style={styles.serviceSection}>
              <div style={styles.planHeader}>
                <div className="flex gap-5 items-center">
                  <h3 style={styles.title}>{serviceData.serviceType}</h3>
                  {hasPlanUsage && (
                    <div style={styles.dateRange}>
                      {/* <label htmlFor="yearSelect" style={styles.periodLabel}>
                        Select Period:
                      </label> */}
                      <select
                        id="yearSelect"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        style={styles.periodSelect}
                      >
                        {yearOptions.map((option, index) => (
                          <option
                            key={index}
                            value={option.period}
                            style={styles.periodOption}
                          >
                            {option.period}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div style={styles.actions}>
                  <button
                    style={styles.downloadButton}
                    onClick={() => handleDownloadClick(serviceData.serviceType)}
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
              <RenderPlanData
                planType={serviceData.serviceType}
                data={serviceData}
                styles={styles}
              />
            </div>
          ))}
        </>
      ) : (
        <p style={styles.noServiceData}>
          No plan usage data available for this tenant.
        </p>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
      >
        <h2>Select Download Format</h2>
        <div style={styles.buttonContainer}>
          <button
            style={styles.downloadButton}
            onClick={() => handleDownloadFormat("image")}
          >
            Image
          </button>
          <button
            style={styles.downloadButton}
            onClick={() => handleDownloadFormat("pdf")}
          >
            PDF
          </button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  serviceSection: {
    border: "1px solid #E0E0E0",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "32px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
  container: {
    padding: "20px",
    fontFamily: "poppins",
    textAlign: "left",
    // backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "1.5em",
    color: "#4A4A4A",
  },
  dateRange: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  periodLabel: {
    fontSize: "1.125rem", // text-lg equivalent
    marginRight: "0.5rem",
  },
  periodSelect: {
    padding: "4px 8px",
    outline: "none",
    border: "1px solid #6F84F8",
    color: "#6F84F8",
    borderRadius: "0.5rem",
    cursor: "pointer",
    backgroundColor: "white",
    // Add these properties to style the dropdown arrow
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236F84F8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1.2em 1.2em",
    paddingRight: "2.5rem",
  },
  planHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    borderBottom: "2px solid #6F84F8",
    paddingBottom: "10px",
    fontSize: "0.95em",
    fontWeight: "550",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "1.5em",
    marginRight: "10px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Indigo shadow
    padding: "20px",
    textAlign: "center",
    border: "1px solid #E0E0E0", // Light border
    margin: "0.4rem",
    transition: "transform 0.2s ease-in-out",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  cardTitle: {
    fontSize: "1.3em",
    fontWeight: "600",
    color: "#6F84F8",
    marginBottom: "10px",
  },
  value: {
    fontWeight: "bold",
  },
  valueGreen: {
    color: "#4CAF50",
    fontWeight: "550",
  },
  valueRed: {
    color: "#F44336",
    fontWeight: "550",
  },
  valueOrange: {
    color: "#FF9800",
    fontWeight: "550",
  },
  valueYellow: {
    color: "#FFC107",
    fontWeight: "550",
  },
  noServiceData: {
    color: "red",
    fontSize: "1.2em",
    textAlign: "center",
    marginTop: "20px",
  },
  loadingMessage: {
    color: "#333",
    fontSize: "1.2em",
    textAlign: "center",
    marginTop: "20px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  downloadButton: {
    color: "#000",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
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
  HcmWorkInfo: {
    marginTop: "10px",
    padding: "5px 0",
    borderTop: "1px solid #eee",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.73)",
  },
};

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    textAlign: "center",
  },
};
