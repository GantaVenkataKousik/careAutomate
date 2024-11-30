import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaCalendarAlt, FaBars, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import HcmImage from '../images/tenant.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { he } from 'date-fns/locale';

export default function Hcms() {
    const navigate = useNavigate();
    const [Hcms, setHcms] = useState([]);

    const handleAddHcmClick = () => {
        navigate('/hcms/createHcm');
    };

    const handleHcmNameClick = () => {
        navigate('/hcms/planUsage');
    };

    useEffect(() => {
        const fetchHcms = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
            try {
                const response = await axios.post(
                    'https://careautomate-backend.vercel.app/fetchAll/fetchAllHCMsTenants',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const HcmsData = response.data?.data?.hcm || [];
                setHcms(HcmsData);
            } catch (error) {
                console.error('Error fetching Hcms:', error.response?.data || error.message);
            }
        };

        fetchHcms();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>HCM</h1>
            <div style={styles.headerActions}>
                <div style={styles.searchBar}>
                    <FaSearch style={styles.searchIcon} />
                    <input type="text" placeholder="Search..." style={styles.searchInput} />
                </div>

                <button style={styles.addHcmBtn} onClick={handleAddHcmClick}>
                    <FaPlus style={styles.plusIcon} /> Add New HCM
                </button>
            </div>

            <div style={styles.HcmGrid}>
                {Hcms.length > 0 ? (
                    Hcms.map((Hcm, index) => (
                        <div key={Hcm._id || index} style={styles.HcmBox}>
                            <div style={styles.HcmInfo}>
                                <div style={styles.HcmImage} >
                                    <img src={HcmImage} alt="Hcm" style={styles.image} />
                                </div>
                                <div>
                                    <h3 style={styles.HcmName} >
                                        {Hcm?.name}
                                    </h3>
                                    <p style={styles.HcmDetail}>{Hcm?.phoneNo}</p>
                                    <p style={styles.HcmDetail}>{Hcm.email}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={styles.noDataText}>No data available</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        width: '1180px',
        height: '80vh',
        marginLeft: '250px',
    },
    header: {
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px',
    },
    headerActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '25px',
        backgroundColor: '#fff',
        padding: '5px 10px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        width: '350px',
        height: '45px',
    },
    searchIcon: {
        color: '#555',
        marginRight: '5px',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        width: '100%',
        fontSize: '16px',
    },
    addHcmBtn: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '8px 15px',
        borderRadius: '25px',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    plusIcon: {
        marginRight: '5px',
    },
    HcmGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
    },
    HcmBox: {
        width: '23rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '15px',
    },
    HcmInfo: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
    },
    HcmName: {
        fontSize: '1.25em',
        fontWeight: 'bold',
        color: '#333',
        cursor: 'pointer',
    },
    HcmDetail: {
        fontSize: '0.9em',
        color: '#666',
    },
    HcmIcons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    },
    HcmIcon: {
        fontSize: '1.2em',
        color: '#555',
        margin: '0 8px',
        cursor: 'pointer',
        transition: 'color 0.3s',
    },
    HcmImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginTop: '15px',
        cursor: 'pointer',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    noDataText: {
        textAlign: 'center',
        color: '#999',
        fontSize: '1.2em',
    },
};

