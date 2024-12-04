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
                const response = await axios.post(API_ROUTES.HCM_UNITS_STATS, {
                    tenantId: tenantId,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setUnitsData(response.data);

                const transitionYears = Object.keys(response.data['Housing Transition'] || {});
                const sustainingYears = Object.keys(response.data['Housing Sustaining'] || {});
                const allYears = Array.from(new Set([...transitionYears, ...sustainingYears])).sort();

                // Generate random periods for each year
                const formattedPeriods = allYears.map(year => {
                    const startMonth = Math.floor(Math.random() * 6) + 1; // Start month between 1 and 6
                    const startDay = Math.floor(Math.random() * 28) + 1;
                    const endMonth = startMonth + 7; // End month 7 months later
                    const endDay = Math.floor(Math.random() * 28) + 1;
                    const startDate = new Date(year, startMonth - 1, startDay);
                    const endDate = new Date(year, endMonth - 1, endDay);

                    return {
                        period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
                        year
                    };
                });

                setYearOptions(formattedPeriods);
                if (formattedPeriods.length > 0) {
                    setSelectedYear(formattedPeriods[0].year);
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

    const renderPlanData = (planType) => {
        const data = unitsData[planType]?.[selectedYear];
        if (!data || data.message) {
            return <p style={styles.noServiceData}>No services have been done for this tenant.</p>;
        }

        return (
            <div id={`${planType}Grid`} style={styles.grid}>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Allotted</h3>
                    <p>Units <span style={styles.value}>{data.allottedUnits}</span></p>
                    <p>Hours <span style={styles.value}>{data.allottedHours}</span></p>
                </div>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Worked</h3>
                    <p>Units <span style={styles.value}>{data.workedUnits}</span></p>
                    <p>Hours <span style={styles.value}>{data.workedHours}</span></p>
                </div>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Remaining</h3>
                    <p>Units <span style={styles.value}>{data.remainingUnits}</span></p>
                    <p>Hours <span style={styles.value}>{data.remainingHours}</span></p>
                </div>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Scheduled</h3>
                    <p>Units <span style={styles.value}>{data.scheduledUnits}</span></p>
                    <p>Hours <span style={styles.value}>{data.scheduledHours}</span></p>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Plan Usage :</h2>
            <div style={styles.dateRange}>
                <label htmlFor="yearSelect">Select Year: </label>
                <select
                    id="yearSelect"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {yearOptions.map((option, index) => (
                        <option key={index} value={option.year}>{option.period}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p style={styles.loadingMessage}>Loading service information...</p>
            ) : (
                <>
                    <div style={styles.planHeader}>
                        <h3 style={styles.title}>Housing Transition</h3>
                        <div style={styles.actions}>
                            {selectedYear === new Date().getFullYear().toString() && (
                                <button style={styles.activePlanButton}>Active</button>
                            )}
                            {unitsData['Housing Transition']?.[selectedYear] && !unitsData['Housing Transition']?.[selectedYear].message && (
                                <button style={styles.downloadButton} onClick={() => handleDownloadClick('Housing Transition')}>
                                    <FaDownload /> Download
                                </button>
                            )}
                        </div>
                    </div>
                    {renderPlanData('Housing Transition')}

                    <div style={styles.planHeader}>
                        <h3 style={styles.title}>Housing Sustaining</h3>
                        <div style={styles.actions}>
                            {selectedYear === new Date().getFullYear().toString() && (
                                <button style={styles.activePlanButton}>Active</button>
                            )}
                            {unitsData['Housing Sustaining']?.[selectedYear] && !unitsData['Housing Sustaining']?.[selectedYear].message && (
                                <button style={styles.downloadButton} onClick={() => handleDownloadClick('Housing Sustaining')}>
                                    <FaDownload /> Download
                                </button>
                            )}
                        </div>
                    </div>
                    {renderPlanData('Housing Sustaining')}
                </>
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
    activePlanButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '8px 15px',
        borderRadius: '25px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
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