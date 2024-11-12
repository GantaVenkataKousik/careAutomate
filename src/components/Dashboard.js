
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMicrophone, FaDownload, FaEdit, FaBars, FaUser, FaCheck, FaTimes, FaCommentDots, FaBell, FaFileAlt } from 'react-icons/fa';
import '../styles/ProfilePage.css';
import tenant from "../images/tenant.jpg";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { FaUserTie } from 'react-icons/fa';
import { Document, Page } from 'react-pdf';
import samplePDF from '../assets/sample_document.pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProfilePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const openDocument = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const sampleRecords = [
    {
      id: 1,
      name: 'Robert John',
      date: '08-09-2024, 2:00 PM',
      description: "We'll meet tomorrow, also bring some additional documents...",
    },
    {
      id: 2,
      name: 'Alice Smith',
      date: '08-09-2024, 3:00 PM',
      description: "Discussion about project updates. Make sure to prepare the latest stats.",
    },
    {
      id: 3,
      name: 'Mark Brown',
      date: '08-10-2024, 1:00 PM',
      description: "Review meeting for the last quarter's performance and next steps.",
    },
    {
      id: 4,
      name: 'Sarah',
      date: '08-11-2024, 4:00 PM',
      description: "Catch-up on the progress of ongoing tasks, please bring your reports.",
    }
  ];

  const togglePopup = (description) => {
    setSelectedDescription(description);
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="profile-page">
      <div className="row first-row">
        <div className="col col-70">
          <div className="profile-header">
            <h2 className="title">Profile Details</h2>
            <div className="action-buttons">
              <button>Notes</button>
              <button>Eligibility</button>
              <button>This Year</button>
              <button aria-label="Download Profile">
                <FaDownload /> Download
              </button>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-image">
              <img src={tenant} alt="John Doe" className="circle-img" />
            </div>
            <div className="profile-info">
              <h1 className="profile-name"><strong>{user?.name}</strong></h1>
              <div className="contact-info" >
                <div className="labels-row" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <p><strong>Phone:</strong></p>
                    <p className="phone">{user?.mobileNo}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <p><strong>Email:</strong></p>
                    <p className="email">{user?.email}</p>
                  </div>

                </div>
              </div>
            </div>

            <div className="documents-box">

              <p className="doc-date">27 Oct 2024</p>
              <ul className="doc-list">
                <li>
                  <button onClick={openDocument}>tenant_krishna.pdf</button>
                  <ul>
                    <li><button onClick={openDocument}>tenant_street_group</button></li>
                    <li><button onClick={openDocument}>tenant_krishna.pdf</button></li>
                    <li><button onClick={openDocument}>tenant_krishna.pdf</button></li>
                    <li>
                      <button onClick={openDocument}>tenant_krishna.pdf</button>
                      <ul>
                        <li><button onClick={openDocument}>tenant_krishna.pdf</button></li>
                        <li><button onClick={openDocument}>tenant_krishna.pdf</button></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>

              {openModal && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <Document file={samplePDF}>
                      <Page pageNumber={1} />
                    </Document>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 30% Column */}
        <div className="col col-30">
          <div className='heading-viewmore'>
            <h2 className="title">Assigned HCMs</h2>
            <a href="/assign-hcm" className="view-more">View More</a>
          </div>

          <div className="hcm-list">
            {[...Array(4)].map((_, index) => (
              <div className="hcm-box" key={index}>
                <FaUserTie className="icon" />
                <p className='' style={{ marginRight: "55px" }}>Robert John</p>
                <PhoneInTalkIcon className="phn-icon" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Four columns layout */}
      <div className="row second-row">
        {/* Appointments */}
        <div className="col col-25 appointment-box">
          <div className='heading-viewmore'>
            <h2 className="title">Appointments</h2>
            <a href="/appointments" className="view-more">View More</a></div>
          <div className="view-more-container">
            <span style={{ float: 'left' }}>Today</span>
          </div>

          <div className="item-list">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="appointment-time">8:00 AM - 10:00 AM</div>
                <div className="item-box" style={{}}>
                  <div className="row item-header">
                    <div className="item-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <p>Robert John</p>
                      <div className="appointment-icons">
                        <FaMicrophone className="icon-small" aria-label="Microphone Icon" />
                        <FaUser className="icon-small" aria-label="User Icon" />
                        <PhoneInTalkIcon className="phn-icon" />
                      </div>
                    </div>
                  </div>
                  <div className="row item-footer" style={{ width: '100%', marginTop: '0px' }}>
                    <div className="check-housing" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <p style={{ margin: 0 }}>Check for Housing</p>
                      <div className="status-icons" style={{ display: 'flex', marginLeft: 'auto', marginRight: '12px', gap: '10px' }}>
                        <div className="icon-wrapper green">
                          <FaCheck className="icon-small" aria-label="Check Icon" />
                        </div>
                        <div className="icon-wrapper red">
                          <FaTimes className="icon-small" aria-label="Times Icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Visits */}
        <div className="col col-25 ">
          <div className='heading-viewmore'>
            <h2 className="title">Visits</h2>
            <a href="/calendar" className="view-more">View More</a>
          </div>
          <div className="view-more-container">
          </div>

          <div className="item-list" >
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="appointment-time">8:00 AM - 10:00 AM</div>
                <div className="item-box" style={{}}>
                  <div className="row item-header">
                    <div className="item-title">
                      <p>Robert John</p>
                      <div className="appointment-icons">
                        <FaMicrophone className="icon-small" aria-label="Microphone Icon" />
                        <FaUser className="icon-small" aria-label="User Icon" />
                        <FaFileAlt className="icon-small" aria-label="File Icon" />
                        <FaBars className="icon-small" aria-label="More Options Icon" />
                      </div>
                    </div>
                  </div>


                  <div className="row item-footer" style={{ width: '100%', marginTop: '0px' }}>
                    <div className="check-housing" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <p style={{ margin: 0 }}>Lease Agreement</p>
                      <div className="status-icons" style={{ display: 'flex', marginLeft: 'auto', gap: '5px' }}>
                      </div>
                      <a href="/sign-send" className="view-more blue-link" style={{ marginLeft: '0px' }}>Sign & Send</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="col col-25">
          <div className='heading-viewmore'>
            <h2 className="title">Communication</h2>
            <a href="/messages" className="view-more" onClick={togglePopup}>View More</a>
          </div>
          <div className="item-list">
            {sampleRecords.map((record) => (
              <div key={record.id} className="hcm-box1" style={{}}>
                <div className="row item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="item-title">
                    <p>{record.name}</p>
                    <span>{record.date}</span>
                  </div>
                </div>
                {/* Description in the second row */}
                <div className="row item-footer" style={{ marginTop: "-1px" }}>
                  <p className="description" onClick={() => togglePopup(record.description)}>
                    {record.description.length > 50 ? `${record.description.substring(0, 50)}...` : record.description}
                    <span className="view-more">View More</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content">
                <h3>Details</h3>
                <p>{selectedDescription}</p>
                <button onClick={togglePopup}>Close</button>
              </div>
            </div>
          )}
        </div>

        <div className="col bills-box" style={{ background: '#fff' }}>
          <div className='heading-viewmore'>
            <h2 className="title">Bills & Payments</h2>
            <a href="/BillingPaymnets" className="view-more">View More</a>
          </div>

          <div className="item-list">
            <span >This Month</span>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="item-box" style={{ width: "230px", }}>

                <div className="row item-header" style={{ marginBottom: '0px' }}>
                  <p className="item-title" style={{ margin: '0', color: '#6F84F8' }}>Robert John</p>
                </div>


                <div className="row item-details" style={{ display: 'flex', justifyContent: 'space-between', margin: '0' }}>
                  <p style={{ margin: '0' }}>10:00 AM</p>
                  <p style={{ margin: '0', color: 'green', marginRight: "50px" }}>$20</p>
                </div>


                <div className="" style={{ marginTop: '0' }}>
                  <p style={{ margin: '0' }}>Hourly Pay</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

