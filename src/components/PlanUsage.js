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
    const [unitsData, setUnitsData] = useState({
        allottedUnits: 0,
        allottedHours: 0,
        workedUnits: 0,
        workedHours: 0,
        remainingUnits: 0,
        remainingHours: 0,
        workedHcms: []
    });
    const [noServiceData, setNoServiceData] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUnitsData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                setLoading(false);
                return;
            }

            try {
                console.log(tenantId);
                const response = await axios.post(API_ROUTES.HCM_UNITS_STATS, {
                    tenantId: tenantId,
                    serviceType: 'Housing Transition'
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data === 'Service tracking data not found') {
                    setNoServiceData(true);
                } else {
                    setUnitsData(response.data);
                    setNoServiceData(false);
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

    const handleDownloadClick = () => {
        setIsModalOpen(true);
    };

    const handleDownloadFormat = (format) => {
        const element = document.querySelector('#planUsageGrid');

        if (format === 'image') {
            html2canvas(element).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.setAttribute('download', 'plan_usage.png');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        } else if (format === 'pdf') {
            html2canvas(element).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
                pdf.save('plan_usage.pdf');
            });
        }

        setIsModalOpen(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Plan Usage :</h2>
            <div style={styles.dateRange}>
                <span>Housing Transition :</span>
                <input type="date" style={styles.dateInput} value="2023-01-01" readOnly />
                <span>to</span>
                <input type="date" style={styles.dateInput} value="2023-12-31" readOnly />
            </div>

            {loading ? (
                <p style={styles.loadingMessage}>Loading service information...</p>
            ) : noServiceData ? (
                <p style={styles.noServiceData}>No services have been done for this tenant.</p>
            ) : (
                <>
                    <div style={styles.actions}>
                        <FaDownload style={styles.icon} onClick={handleDownloadClick} />
                        <button style={styles.activePlanButton}>Active Plan</button>
                    </div>
                    <div id="planUsageGrid" style={styles.grid}>
                        <div style={styles.card}>
                            <h3 style={styles.cardTitle}>Allotted</h3>
                            <p>Units <span style={styles.value}>{unitsData.allottedUnits}</span></p>
                            <p>Hours <span style={styles.value}>{unitsData.allottedHours}</span></p>
                        </div>
                        <div style={styles.card}>
                            <h3 style={styles.cardTitle}>Worked</h3>
                            <p>Units <span style={styles.value}>{unitsData.workedUnits}</span></p>
                            <p>Hours <span style={styles.value}>{unitsData.workedHours}</span></p>
                        </div>
                        <div style={styles.card}>
                            <h3 style={styles.cardTitle}>Remaining</h3>
                            <p>Units <span style={styles.value}>{unitsData.remainingUnits}</span></p>
                            <p>Hours <span style={styles.value}>{unitsData.remainingHours}</span></p>
                        </div>
                    </div>
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
    dateInput: {
        margin: '0 10px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '20px',
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
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
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '100px',
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
