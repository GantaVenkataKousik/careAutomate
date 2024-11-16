import React, { useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import axios from 'axios';

// Sample services data
const servicesData = [
  { id: 1, description: "Housing Consultation", billRate: 174.22, procedureCode: "T2024", modifier: "U8", unit: "Per Session" },
  { id: 2, description: "Housing Transition", billRate: 17.17, procedureCode: "H2015", modifier: "U8", unit: "15 minutes = 1 Unit" },
  { id: 3, description: "Housing Sustaining", billRate: 17.17, procedureCode: "H2015", modifier: "U8 TS", unit: "15 minutes = 1 Unit" },
  { id: 4, description: "Moving Expenses", billRate: 3000, procedureCode: "T2038", modifier: "U8", unit: "N/A" },
  { id: 5, description: "RSC- TCM", billRate: 15.53, procedureCode: "T1017", modifier: "", unit: "15 minutes = 1 Unit" },
  { id: 6, description: "Moving Home Minnesota", billRate: 16.63, procedureCode: "T1017", modifier: "U6", unit: "15 minutes = 1 Unit" },
];

const serviceOptions = servicesData.map((service) => ({
  value: service.id,
  label: service.description,
  billRate: service.billRate,
}));

const ServiceSelection = ({ tenantID }) => {
  const [services, setServices] = useState([]);

  const handleServiceSelect = (selectedOptions) => {
    const selectedServices = selectedOptions.map((option) => ({
      serviceType: option.label,
      startDate: '',
      endDate: '',
      units: '',
      billRate: option.billRate,
      document: '', // Store the base64 string for file
    }));
    setServices(selectedServices);
  };

  const handleFileUpload = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (e) => {
      const file = e.target.files[0];

      // Limit the file size (e.g., 5MB max)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File is too large. Max size is 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result.split(',')[1]; // Extract the base64 string
        const updatedServices = [...services];
        updatedServices[index].uploadedFileName = file.name;
        updatedServices[index].document = base64File; // Store the base64 string as document
        setServices(updatedServices);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    setServices(updatedServices);
  };

  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleSubmit = async () => {
    if (!tenantID) {
      toast.error('Tenant ID is missing!');
      return;
    }

    // Validate if all required fields are filled
    if (services.some(service => !service.startDate || !service.endDate || !service.units)) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Prepare the payload with only the required fields
    const servicesPayload = services.map(service => ({
      serviceType: service.serviceType,
      startDate: service.startDate,
      endDate: service.endDate,
      units: service.units,
      rate: service.billRate,
      document: service.document || null,  // Store base64 or null
    }));

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token is missing');
        return;
      }

      // Sending the request with the required data
      const response = await axios.post(
        'https://careautomate-backend.vercel.app/tenant/assign-services-documents',
        { tenantId: tenantID, services: servicesPayload }, // Send only the required fields in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success or error response
      if (response.data.success) {
        toast.success('Services and documents created successfully');
      } else {
        toast.error(response.data.message || 'Failed to create services and documents');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      toast.error('Error submitting services. Please try again.');
    }
  };

  return (
    <div className="service-selection-section">
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

      <div className="service-container overflow-y-auto h-64">
        {services.map((service, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 mb-10 mt-6">
            <div className="col-span-3 flex items-center">
              <button onClick={() => handleFileUpload(index)} className="flex items-center text-blue-500 mt-2 ml-2">
                <FaUpload className="mr-1 ml-4 " />
                <p>{service.uploadedFileName || 'Upload File'}</p>
              </button>
            </div>

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

            <div className="col-span-2">
              <label>Bill Rate:</label>
              <input
                type="number"
                name="billRate"
                placeholder="Bill Rate"
                value={service.billRate}
                readOnly
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="col-span-1 flex items-center">
              <button onClick={() => removeService(index)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
