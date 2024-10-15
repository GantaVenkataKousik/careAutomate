import React, { useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import Select from 'react-select';
import Modal from 'react-modal';

// Sample services data
const servicesData = [
  { id: 1, description: "Housing Consultation", billRate: 174.22, procedureCode: "T2024", modifier: "U8", unit: "Per Session" },
  { id: 2, description: "Housing Transition", billRate: 17.17, procedureCode: "H2015", modifier: "U8", unit: "15 minutes = 1 Unit" },
  { id: 3, description: "Housing Sustaining", billRate: 17.17, procedureCode: "H2015", modifier: "U8 TS", unit: "15 minutes = 1 Unit" },
  { id: 4, description: "Moving Expenses", billRate: 3000, procedureCode: "T2038", modifier: "U8", unit: "N/A" },
  { id: 5, description: "RSC- TCM", billRate: 15.53, procedureCode: "T1017", modifier: "", unit: "15 minutes = 1 Unit" },
  { id: 6, description: "Moving Home Minnesota", billRate: 16.63, procedureCode: "T1017", modifier: "U6", unit: "15 minutes = 1 Unit" },
];

// Define options for service types
const serviceOptions = servicesData.map(service => ({
  value: service.id,
  label: service.description,
  billRate: service.billRate
}));

// Utility function to calculate total days between two dates
const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end - start;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
};

// Main Service Selection Component
const ServiceSelection = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle multi-select dropdown for services
  const handleServiceSelect = (selectedOptions) => {
    const selectedServices = selectedOptions.map((option) => ({
      id: option.value,
      serviceType: option.label,
      startDate: '',
      endDate: '',
      units: '',
      billRate: option.billRate,
      uploadedFileName: '',
    }));
    setServices(selectedServices);
  };

  // Handler for file upload
  const handleFileUpload = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const fileName = file.name;
      const updatedServices = [...services];
      updatedServices[index].uploadedFileName = fileName;

      // Extract dates from the uploaded file name
      const { startDate, endDate } = extractDatesFromFileName(fileName);
      updatedServices[index].startDate = startDate;
      updatedServices[index].endDate = endDate;

      setServices(updatedServices);
    };
    input.click();
  };

  // Function to extract start and end dates from the file name
  const extractDatesFromFileName = (fileName) => {
    const datePattern = /(\d{4}-\d{2}-\d{2})/g; // Regex to match "YYYY-MM-DD" format
    const matches = fileName.match(datePattern);
    const startDate = matches && matches.length > 0 ? matches[0] : '';
    const endDate = matches && matches.length > 1 ? matches[1] : '';
    return { startDate, endDate };
  };

  // Handle input field changes
  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    setServices(updatedServices);
  };

  // Remove a service row
  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  // Open modal for summary table
  const openSummaryModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeSummaryModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="service-selection-section">
        {/* Multi-Select Dropdown for Services */}
        <div className="mb-6">
          <label>Select Services:</label>
          <Select
            isMulti
            name="services"
            options={serviceOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleServiceSelect}
          />
        </div>

        {/* Scrollable container for services */}
        <div className="service-container overflow-y-auto h-64">
          {services.map((service, index) => (
            <div key={service.id} className="grid grid-cols-12 gap-4 mb-10 mt-6">
              {/* File Upload with Icon */}
              <div className="col-span-3 flex items-center">
                <button onClick={() => handleFileUpload(index)} className="flex items-center text-blue-500 mt-2 ml-2">
                  <FaUpload className="mr-1 ml-4 " />
                  <p>{service.uploadedFileName || 'Upload File'}</p> {/* Display file name or default text */}
                </button>
              </div>

              {/* Service Start Date */}
              <div className="col-span-2">
                <label>Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={service.startDate}
                  onChange={(e) => handleServiceChange(index, e)}
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Service End Date */}
              <div className="col-span-2">
                <label>End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={service.endDate}
                  onChange={(e) => handleServiceChange(index, e)}
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Units */}
              <div className="col-span-2">
                <label>Units:</label>
                <input
                  type="number"
                  name="units"
                  placeholder="Units"
                  value={service.units}
                  onChange={(e) => handleServiceChange(index, e)}
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Bill Rate */}
              <div className="col-span-2">
                <label>Bill Rate:</label>
                <input
                  type="number"
                  name="billRate"
                  placeholder="Bill Rate"
                  value={service.billRate}
                  readOnly // Set as read-only since it's based on the selected service
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Remove Button */}
              <div className="col-span-1 flex items-center">
                <button onClick={() => removeService(index)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Next button to show the summary table in a popup */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={openSummaryModal}
            disabled={services.length === 0} // Disable if no services selected
          >
            Next
          </button>
        </div>

        {/* Modal for showing the summary table */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeSummaryModal}
          contentLabel="Service Summary"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxHeight: '80%',
              overflowY: 'auto',
            },
          }}
        >
          <h2 className="text-lg font-bold">Service Summary</h2>
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="p-2 border">Service Type</th>
                <th className="p-2 border">Start Date</th>
                <th className="p-2 border">End Date</th>
                <th className="p-2 border">Total Days</th>
                <th className="p-2 border">Total Bill Amount</th>
                <th className="p-2 border">Units</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                const totalDays = calculateTotalDays(service.startDate, service.endDate);
                const totalBill = totalDays * (service.billRate * (service.units || 0));
                return (
                  <tr key={service.id}>
                    <td className="p-2 border">{service.serviceType}</td>
                    <td className="p-2 border">{service.startDate}</td>
                    <td className="p-2 border">{service.endDate}</td>
                    <td className="p-2 border">{totalDays}</td>
                    <td className="p-2 border">${totalBill.toFixed(2)}</td>
                    <td className="p-2 border">{service.units}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <button onClick={closeSummaryModal} className="bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ServiceSelection;
