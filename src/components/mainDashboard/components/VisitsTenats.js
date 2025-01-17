import React, { useState, useEffect } from "react";
import VisitComplianceChart from "../Charts/VisitComplianceChart";
import { API_ROUTES } from "../../../routes";
import Modal from "react-modal";

Modal.setAppElement('#root');

const VisitsTenats = () => {
  const currentYear = new Date().getFullYear().toString();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState([]);
  const [visitData, setVisitData] = useState({
    direct: [],
    indirect: [],
    remote: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVisits, setSelectedVisits] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchVisitData = async () => {
      try {
        const response = await fetch(API_ROUTES.VISITS.COMPLIANCE, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setResult(result);
        if (result.success) {
          const availableYears = Object.keys(result.response.visitCounts);
          setYears(availableYears);

          const data = result.response.visitCounts[year] || {};

          const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const direct = [];
          const indirect = [];
          const remote = [];

          allMonths.forEach(month => {
            const counts = data[month] || {};
            direct.push(counts["in-person"] ?? 0);
            indirect.push(counts.indirect ?? 0);
            remote.push(counts.remote ?? 0);
          });

          setCategories(allMonths);
          setVisitData({ direct, indirect, remote });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching visit data:", error);
        setLoading(false);
      }
    };

    fetchVisitData();
  }, [year]);

  const handleBarClick = (method, month) => {
    const mappedMethod = method === "direct" ? "in-person" : method;

    if (
      result &&
      result.response &&
      result.response.visitDetails &&
      result.response.visitDetails[mappedMethod] &&
      result.response.visitDetails[mappedMethod][year] &&
      result.response.visitDetails[mappedMethod][year][month]
    ) {
      const visitDetails = result.response.visitDetails[mappedMethod][year][month];
      setSelectedVisits(visitDetails);
      setModalIsOpen(true);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center">
        <select onChange={(e) => setYear(e.target.value)} value={year}>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
      {!loading && (
        <VisitComplianceChart
          categories={categories}
          visitData={visitData}
          onBarClick={handleBarClick}
        />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Visit Details"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            maxWidth: '500px',
            width: '90%',
            zIndex: '10000',
          },
          overlay: {
            zIndex: '9999',
          },
        }}
      >
        <h2>Visit Details</h2>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
        <ul>
          {selectedVisits.map((visit) => (
            <li key={visit.visitId}>
              {visit.tenant.tenantName} - {visit.serviceType} on {visit.dateOfService}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default VisitsTenats;
