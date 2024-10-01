import React, { useState } from 'react';
import './Assign.css';
import Select from 'react-select';
import { FaEdit, FaSync, FaTimes, FaFolderOpen } from 'react-icons/fa';
import ServiceSelectionTable from './ServiceSelectionTable';


const FileUpload = ({ uploadedFileName, onFileChange }) => (
  <div className="mb-6 ml-5 flex items-center">
    <label className="flex items-center cursor-pointer">
      <FaFolderOpen style={{color:'#92A1F2'}} className="text-blue-500 mr-2 text-2xl" />
      <span style={{color:'#92A1F2'}}className="text-blue-500">{uploadedFileName || "Upload File"}</span>
      <input type="file" className="hidden" onChange={onFileChange} />
    </label>
  </div>
);

const HousingSection = ({ handleHousingTransitionChange, uploadedFileName, handleFileUpload }) => (
  <>
    <FileUpload uploadedFileName={uploadedFileName} onFileChange={handleFileUpload} />
    <div className="grid grid-cols-12 gap-4 mb-10 ml-6">
      <div className="col-span-3">
        <label>Plan Start Date:</label>
        <input type="date" name="planStartDate" onChange={handleHousingTransitionChange} className="border p-2 rounded w-full" />
      </div>
      <div className="col-span-3">
        <label>Plan End Date:</label>
        <input type="date" name="planEndDate" onChange={handleHousingTransitionChange} className="border p-2 rounded w-full" />
      </div>
      <div className="col-span-2">
        <label>Units:</label>
        <input type="number" name="units" placeholder="Units" onChange={handleHousingTransitionChange} className="border p-2 rounded w-full" />
      </div>
      <div className="col-span-2">
        <label>Bill Rate:</label>
        <input type="number" name="billRate" placeholder="Bill Rate" onChange={handleHousingTransitionChange} className="border p-2 rounded w-full" />
      </div>
      <div className="col-span-2 flex items-center">
        <FaEdit className="cursor-pointer text-blue-500" style={{ marginTop: '16px',color:'#92A1F2' }} />
        <FaSync className="cursor-pointer text-blue-500 ml-2" style={{ marginTop: '16px',color:'#92A1F2' }} />
      </div>
    </div>
    <div className="flex justify-center mt-4">
      <button style={{ backgroundColor: '#92A1F2',color:"white" }}className="rounded px-4 py-2">Visits</button>
      <button style={{ backgroundColor: '#92A1F2',color:"white" }}className="bg-gray-300 rounded px-4 py-2 ml-2">Plan Usage</button>
      <button style={{ backgroundColor: '#92A1F2',color:"white" }}className="bg-gray-300 rounded px-4 py-2 ml-2">Billing Information</button>
    </div>
    {/* <div className="flex justify-center mt-4">
  <button className="bg-gray-300 rounded px-4 py-2 flex-grow text-center">Visits</button>
  <button className="bg-gray-300 rounded px-4 py-2 ml-2 flex-grow text-center">Plan Usage</button>
  <button className="bg-gray-300 rounded px-4 py-2 ml-2 flex-grow text-center">Billing Information</button>
</div> */}
  </>
);




const PlanOfCareTable = () => {
  const housingTransitionData = [
    { id: 1, label: "Plan Of Shift" },
    { id: 2, label: "Showcasing" },
    { id: 3, label: "Housing" },
    
  ];

  const housingSustainingData = [
    { id: 1, label: "Record 1" },
    { id: 2, label: "Record 2" },
   
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8 border">
      <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr>
            <th className="px-4 py-4 border-b border-gray-300 text-center font-semibold">Housing Transition</th>
            <th className="px-4 py-4 border-b border-gray-300 text-center font-semibold">Housing Sustaining</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.max(housingTransitionData.length, housingSustainingData.length))].map((_, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {/* Housing Transition column */}
              <td className="px-4 py-4 text-center border-r border-gray-300">
                {housingTransitionData[index] ? (
                  <label className="flex items-start justify-start" style={{ width: '100%' }}>
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-2"
                    />
                    <span className="text-left" style={{ maxWidth: '150px', wordWrap: 'break-word' }}>
                      {housingTransitionData[index].label}
                    </span>
                  </label>
                ) : (
                  <span className="h-5"></span> // Placeholder for empty cells
                )}
              </td>

              {/* Housing Sustaining column */}
              <td className="px-4 py-4 text-center">
                {housingSustainingData[index] ? (
                  <label className="flex items-start justify-start" style={{ width: '100%' }}>
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-2"
                    />
                    <span className="text-left" style={{ maxWidth: '150px', wordWrap: 'break-word' }}>
                      {housingSustainingData[index].label}
                    </span>
                  </label>
                ) : (
                  <span className="h-5"></span> 
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


 
const AssignServicesSubStep = () => {
  const servicesOptions = ['Service 1', 'Service 2', 'Service 3', 'Service 4'];
  const hcmOptions = ['HCM 1', 'HCM 2', 'HCM 3', 'HCM 4'];
  const caregiversOptions = ['Caregiver 1', 'Caregiver 2', 'Caregiver 3', 'Caregiver 4'];
 

  const servicesOptionsFormatted = servicesOptions.map(service => ({ value: service, label: service }));
  const hcmOptionsFormatted = hcmOptions.map(hcm => ({ value: hcm, label: hcm }));
  const caregiversOptionsFormatted = caregiversOptions.map(caregiver => ({ value: caregiver, label: caregiver }));

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedHCM, setSelectedHCM] = useState([]);
  const [selectedCaregivers, setSelectedCaregivers] = useState([]);
  const [assignedCaregivers, setAssignedCaregivers] = useState([]);
  const [housingTransitionData, setHousingTransitionData] = useState({ planStartDate: '', planEndDate: '', units: '', billRate: '' });
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [activeLink, setActiveLink] = useState('ServicesAssigned');
  const [activeSection, setActiveSection] = useState('Select Services'); // Default to show "Select Services"

  const handleServiceSelection = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedServices(selectedValues);
  };

  const handleHCMSelection = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedHCM(selectedValues);
  };

  const handleCaregiverSelection = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedCaregivers(selectedValues);
  };

  const handleAssignCaregivers = (selectedOptions) => {
    const assignedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setAssignedCaregivers(assignedValues);
  };

  const handleHousingTransitionChange = (event) => {
    const { name, value } = event.target;
    setHousingTransitionData(prevData => ({ ...prevData, [name]: value }));
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const switchLink = (link) => {
    setActiveLink(link);
    if (link === 'ServicesAssigned') {
      setActiveSection('Select Services'); // Show "Select Services" when ServicesAssigned is clicked
    } else if (link === 'HCMSelection') {
      setActiveSection('Select Caregivers'); // Show "Select Caregivers" when HCM Selection is clicked
    } else {
      setActiveSection(null); // Reset active section for other links
    }
  };

  const switchSubLink = (sublink) => {
    if (sublink === 'Select Services & Assign HCM') {
      setActiveSection('Select Services'); // Show dropdowns for services and HCM
    } else if (sublink === 'Select & Assign Caregivers') {
      setActiveSection('Select Caregivers'); // Display "Select Caregivers" section when Caregivers link is clicked
    } else if (sublink === 'Housing Transition') {
      setActiveSection('Housing Transition');
    } else if (sublink === 'Services Selection') {
      setActiveSection('Select Services1'); 
    } else if (sublink === 'Plan of Care') {
      setActiveSection('Plan of Care'); 
    } else {
      setActiveSection(sublink); 
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      console.log("File selected:", file);
    }
  };

  // Function to handle toggling services selection
  const onServiceToggle = (service) => {
    setSelectedServices(prevSelected => ({
      ...prevSelected,
      [service]: !prevSelected[service] ? [service] : []
    }));
  };
  
  return (
    <div className="p-4">
      <h2 className="text-gray-500 font-bold mb-4 text-left">Assign Services</h2>
      <div className="mb-4 text-left">
        <h3 className="font-semibold">
        <span
            style={{color:'#92A1F2'}}
            className={`text-gray-500 cursor-pointer px-2 py-1 rounded transition-all duration-300 ease-in-out ${activeLink === 'ServicesAssigned' ? 'font-bold text-blue-500' : ''} mr-10 hover:bg-blue-100 hover:text-blue-500`}
            onClick={() => switchLink('ServicesAssigned')}
          >
            Services Assigned in Carepla
          </span>
          <span
          style={{color:'#92A1F2'}}
            className={`text-gray-500 cursor-pointer px-2 py-1 rounded transition-all duration-300 ease-in-out ${activeLink === 'HCMSelection' ? 'font-bold text-blue-500' : ''} ml-10 hover:bg-blue-100 hover:text-blue-500`}
            onClick={() => switchLink('HCMSelection')}
          >
            HCM Selection
          </span>
        </h3>

        {activeLink === 'ServicesAssigned' && (
          <ul className="flex space-x-4 list-none mt-8">
            {['Select Services & Assign HCM', 'Housing Transition', 'Housing Sustaining'].map(section => (
              <li key={section} className="cursor-pointer text-gray-500 px-3 py-2 rounded transition-all duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500"
              style={{color:'#92A1F2'}}
                onClick={() => switchSubLink(section)}>
                {section}
              </li>
            ))}
          </ul>
        )}

        {activeLink === 'HCMSelection' && (
          <ul className="flex space-x-4 list-none mt-8">
            {['Select & Assign Caregivers','Services Selection', 'Plan of Care'].map(sublink => (
              <li key={sublink} className="cursor-pointer text-gray-500 px-3 py-2 rounded transition-all duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500"
              style={{color:'#92A1F2'}}
                onClick={() => switchSubLink(sublink)}>
                {sublink}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Render the sections */}
      <div className="text-left mt-5">
        {activeSection === 'Select Services' && (
          <>
            <div className="grid grid-cols-12 gap-4 ml-4">
              <div className="col-span-6">
                <label>Select Services:</label>
                <Select
                  options={servicesOptionsFormatted}
                  isMulti
                  value={servicesOptionsFormatted.filter(service => selectedServices.includes(service.value))}
                  onChange={handleServiceSelection}
                />
              </div>
              <div className="col-span-6">
                <label>Select HCM:</label>
                <Select
                  options={hcmOptionsFormatted}
                  isMulti
                  value={hcmOptionsFormatted.filter(hcm => selectedHCM.includes(hcm.value))}
                  onChange={handleHCMSelection}
                />
              </div>
            </div>

           
          </>
        )}


               {activeSection === 'Select Caregivers' && (
        <div className="flex space-x-10 mb-4 ml-4">
          
          <Select
            isMulti
            options={caregiversOptionsFormatted}
            onChange={handleCaregiverSelection}
            className="mb-4"
            placeholder="Select caregivers..."
          />
         
          <Select
            isMulti
            options={caregiversOptionsFormatted.filter(option => selectedCaregivers.includes(option.value))}
            onChange={handleAssignCaregivers}
            className="mb-4"
            placeholder="Assign caregivers..."
            isDisabled={selectedCaregivers.length === 0}
          />
        </div>
      )}

        {activeSection === 'Housing Transition' && (
          <HousingSection
            handleHousingTransitionChange={handleHousingTransitionChange}
            uploadedFileName={uploadedFileName}
            handleFileUpload={handleFileUpload}
          />
        )}
          {activeSection === 'Housing Sustaining' && (
          <HousingSection
            handleHousingTransitionChange={handleHousingTransitionChange}
            uploadedFileName={uploadedFileName}
            handleFileUpload={handleFileUpload}
          />
        )}

        {activeSection === 'Select Services1' && (
          <>
           
            <ServiceSelectionTable
              services={servicesOptions}
              selectedServices={selectedServices}
              onServiceToggle={onServiceToggle}
            />
          </>
        )}
      {activeSection === 'Plan of Care' && (
          <div className="mt-6">
           
            <PlanOfCareTable />
          </div>
        )}
       
      </div>
    </div>
  );
};

export default AssignServicesSubStep;


