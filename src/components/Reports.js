import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Tenant');
  const [activeSubTab, setActiveSubTab] = useState('Personal Info');
  const [selectedColumns, setSelectedColumns] = useState({
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
    hcmName: false,
    assignedTenants: false,
  });

  const dummyData = {
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
    hcm: [
      { hcmName: 'HCM 1', assignedTenants: 'Tenant A, Tenant B', serviceType: 'Type A', dateOfService: '2023-01-01', duration: '2h', visitType: 'In-person', methodOfVisit: 'Car', mileage: 10 },
      { hcmName: 'HCM 2', assignedTenants: 'Tenant C', serviceType: 'Type B', dateOfService: '2023-02-02', duration: '3h', visitType: 'Remote', methodOfVisit: 'Online', mileage: 0 },
    ],
  };

  const handleCheckboxChange = (column) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const renderTableHeaders = () => {
    if (activeTab === 'Tenant') {
      switch (activeSubTab) {
        case 'Personal Info':
          return (
            <tr>
              <th><input type="checkbox" checked={selectedColumns.firstName} onChange={() => handleCheckboxChange('firstName')} /> First Name</th>
              <th><input type="checkbox" checked={selectedColumns.lastName} onChange={() => handleCheckboxChange('lastName')} /> Last Name</th>
              <th><input type="checkbox" checked={selectedColumns.pmi} onChange={() => handleCheckboxChange('pmi')} /> PMI</th>
              <th><input type="checkbox" checked={selectedColumns.address} onChange={() => handleCheckboxChange('address')} /> Address</th>
              <th><input type="checkbox" checked={selectedColumns.city} onChange={() => handleCheckboxChange('city')} /> City</th>
              <th><input type="checkbox" checked={selectedColumns.state} onChange={() => handleCheckboxChange('state')} /> State</th>
              <th><input type="checkbox" checked={selectedColumns.zip} onChange={() => handleCheckboxChange('zip')} /> Zip</th>
              <th><input type="checkbox" checked={selectedColumns.designate} onChange={() => handleCheckboxChange('designate')} /> Designate</th>
            </tr>
          );
        case 'Service Plan Info':
          return (
            <tr>
              <th><input type="checkbox" checked={selectedColumns.tenantName} onChange={() => handleCheckboxChange('tenantName')} /> Tenant Name</th>
              <th><input type="checkbox" checked={selectedColumns.assignedHCMs} onChange={() => handleCheckboxChange('assignedHCMs')} /> Assigned HCM’s Names</th>
              <th><input type="checkbox" checked={selectedColumns.serviceTypes} onChange={() => handleCheckboxChange('serviceTypes')} /> Service types (Date range of Service types)</th>
              <th><input type="checkbox" checked={selectedColumns.scheduledUnits} onChange={() => handleCheckboxChange('scheduledUnits')} /> Scheduled units</th>
              <th><input type="checkbox" checked={selectedColumns.visitedUnits} onChange={() => handleCheckboxChange('visitedUnits')} /> Visited units</th>
              <th><input type="checkbox" checked={selectedColumns.remainingUnits} onChange={() => handleCheckboxChange('remainingUnits')} /> Remaining units</th>
            </tr>
          );
        case 'Financial':
          return (
            <tr>
              <th><input type="checkbox" checked={selectedColumns.statusOfClaim} onChange={() => handleCheckboxChange('statusOfClaim')} /> Status of Claim</th>
              <th><input type="checkbox" checked={selectedColumns.tenantName} onChange={() => handleCheckboxChange('tenantName')} /> Tenant Name</th>
              <th><input type="checkbox" checked={selectedColumns.assignedHCM} onChange={() => handleCheckboxChange('assignedHCM')} /> Assigned HCM</th>
              <th><input type="checkbox" checked={selectedColumns.serviceType} onChange={() => handleCheckboxChange('serviceType')} /> Service type</th>
              <th><input type="checkbox" checked={selectedColumns.dateOfService} onChange={() => handleCheckboxChange('dateOfService')} /> Date of Service</th>
              <th><input type="checkbox" checked={selectedColumns.duration} onChange={() => handleCheckboxChange('duration')} /> Duration</th>
              <th><input type="checkbox" checked={selectedColumns.billedUnits} onChange={() => handleCheckboxChange('billedUnits')} /> Billed Units</th>
              <th><input type="checkbox" checked={selectedColumns.billedAmount} onChange={() => handleCheckboxChange('billedAmount')} /> Billed Amount</th>
              <th><input type="checkbox" checked={selectedColumns.receivedAmount} onChange={() => handleCheckboxChange('receivedAmount')} /> Received Amount</th>
            </tr>
          );
        case 'Compliance':
          return (
            <tr>
              <th><input type="checkbox" checked={selectedColumns.tenantName} onChange={() => handleCheckboxChange('tenantName')} /> Tenant Name</th>
              <th><input type="checkbox" checked={selectedColumns.assignedHCM} onChange={() => handleCheckboxChange('assignedHCM')} /> Assigned HCM</th>
              <th><input type="checkbox" checked={selectedColumns.serviceType} onChange={() => handleCheckboxChange('serviceType')} /> Service Type</th>
              <th><input type="checkbox" checked={selectedColumns.dateOfService} onChange={() => handleCheckboxChange('dateOfService')} /> Date of Service</th>
              <th><input type="checkbox" checked={selectedColumns.duration} onChange={() => handleCheckboxChange('duration')} /> Duration</th>
              <th><input type="checkbox" checked={selectedColumns.visitType} onChange={() => handleCheckboxChange('visitType')} /> Visit type</th>
              <th><input type="checkbox" checked={selectedColumns.methodOfVisit} onChange={() => handleCheckboxChange('methodOfVisit')} /> Method of Visit</th>
              <th><input type="checkbox" checked={selectedColumns.mileage} onChange={() => handleCheckboxChange('mileage')} /> Mileage</th>
            </tr>
          );
        default:
          return null;
      }
    } else if (activeTab === 'HCM') {
      return (
        <tr>
          <th><input type="checkbox" checked={selectedColumns.hcmName} onChange={() => handleCheckboxChange('hcmName')} /> HCM Name</th>
          <th><input type="checkbox" checked={selectedColumns.assignedTenants} onChange={() => handleCheckboxChange('assignedTenants')} /> Assigned Tenants</th>
          <th><input type="checkbox" checked={selectedColumns.serviceType} onChange={() => handleCheckboxChange('serviceType')} /> Service Type</th>
          <th><input type="checkbox" checked={selectedColumns.dateOfService} onChange={() => handleCheckboxChange('dateOfService')} /> Date of Service</th>
          <th><input type="checkbox" checked={selectedColumns.duration} onChange={() => handleCheckboxChange('duration')} /> Duration</th>
          <th><input type="checkbox" checked={selectedColumns.visitType} onChange={() => handleCheckboxChange('visitType')} /> Visit Type</th>
          <th><input type="checkbox" checked={selectedColumns.methodOfVisit} onChange={() => handleCheckboxChange('methodOfVisit')} /> Method of Visit</th>
          <th><input type="checkbox" checked={selectedColumns.mileage} onChange={() => handleCheckboxChange('mileage')} /> Mileage</th>
        </tr>
      );
    }
  };

  const renderTableRows = () => {
    const data = activeTab === 'Tenant' ? dummyData[activeSubTab.toLowerCase().replace(/ /g, '')] : dummyData.hcm;

    // Check if data is defined and is an array
    if (!Array.isArray(data)) {
      return null; // or return an empty array or a message indicating no data
    }

    return data.map((row, index) => (
      <tr key={index}>
        {Object.keys(row).map((key) => (
          selectedColumns[key] && <td key={key}>{row[key]}</td>
        ))}
      </tr>
    ));
  };

  const downloadExcel = () => {
    const columnsToDownload = Object.values(selectedColumns).some((value) => value)
      ? selectedColumns
      : Object.keys(selectedColumns).reduce((acc, key) => ({ ...acc, [key]: true }), {});

    const filteredData = (activeTab === 'Tenant' ? dummyData[activeSubTab.toLowerCase().replace(/ /g, '')] : dummyData.hcm).map((row) => {
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