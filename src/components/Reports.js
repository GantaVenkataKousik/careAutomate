import React, { useState } from 'react';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Tenant');
  const [activeSubTab, setActiveSubTab] = useState('Personal Info');

  const renderTableHeaders = () => {
    switch (activeSubTab) {
      case 'Service Plan Info':
        return (
          <tr>
            <th><input type="checkbox" /> First Name</th>
            <th><input type="checkbox" /> Last Name</th>
            <th><input type="checkbox" /> PMI</th>
            <th><input type="checkbox" /> Address</th>
            <th><input type="checkbox" /> PMI</th>
            <th><input type="checkbox" /> Service Type</th>
            <th><input type="checkbox" /> Plan Start Date</th>
            <th><input type="checkbox" /> Plan End Date</th>
            <th><input type="checkbox" /> Scheduled Units (Hrs)</th>
            <th><input type="checkbox" /> Worked Units (Hrs)</th>
            <th><input type="checkbox" /> Billed Units (Hrs)</th>
            <th><input type="checkbox" /> Remaining Units (Hrs)</th>
          </tr>
        );
      case 'Compliance':
        return (
          <tr>
            <th><input type="checkbox" /> HCM Name</th>
            <th><input type="checkbox" /> Designated Tenants</th>
            <th><input type="checkbox" /> Service Plan Type</th>
            <th><input type="checkbox" /> Start Date</th>
            <th><input type="checkbox" /> End Date</th>
            <th><input type="checkbox" /> Visit Compliance</th>
          </tr>
        );
      default:
        return (
          <tr>
            <th><input type="checkbox" /> First Name</th>
            <th><input type="checkbox" /> Last Name</th>
            <th><input type="checkbox" /> PMI</th>
            <th><input type="checkbox" /> Address</th>
            <th><input type="checkbox" /> City</th>
            <th><input type="checkbox" /> State</th>
            <th><input type="checkbox" /> Zip</th>
            <th><input type="checkbox" /> Designate</th>
          </tr>
        );
    }
  };

  return (
    <div className="reports-container">
      <style>
        {`
          .reports-container {
            padding: 1rem;
            font-family: 'Poppins', sans-serif;
          }

          .tabs button, .sub-tabs button {
            margin-right: 1rem;
            padding: 0.5rem 1rem;
            border: none;
            cursor: pointer;
          }

          .tabs .active, .sub-tabs .active {
            border-bottom: 5px solid #6F84F8;
          }

          .reports-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
            overflow-x: scroll;
          }

          .reports-table th, .reports-table td {
            border: 1px solid #ddd;
            padding: 0.5rem;
            text-align: center;
            white-space: nowrap;
          }

          .reports-table th {
          font-weight:500;
          min-width:10vw;
          padding:1rem;
          }

          .reports-table th input[type="checkbox"] {
            margin-right: 0.5rem;
          }
        `}
      </style>
      <h1>Reports</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('Tenant')} className={activeTab === 'Tenant' ? 'active' : ''}>Tenant</button>
        <button onClick={() => setActiveTab('HCM')} className={activeTab === 'HCM' ? 'active' : ''}>HCM</button>
      </div>
      <div className="sub-tabs">
        <button onClick={() => setActiveSubTab('Personal Info')} className={activeSubTab === 'Personal Info' ? 'active' : ''}>Personal Info</button>
        <button onClick={() => setActiveSubTab('Service Plan Info')} className={activeSubTab === 'Service Plan Info' ? 'active' : ''}>Service Plan Info</button>
        <button onClick={() => setActiveSubTab('Financial')} className={activeSubTab === 'Financial' ? 'active' : ''}>Financial</button>
        <button onClick={() => setActiveSubTab('Compliance')} className={activeSubTab === 'Compliance' ? 'active' : ''}>Compliance</button>
      </div>
      <table className="reports-table">
        <thead>
          {renderTableHeaders()}
        </thead>
        <tbody>
          {/* Add your data rows here */}
        </tbody>
      </table>
    </div>
  );
}