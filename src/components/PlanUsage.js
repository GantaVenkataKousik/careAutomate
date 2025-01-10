import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import Modal from "react-modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { API_ROUTES } from "../routes";
import { useLocation, useNavigate } from "react-router-dom";
import HcmImage from "../images/tenant.jpg";

Modal.setAppElement("#root");

export default function PlanUsage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tenantId } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitsData, setUnitsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [yearOptions, setYearOptions] = useState([]);
  const [currentPlanType, setCurrentPlanType] = useState("");

  const handleHcmClick = (hcmId, hcm) => {
    navigate("/hcms/hcmProfile", {
      state: { hcms: hcm, hcmId: hcmId },
    });
    console.log("HCM clicked:", hcmId);
  };

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
        console.log(data);
        const transitionPeriod = data.find(
          (item) => item.serviceType === "Housing Transition"
        )["period"]; // Directly accesses the first object
        const sustainingPeriod = data.find(
          (item) => item.serviceType === "Housing Sustaining"
        )?.period;

        console.log("Transition Period:", transitionPeriod);
        console.log("Sustaining Period:", sustainingPeriod);

        const periodsSet = new Set([transitionPeriod, sustainingPeriod]);

        const uniquePeriods = Array.from(periodsSet).map((period) => ({
          period,
        }));

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

  const hasPlanUsage = Object.keys(unitsData).length > 0;

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

  const renderPlanData = (planType, period) => {
    const data = unitsData[planType];
    console.log("het", data);
    if (!data) {
      return (
        <p style={styles.noServiceData}>
          No services have been done for this tenant.
        </p>
      );
    }

    return (
      <div>
        {/* Existing grid for plan data */}
        <div id={`${planType}Grid`} style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Total Units</h3>
            <p>
              Units <span style={styles.valueGreen}>{data.totalUnits}</span>
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Worked</h3>
            <p>
              Units <span style={styles.valueGreen}>{data.workedUnits}</span>
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Remaining</h3>
            <p>
              Units{" "}
              <span style={styles.valueYellow}>{data.unitsRemaining}</span>
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Scheduled</h3>
            <p>
              Units{" "}
              <span style={styles.valueOrange}>{data.scheduledUnits}</span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="flex items-center justify-center text-[#6F84F8] text-2xl font-bold">
            Assigned HCM's
          </h2>
          {/* Updated HCM Details Section */}
          {data.hcmDetails && data.hcmDetails.length > 0 && (
            <div style={styles.HcmGrid}>
              {data.hcmDetails.map((hcm, index) => (
                <div key={hcm.hcmId || index} style={styles.HcmCard}>
                  <div style={styles.HcmCardUpperContainer}>
                    <div style={styles.HcmDetails}>
                      <h3
                        style={styles.HcmNameUI}
                        onClick={() => handleHcmClick(hcm.hcmId, hcm)}
                      >
                        {`${hcm.hcmInfo?.personalInfo?.firstName} ${hcm.hcmInfo?.personalInfo?.lastName}`}
                      </h3>
                      <p style={styles.HcmSubNameUI}>
                        {hcm.hcmInfo?.contactInfo?.phoneNumber}
                      </p>
                      <p style={styles.HcmSubNameUI}>
                        {hcm.hcmInfo?.contactInfo?.email}
                      </p>
                    </div>
                    <div>
                      <img
                        src={HcmImage}
                        alt="Hcm"
                        style={styles.HcmImg}
                        // onClick={() => handleHcmClick(hcm.hcmId)}
                      />
                    </div>
                  </div>
                  {/* Additional HCM information */}
                  <div style={styles.HcmWorkInfo}>
                    <p style={styles.valueGreen}>
                      <span className="font-bold text-gray-600 mr-1">
                        Worked Hours:
                      </span>{" "}
                      {Number(hcm.workedHours.toFixed(4))}
                    </p>
                    <p style={styles.valueOrange}>
                      <span className="font-bold text-gray-600 mr-1">
                        Worked Units:
                      </span>{" "}
                      {hcm.workedUnits}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Plan Usage :</h2>
      {hasPlanUsage && (
        <div style={styles.dateRange}>
          <label htmlFor="yearSelect" style={styles.periodLabel}>
            Select Period:
          </label>
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

      {loading ? (
        <p style={styles.loadingMessage}>Loading service information...</p>
      ) : hasPlanUsage ? (
        <>
          <div style={styles.planHeader}>
            <h3 style={styles.title}>Housing Transition</h3>
            <div style={styles.actions}>
              <button
                style={styles.downloadButton}
                onClick={() => handleDownloadClick("Housing Transition")}
              >
                <FaDownload /> Download
              </button>
            </div>
          </div>
          {renderPlanData(0)}

          <div style={styles.planHeader}>
            <h3 style={styles.title}>Housing Sustaining</h3>
            <div style={styles.actions}>
              <button
                style={styles.downloadButton}
                onClick={() => handleDownloadClick("Housing Sustaining")}
              >
                <FaDownload /> Download
              </button>
            </div>
          </div>
          {renderPlanData(1)}
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
  container: {
    padding: "20px",
    fontFamily: "poppins",
    textAlign: "left",
  },
  title: {
    fontSize: "1.5em",
    color: "#4A4A4A",
  },
  dateRange: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
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
    marginBottom: "10px",
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
    fontSize: "1.2em",
    fontWeight: "600",
    color: "#6F84F8",
    marginBottom: "10px",
  },
  value: {
    fontWeight: "bold",
  },
  valueGreen: {
    color: "#4CAF50", // Green for positive values
  },
  valueRed: {
    color: "#F44336", // Red for negative values
  },
  valueOrange: {
    color: "#FF9800", // Orange for intermediate values
  },
  valueYellow: {
    color: "#FFC107", // Yellow for warning values
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
