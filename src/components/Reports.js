import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { API_ROUTES } from '../routes';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Tenant');
  const [activeSubTab, setActiveSubTab] = useState('Personal Info');
  const [tenantPersonalInfo, setTenantPersonalInfo] = useState([]);
  const [serviceTrackingInfo, setServiceTrackingInfo] = useState([]);
  const [complianceInfo, setComplianceInfo] = useState([]);
  const [hcmPersonalInfo, setHcmPersonalInfo] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({
    firstName: true,
    lastName: true,
    pmi: true,
    city: true,
    state: true,
    zip: true,
    assignedHCMs: true,
    serviceType: true,
    dateRange: true,
    scheduledUnits: true,
    workedUnits: true,
    remainingUnits: true,
    assignedHCM: true,
    dateOfService: true,
    duration: true,
    visitType: true,
    methodOfVisit: true,
    mileage: true,
    address: true,
    hireDate: true,
    username: true,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTenantPersonalInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ROUTES.REPORTS.GET_TENANT_PERSONAL_INFO_REPORTS, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setTenantPersonalInfo(data.response);
        }
      } catch (error) {
        console.error('Error fetching tenant personal info:', error);
      }
    };

    const fetchServiceTrackingInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ROUTES.REPORTS.GET_TENANT_SERVICE_TRACKING_PLAN_REPORTS, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setServiceTrackingInfo(data.response);
        }
      } catch (error) {
        console.error('Error fetching service tracking info:', error);
      }
    };

    const fetchComplianceInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ROUTES.REPORTS.GET_TENANT_VISIT_COMPLIANCE_REPORTS, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setComplianceInfo(data.response);
        }
      } catch (error) {
        console.error('Error fetching compliance info:', error);
      }
    };

    const fetchHcmPersonalInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_ROUTES.REPORTS.GET_HCM_PERSONAL_INFO_REPORTS, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setHcmPersonalInfo(data.response);
        }
      } catch (error) {
        console.error('Error fetching HCM personal info:', error);
      }
    };

    fetchTenantPersonalInfo();
    fetchServiceTrackingInfo();
    fetchComplianceInfo();
    fetchHcmPersonalInfo();
  }, []);

  const handleCheckboxChange = (column) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const filteredTenantPersonalInfo = tenantPersonalInfo.filter((row) =>
    row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServiceTrackingInfo = serviceTrackingInfo.filter((row) =>
    row.tenantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredComplianceInfo = complianceInfo.filter((row) =>
    row.tenantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTableHeaders = () => {
    if (activeTab === 'Tenant') {
      if (activeSubTab === 'Personal Info') {
        return (
          <tr>
            <th><input type="checkbox" checked={selectedColumns.firstName} onChange={() => handleCheckboxChange('firstName')} /> First Name</th>
            <th><input type="checkbox" checked={selectedColumns.lastName} onChange={() => handleCheckboxChange('lastName')} /> Last Name</th>
            <th><input type="checkbox" checked={selectedColumns.pmi} onChange={() => handleCheckboxChange('pmi')} /> PMI</th>
            <th><input type="checkbox" checked={selectedColumns.city} onChange={() => handleCheckboxChange('city')} /> City</th>
            <th><input type="checkbox" checked={selectedColumns.state} onChange={() => handleCheckboxChange('state')} /> State</th>
            <th><input type="checkbox" checked={selectedColumns.zip} onChange={() => handleCheckboxChange('zip')} /> ZIP</th>
          </tr>
        );
      } else if (activeSubTab === 'Service Plan Info') {
        return (
          <tr>
            <th><input type="checkbox" checked={selectedColumns.tenantName} onChange={() => handleCheckboxChange('tenantName')} /> Tenant Name</th>
            <th><input type="checkbox" checked={selectedColumns.assignedHCMs} onChange={() => handleCheckboxChange('assignedHCMs')} /> Assigned HCMs</th>
            <th><input type="checkbox" checked={selectedColumns.serviceType} onChange={() => handleCheckboxChange('serviceType')} /> Service Type</th>
            <th><input type="checkbox" checked={selectedColumns.dateRange} onChange={() => handleCheckboxChange('dateRange')} /> Date Range</th>
            <th><input type="checkbox" checked={selectedColumns.scheduledUnits} onChange={() => handleCheckboxChange('scheduledUnits')} /> Scheduled Units</th>
            <th><input type="checkbox" checked={selectedColumns.workedUnits} onChange={() => handleCheckboxChange('workedUnits')} /> Worked Units</th>
            <th><input type="checkbox" checked={selectedColumns.remainingUnits} onChange={() => handleCheckboxChange('remainingUnits')} /> Remaining Units</th>
          </tr>
        );
      } else if (activeSubTab === 'Compliance') {
        return (
          <tr>
            <th><input type="checkbox" checked={selectedColumns.tenantName} onChange={() => handleCheckboxChange('tenantName')} /> Tenant Name</th>
            <th><input type="checkbox" checked={selectedColumns.assignedHCM} onChange={() => handleCheckboxChange('assignedHCM')} /> Assigned HCM</th>
            <th><input type="checkbox" checked={selectedColumns.serviceType} onChange={() => handleCheckboxChange('serviceType')} /> Service Type</th>
            <th><input type="checkbox" checked={selectedColumns.dateOfService} onChange={() => handleCheckboxChange('dateOfService')} /> Date of Service</th>
            <th><input type="checkbox" checked={selectedColumns.duration} onChange={() => handleCheckboxChange('duration')} /> Duration</th>
            <th><input type="checkbox" checked={selectedColumns.visitType} onChange={() => handleCheckboxChange('visitType')} /> Visit Type</th>
            <th><input type="checkbox" checked={selectedColumns.methodOfVisit} onChange={() => handleCheckboxChange('methodOfVisit')} /> Method of Visit</th>
            <th><input type="checkbox" checked={selectedColumns.mileage} onChange={() => handleCheckboxChange('mileage')} /> Mileage</th>
          </tr>
        );
      } else if (activeSubTab === 'Financial') {
        return (
          <tr>
            <th>Financial Data</th>
          </tr>
        );
      }
    } else if (activeTab === 'HCM') {
      return (
        <tr>
          <th><input type="checkbox" checked={selectedColumns.firstName} onChange={() => handleCheckboxChange('firstName')} /> First Name</th>
          <th><input type="checkbox" checked={selectedColumns.lastName} onChange={() => handleCheckboxChange('lastName')} /> Last Name</th>
          <th><input type="checkbox" checked={selectedColumns.address} onChange={() => handleCheckboxChange('address')} /> Address</th>
          <th><input type="checkbox" checked={selectedColumns.city} onChange={() => handleCheckboxChange('city')} /> City</th>
          <th><input type="checkbox" checked={selectedColumns.state} onChange={() => handleCheckboxChange('state')} /> State</th>
          <th><input type="checkbox" checked={selectedColumns.zip} onChange={() => handleCheckboxChange('zip')} /> ZIP</th>
          <th><input type="checkbox" checked={selectedColumns.hireDate} onChange={() => handleCheckboxChange('hireDate')} /> Hire Date</th>
          <th><input type="checkbox" checked={selectedColumns.username} onChange={() => handleCheckboxChange('username')} /> Username</th>
        </tr>
      );
    }
  };

  const renderTableRows = () => {
    if (activeTab === 'Tenant') {
      if (activeSubTab === 'Personal Info') {
        return filteredTenantPersonalInfo.map((row, index) => (
          <tr key={index}>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.pmi}</td>
            <td>{row.city}</td>
            <td>{row.state}</td>
            <td>{row.zip}</td>
          </tr>
        ));
      } else if (activeSubTab === 'Service Plan Info') {
        return filteredServiceTrackingInfo.map((row, index) => (
          <tr key={index}>
            <td>{row.tenantName}</td>
            <td style={{ width: '200px' }}>{row.assignedHCMs.map(hcm => hcm.hcmName).join(', ')}</td>
            <td style={{ width: '150px' }}>{row.serviceType}</td>
            <td style={{ width: '150px' }}>{row.dateRange}</td>
            <td>{row.scheduledUnits}</td>
            <td>{row.workedUnits}</td>
            <td>{row.remainingUnits}</td>
          </tr>
        ));
      } else if (activeSubTab === 'Compliance') {
        return filteredComplianceInfo.map((row, index) => (
          <tr key={index}>
            <td>{row.tenantName}</td>
            <td>{row.assignedHCM}</td>
            <td>{row.serviceType}</td>
            <td>{row.dateOfService}</td>
            <td>{row.duration}</td>
            <td style={{ width: '400px' }}>{row.visitType}</td>
            <td>{row.methodOfVisit}</td>
            <td>{row.mileage}</td>
          </tr>
        ));
      } else if (activeSubTab === 'Financial') {
        return (
          <tr>
            <td>Financial data is not available.</td>
          </tr>
        );
      }
    } else if (activeTab === 'HCM') {
      return hcmPersonalInfo.map((row, index) => (
        <tr key={index}>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>{row.address}</td>
          <td>{row.city}</td>
          <td>{row.state}</td>
          <td>{row.zip}</td>
          <td>{new Date(row.hireDate).toLocaleDateString()}</td>
          <td>{row.username}</td>
        </tr>
      ));
    }
  };

  const handleDownloadExcel = () => {
    const dataToExport = [];
    const today = new Date().toISOString().split('T')[0];
    let fileName = `${today}-${activeTab}-${activeSubTab}.xlsx`;

    if (activeTab === 'Tenant') {
      if (activeSubTab === 'Personal Info') {
        tenantPersonalInfo.forEach((row) => {
          const rowData = {};
          if (selectedColumns.firstName) rowData.FirstName = row.firstName;
          if (selectedColumns.lastName) rowData.LastName = row.lastName;
          if (selectedColumns.pmi) rowData.PMI = row.pmi;
          if (selectedColumns.city) rowData.City = row.city;
          if (selectedColumns.state) rowData.State = row.state;
          if (selectedColumns.zip) rowData.ZIP = row.zip;
          dataToExport.push(rowData);
        });
      } else if (activeSubTab === 'Service Plan Info') {
        serviceTrackingInfo.forEach((row) => {
          const rowData = {};
          if (selectedColumns.tenantName) rowData.TenantName = row.tenantName;
          if (selectedColumns.assignedHCMs) rowData.AssignedHCMs = row.assignedHCMs.map(hcm => hcm.hcmName).join(', ');
          if (selectedColumns.serviceType) rowData.ServiceType = row.serviceType;
          if (selectedColumns.dateRange) rowData.DateRange = row.dateRange;
          if (selectedColumns.scheduledUnits) rowData.ScheduledUnits = row.scheduledUnits;
          if (selectedColumns.workedUnits) rowData.WorkedUnits = row.workedUnits;
          if (selectedColumns.remainingUnits) rowData.RemainingUnits = row.remainingUnits;
          dataToExport.push(rowData);
        });
      } else if (activeSubTab === 'Compliance') {
        complianceInfo.forEach((row) => {
          const rowData = {};
          if (selectedColumns.tenantName) rowData.TenantName = row.tenantName;
          if (selectedColumns.assignedHCM) rowData.AssignedHCM = row.assignedHCM;
          if (selectedColumns.serviceType) rowData.ServiceType = row.serviceType;
          if (selectedColumns.dateOfService) rowData.DateOfService = row.dateOfService;
          if (selectedColumns.duration) rowData.Duration = row.duration;
          if (selectedColumns.visitType) rowData.VisitType = row.visitType;
          if (selectedColumns.methodOfVisit) rowData.MethodOfVisit = row.methodOfVisit;
          if (selectedColumns.mileage) rowData.Mileage = row.mileage;
          dataToExport.push(rowData);
        });
      }
    } else if (activeTab === 'HCM') {
      hcmPersonalInfo.forEach((row) => {
        const rowData = {};
        if (selectedColumns.firstName) rowData.FirstName = row.firstName;
        if (selectedColumns.lastName) rowData.LastName = row.lastName;
        if (selectedColumns.address) rowData.Address = row.address;
        if (selectedColumns.city) rowData.City = row.city;
        if (selectedColumns.state) rowData.State = row.state;
        if (selectedColumns.zip) rowData.ZIP = row.zip;
        if (selectedColumns.hireDate) rowData.HireDate = new Date(row.hireDate).toLocaleDateString();
        if (selectedColumns.username) rowData.Username = row.username;
        dataToExport.push(rowData);
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, fileName);
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
          button:focus {
            outline: none;
          }
        `}
      </style>
      <h1 style={styles.header} className="text-2xl flex items-center gap-2">
        <span>Reports</span>
      </h1>
      <div className="tabs">
        <div className="flex justify-between items-center">
          <div>
            <button onClick={() => setActiveTab('Tenant')} className={activeTab === 'Tenant' ? 'active' : ''}>Tenant</button>
            <button onClick={() => setActiveTab('HCM')} className={activeTab === 'HCM' ? 'active' : ''}>HCM</button>
          </div>

          <button className="download mt-4 p-2" onClick={handleDownloadExcel}>Download Excel</button>
        </div>
      </div>
      {activeTab === 'Tenant' && (
        <input
          type="text"
          placeholder="Search Tenant Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        />
      )}
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