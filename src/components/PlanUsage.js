import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { API_ROUTES } from '../routes';
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

export default function PlanUsage() {
    const location = useLocation();
    const { tenantId } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unitsData, setUnitsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState('');
    const [yearOptions, setYearOptions] = useState([]);
    const [currentPlanType, setCurrentPlanType] = useState('');

    useEffect(() => {
        const fetchUnitsData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post(API_ROUTES.BILLING.PLAN_USAGE, {
                    tenantId: tenantId,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = response.data.response;
                setUnitsData(data);

                const transitionPeriod = data['Housing Transition'].period;
                const sustainingPeriod = data['Housing Sustaining'].period;

                const periodsSet = new Set([transitionPeriod, sustainingPeriod]);

                const uniquePeriods = Array.from(periodsSet).map(period => ({ period }));

                setYearOptions(uniquePeriods);
                if (uniquePeriods.length > 0) {
                    setSelectedYear(uniquePeriods[0].period);
                }
            } catch (error) {
                console.error('Error fetching units data:', error);
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
            console.error('Element not found for download');
            return;
        }

        html2canvas(element).then((canvas) => {
            if (format === 'image') {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.setAttribute('download', `${currentPlanType}_usage.png`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else if (format === 'pdf') {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
                pdf.save(`${currentPlanType}_usage.pdf`);
            }
        }).catch((error) => {
            console.error('Error generating download:', error);
        });
    };

    const renderPlanData = (planType, period) => {
        const data = unitsData[planType];
        if (!data) {
            return <p style={styles.noServiceData}>No services have been done for this tenant.</p>;
        }

        return (
            <div id={`${planType}Grid`} style={styles.grid}>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Total Units</h3>
                    <p>Units <span style={styles.value}>{data.totalUnits}</span></p>
                </div>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Worked</h3>
                    <p>Units <span style={styles.value}>{data.workedUnits}</span></p>
                </div>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Remaining</h3>
                    <p>Units <span style={styles.value}>{data.unitsRemaining}</span></p>
                </div>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Scheduled</h3>
                    <p>Units <span style={styles.value}>{data.scheduledUnits}</span></p>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Plan Usage :</h2>
            {hasPlanUsage && (
                <div style={styles.dateRange}>
                    <label htmlFor="yearSelect">Select Period: </label>
                    <select
                        id="yearSelect"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        {yearOptions.map((option, index) => (
                            <option key={index} value={option.period}>{option.period}</option>
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
                            <button style={styles.downloadButton} onClick={() => handleDownloadClick('Housing Transition')}>
                                <FaDownload /> Download
                            </button>
                        </div>
                    </div>
                    {renderPlanData('Housing Transition')}

                    <div style={styles.planHeader}>
                        <h3 style={styles.title}>Housing Sustaining</h3>
                        <div style={styles.actions}>
                            <button style={styles.downloadButton} onClick={() => handleDownloadClick('Housing Sustaining')}>
                                <FaDownload /> Download
                            </button>
                        </div>
                    </div>
                    {renderPlanData('Housing Sustaining')}
                </>
            ) : (
                <p style={styles.noServiceData}>No plan usage data available for this tenant.</p>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={modalStyles}
            >
                <h2>Select Download Format</h2>
                <div style={styles.buttonContainer}>
                    <button style={styles.downloadButton} onClick={() => handleDownloadFormat('image')}>Image</button>
                    <button style={styles.downloadButton} onClick={() => handleDownloadFormat('pdf')}>PDF</button>
                </div>
            </Modal>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'left',
    },
    title: {
        fontSize: '1.5em',
        color: '#4A4A4A',
    },
    dateRange: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    planHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    icon: {
        fontSize: '1.5em',
        marginRight: '10px',
        cursor: 'pointer',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        width: '200px',
        margin: '0.4rem',
    },
    cardTitle: {
        fontSize: '1.2em',
        color: '#333',
        marginBottom: '10px',
    },
    value: {
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    noServiceData: {
        color: 'red',
        fontSize: '1.2em',
        textAlign: 'center',
        marginTop: '20px',
    },
    loadingMessage: {
        color: '#333',
        fontSize: '1.2em',
        textAlign: 'center',
        marginTop: '20px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    },
    downloadButton: {
        color: '#000',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
};

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        textAlign: 'center',
    },
};