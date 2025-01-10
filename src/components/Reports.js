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
  });

  const dummyData = [
    { firstName: 'John', lastName: 'Doe', pmi: '12345', address: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345', designate: 'Yes' },
    { firstName: 'Jane', lastName: 'Smith', pmi: '67890', address: '456 Elm St', city: 'Othertown', state: 'NY', zip: '67890', designate: 'No' },
    // Add more dummy data as needed
  ];

  const handleCheckboxChange = (column) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const renderTableHeaders = () => {
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
  };

  const renderTableRows = () => {
    return dummyData.map((row, index) => (
      <tr key={index}>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <td>{row.pmi}</td>
        <td>{row.address}</td>
        <td>{row.city}</td>
        <td>{row.state}</td>
        <td>{row.zip}</td>
        <td>{row.designate}</td>
      </tr>
    ));
  };

  const downloadExcel = () => {
    const columnsToDownload = Object.values(selectedColumns).some((value) => value)
      ? selectedColumns
      : {
        firstName: true,
        lastName: true,
        pmi: true,
        address: true,
        city: true,
        state: true,
        zip: true,
        designate: true,
      };

    const filteredData = dummyData.map((row) => {
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');
    XLSX.writeFile(workbook, 'reports.xlsx');
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

          .download{
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
          <button onClick={downloadExcel} className="download mt-4 p-2 ">Download Excel</button>
        </div>
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