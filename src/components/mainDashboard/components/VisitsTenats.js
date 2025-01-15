import React, { useState, useEffect } from "react";
import VisitComplianceChart from "../Charts/VisitComplianceChart";
import { API_ROUTES } from "../../../routes";

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

        if (result.success) {
          const availableYears = Object.keys(result.response);
          setYears(availableYears);

          const data = result.response[year] || {};

          const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const direct = [];
          const indirect = [];
          const remote = [];

          allMonths.forEach(month => {
            const counts = data[month] || {};
            direct.push(counts.direct ?? 0);
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
        <VisitComplianceChart categories={categories} visitData={visitData} />
      )}
    </div>
  );
};

export default VisitsTenats;
