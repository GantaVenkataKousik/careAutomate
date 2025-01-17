import React, { useState, useEffect } from "react";
import TenantReassessmentChart from "../Charts/TenantReassessmentChart";
import { API_ROUTES } from "../../../routes";
import Modal from "react-modal";

Modal.setAppElement('#root');

const TenantReassessment = () => {
    const [dayCounts, setDayCounts] = useState({
        "5": 0,
        "15": 0,
        "30": 0,
        "60": 0,
        "90": 0,
    });
    const [reassessmentData, setReassessmentData] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedReassessments, setSelectedReassessments] = useState([]);

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
                setDayCounts(result.response.dayCounts);
                setReassessmentData(result.response.reassessmentData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reassessment data:", error);
                setLoading(false);
            }
        };

        fetchReassessmentData();
    }, []);

    const handleBarClick = (days) => {
        if (reassessmentData[days]) {
            setSelectedReassessments(reassessmentData[days]);
            setModalIsOpen(true);
        }
    };

    return (
        <div>
            {!loading && (
                <TenantReassessmentChart
                    dayCounts={dayCounts}
                    onBarClick={handleBarClick}
                />
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Reassessment Details"
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
                <h2>Reassessment Details</h2>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
                <ul>
                    {selectedReassessments.map((reassessment, index) => (
                        <li key={index}>
                            {reassessment.tenantName} - {reassessment.serviceType} from {reassessment.period}
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default TenantReassessment;