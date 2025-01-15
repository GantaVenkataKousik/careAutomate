import React, { useState, useEffect } from "react";
import TenantReassessmentChart from "../Charts/TenantReassessmentChart";
import { API_ROUTES } from "../../../routes";

const TenantReassessment = () => {
    const [dayCounts, setDayCounts] = useState({
        "5": 0,
        "15": 0,
        "30": 0,
        "60": 0,
        "90": 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchReassessmentData = async () => {
            try {
                const response = await fetch(API_ROUTES.TENANTS.REASSESSMENTS, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                setDayCounts(result.response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reassessment data:", error);
                setLoading(false);
            }
        };

        fetchReassessmentData();
    }, []);

    return (
        <div>
            {!loading && <TenantReassessmentChart dayCounts={dayCounts} />}
        </div>
    );
};

export default TenantReassessment;