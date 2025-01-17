import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Tenant');
  const [activeSubTab, setActiveSubTab] = useState('Personal Info');
  const [tenantSelectedColumns, setTenantSelectedColumns] = useState({
    firstName: false,
    lastName: false,
    pmi: false,
    address: false,
    city: false,
    state: false,
    zip: false,
    designate: false,
    tenantName: false,
    assignedHCMs: false,
    serviceTypes: false,
    scheduledUnits: false,
    visitedUnits: false,
    remainingUnits: false,
    statusOfClaim: false,
    serviceType: false,
    dateOfService: false,
    duration: false,
    billedUnits: false,
    billedAmount: false,
    receivedAmount: false,
    visitType: false,
    methodOfVisit: false,
    mileage: false,
  });
  const [hcmSelectedColumns, setHcmSelectedColumns] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    state: false,
    zip: false,
    hireDate: false,
    username: false,
    password: false,
  });

  const dummyData = {
    tenant: {
      personalInfo: [
        { firstName: 'John', lastName: 'Doe', pmi: '12345', address: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345', designate: 'Yes' },
        { firstName: 'Jane', lastName: 'Smith', pmi: '67890', address: '456 Elm St', city: 'Othertown', state: 'NY', zip: '67890', designate: 'No' },
      ],
      servicePlanInfo: [
        { tenantName: 'John Doe', assignedHCMs: 'HCM 1, HCM 2', serviceTypes: 'Type A (Jan 2023 - Dec 2023)', scheduledUnits: 100, visitedUnits: 80, remainingUnits: 20 },
        { tenantName: 'Jane Smith', assignedHCMs: 'HCM 3', serviceTypes: 'Type B (Feb 2023 - Nov 2023)', scheduledUnits: 120, visitedUnits: 90, remainingUnits: 30 },
      ],
      financial: [
        { statusOfClaim: 'Pending', tenantName: 'John Doe', assignedHCM: 'HCM 1', serviceType: 'Type A', dateOfService: '2023-01-01', duration: '2h', billedUnits: 10, billedAmount: 200, receivedAmount: 150 },
        { statusOfClaim: 'Approved', tenantName: 'Jane Smith', assignedHCM: 'HCM 3', serviceType: 'Type B', dateOfService: '2023-02-01', duration: '3h', billedUnits: 15, billedAmount: 300, receivedAmount: 250 },
      ],
      compliance: [
        { tenantName: 'John Doe', assignedHCM: 'HCM 1', serviceType: 'Type A', dateOfService: '2023-01-01', duration: '2h', visitType: 'In-person', methodOfVisit: 'Car', mileage: 10 },
        { tenantName: 'Jane Smith', assignedHCM: 'HCM 3', serviceType: 'Type B', dateOfService: '2023-02-01', duration: '3h', visitType: 'Remote', methodOfVisit: 'Online', mileage: 0 },
      ],
    },
    hcm: {
      personalInfoAdmin: [
        { firstName: 'John', lastName: 'Doe', address: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345', hireDate: '2023-01-01', username: 'johndoe', password: 'password123' },
        { firstName: 'Jane', lastName: 'Smith', address: '456 Elm St', city: 'Othertown', state: 'NY', zip: '67890', hireDate: '2023-02-01', username: 'janesmith', password: 'password456' },
      ],
    },
  };

  const handleCheckboxChange = (column, type) => {
    if (type === 'tenant') {
      setTenantSelectedColumns((prev) => ({
        ...prev,
        [column]: !prev[column],
      }));
    } else {
      setHcmSelectedColumns((prev) => ({
        ...prev,
        [column]: !prev[column],
      }));
    }
  };

  const renderTableHeaders = () => {
    if (activeTab === 'Tenant') {
      switch (activeSubTab) {
        case 'Personal Info':
          return (
            <tr>
              <th><input type="checkbox" checked={tenantSelectedColumns.firstName} onChange={() => handleCheckboxChange('firstName', 'tenant')} /> First Name</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.lastName} onChange={() => handleCheckboxChange('lastName', 'tenant')} /> Last Name</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.pmi} onChange={() => handleCheckboxChange('pmi', 'tenant')} /> PMI</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.address} onChange={() => handleCheckboxChange('address', 'tenant')} /> Address</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.city} onChange={() => handleCheckboxChange('city', 'tenant')} /> City</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.state} onChange={() => handleCheckboxChange('state', 'tenant')} /> State</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.zip} onChange={() => handleCheckboxChange('zip', 'tenant')} /> Zip</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.designate} onChange={() => handleCheckboxChange('designate', 'tenant')} /> Designate</th>
            </tr>
          );
        case 'Service Plan Info':
          return (
            <tr>
              <th><input type="checkbox" checked={tenantSelectedColumns.tenantName} onChange={() => handleCheckboxChange('tenantName', 'tenant')} /> Tenant Name</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.assignedHCMs} onChange={() => handleCheckboxChange('assignedHCMs', 'tenant')} /> Assigned HCM’s Names</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.serviceTypes} onChange={() => handleCheckboxChange('serviceTypes', 'tenant')} /> Service types (Date range of Service types)</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.scheduledUnits} onChange={() => handleCheckboxChange('scheduledUnits', 'tenant')} /> Scheduled units</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.visitedUnits} onChange={() => handleCheckboxChange('visitedUnits', 'tenant')} /> Visited units</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.remainingUnits} onChange={() => handleCheckboxChange('remainingUnits', 'tenant')} /> Remaining units</th>
            </tr>
          );
        case 'Financial':
          return (
            <tr>
              <th><input type="checkbox" checked={tenantSelectedColumns.statusOfClaim} onChange={() => handleCheckboxChange('statusOfClaim', 'tenant')} /> Status of Claim</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.tenantName} onChange={() => handleCheckboxChange('tenantName', 'tenant')} /> Tenant Name</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.assignedHCM} onChange={() => handleCheckboxChange('assignedHCM', 'tenant')} /> Assigned HCM</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.serviceType} onChange={() => handleCheckboxChange('serviceType', 'tenant')} /> Service type</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.dateOfService} onChange={() => handleCheckboxChange('dateOfService', 'tenant')} /> Date of Service</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.duration} onChange={() => handleCheckboxChange('duration', 'tenant')} /> Duration</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.billedUnits} onChange={() => handleCheckboxChange('billedUnits', 'tenant')} /> Billed Units</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.billedAmount} onChange={() => handleCheckboxChange('billedAmount', 'tenant')} /> Billed Amount</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.receivedAmount} onChange={() => handleCheckboxChange('receivedAmount', 'tenant')} /> Received Amount</th>
            </tr>
          );
        case 'Compliance':
          return (
            <tr>
              <th><input type="checkbox" checked={tenantSelectedColumns.tenantName} onChange={() => handleCheckboxChange('tenantName', 'tenant')} /> Tenant Name</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.assignedHCM} onChange={() => handleCheckboxChange('assignedHCM', 'tenant')} /> Assigned HCM</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.serviceType} onChange={() => handleCheckboxChange('serviceType', 'tenant')} /> Service Type</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.dateOfService} onChange={() => handleCheckboxChange('dateOfService', 'tenant')} /> Date of Service</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.duration} onChange={() => handleCheckboxChange('duration', 'tenant')} /> Duration</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.visitType} onChange={() => handleCheckboxChange('visitType', 'tenant')} /> Visit type</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.methodOfVisit} onChange={() => handleCheckboxChange('methodOfVisit', 'tenant')} /> Method of Visit</th>
              <th><input type="checkbox" checked={tenantSelectedColumns.mileage} onChange={() => handleCheckboxChange('mileage', 'tenant')} /> Mileage</th>
            </tr>
          );
        default:
          return null;
      }
    } else if (activeTab === 'HCM' && activeSubTab === 'Personal Info') {
      return (
        <tr>
          <th><input type="checkbox" checked={hcmSelectedColumns.firstName} onChange={() => handleCheckboxChange('firstName', 'hcm')} /> First Name</th>
          <th><input type="checkbox" checked={hcmSelectedColumns.lastName} onChange={() => handleCheckboxChange('lastName', 'hcm')} /> Last Name</th>
          <th><input type="checkbox" checked={hcmSelectedColumns.address} onChange={() => handleCheckboxChange('address', 'hcm')} /> Address</th>
          <th><input type="checkbox" checked={hcmSelectedColumns.city} onChange={() => handleCheckboxChange('city', 'hcm')} /> City</th>
          <th><input type="checkbox" checked={hcmSelectedColumns.state} onChange={() => handleCheckboxChange('state', 'hcm')} /> State</th>
          <th><input type="checkbox" checked={hcmSelectedColumns.zip} onChange={() => handleCheckboxChange('zip', 'hcm')} /> Zip</th>
          <th><input type="checkbox" checked={hcmSelectedColumns.hireDate} onChange={() => handleCheckboxChange('hireDate', 'hcm')} /> Hire Date</th>
          <th><input type="checkbox" checked={hcmSelectedColumns.username} onChange={() => handleCheckboxChange('username', 'hcm')} /> Username</th>
          <th><input type="checkbox" checked={hcmSelectedColumns.password} onChange={() => handleCheckboxChange('password', 'hcm')} /> Password</th>
        </tr>
      );
    }
    return null;
  };

  const renderTableRows = () => {
    const data = activeTab === 'Tenant'
      ? dummyData.tenant[activeSubTab.toLowerCase().replace(/ /g, '')]
      : dummyData.hcm.personalInfoAdmin;

    if (!data) {
      return null; // Return null or a message indicating no data
    }

    return data.map((row, index) => (
      <tr key={index}>
        {Object.keys(row).map((key) => (
          (activeTab === 'Tenant' ? tenantSelectedColumns[key] : hcmSelectedColumns[key]) && <td key={key}>{row[key]}</td>
        ))}
      </tr>
    ));
  };

  const downloadExcel = () => {
    const columnsToDownload = activeTab === 'Tenant'
      ? tenantSelectedColumns
      : hcmSelectedColumns;

    const filteredData = (activeTab === 'Tenant' ? dummyData.tenant[activeSubTab.toLowerCase().replace(/ /g, '')] : dummyData.hcm.personalInfoAdmin).map((row) => {
      const filteredRow = {};
      Object.keys(columnsToDownload).forEach((key) => {
        if (columnsToDownload[key]) {
          filteredRow[key] = row[key];
        }
      });
      return filteredRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${activeTab} Reports`);
    XLSX.writeFile(workbook, `${activeTab.toLowerCase()}_reports.xlsx`);
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
            font-weight: 500;
            min-width: 10vw;
            padding: 1rem;
          }

          .reports-table th input[type="checkbox"] {
            margin-right: 0.5rem;
          }

          .download {
            padding: 3rem;
            border: none;
            cursor: pointer;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
            border-radius: 1rem;
          }
        `}
      </style>
      <h1 style={styles.header} className="text-2xl flex items-center gap-2">
        <span>Reports</span>
      </h1>
      <div className="tabs">
        <div className="flex justify-between">
          <div>
            <button onClick={() => setActiveTab('Tenant')} className={activeTab === 'Tenant' ? 'active' : ''}>Tenant</button>
            <button onClick={() => setActiveTab('HCM')} className={activeTab === 'HCM' ? 'active' : ''}>HCM</button>
          </div>
          <button onClick={downloadExcel} className="download mt-4 p-2">Download Excel</button>
        </div>
      </div>
      {activeTab === 'Tenant' && (
        <div className="sub-tabs">
          <button onClick={() => setActiveSubTab('Personal Info')} className={activeSubTab === 'Personal Info' ? 'active' : ''}>Personal Info</button>
          <button onClick={() => setActiveSubTab('Service Plan Info')} className={activeSubTab === 'Service Plan Info' ? 'active' : ''}>Service Plan Info</button>
          <button onClick={() => setActiveSubTab('Financial')} className={activeSubTab === 'Financial' ? 'active' : ''}>Financial</button>
          <button onClick={() => setActiveSubTab('Compliance')} className={activeSubTab === 'Compliance' ? 'active' : ''}>Compliance</button>
        </div>
      )}
      {activeTab === 'HCM' && (
        <div className="sub-tabs">
          <button onClick={() => setActiveSubTab('Personal Info')} className={activeSubTab === 'Personal Info' ? 'active' : ''}>Personal Info</button>
        </div>
      )}
      <table className="reports-table">
        <thead>
          {renderTableHeaders()}
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  header: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
};