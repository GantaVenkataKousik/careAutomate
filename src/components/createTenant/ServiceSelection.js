import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import axios from 'axios';

const serviceOptions = [
  { value: 1, label: 'Housing Consultation', billRate: 174.22 },
  { value: 2, label: 'Housing Transition', billRate: 17.17 },
  { value: 3, label: 'Housing Sustaining', billRate: 17.17 },
  { value: 4, label: 'Moving Expenses', billRate: 3000 },
  { value: 5, label: 'RSC- TCM', billRate: 15.53 },
  { value: 6, label: 'Moving Home Minnesota', billRate: 16.63 },
];

const ServiceSelection = ({ tenantID }) => {
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);

  // Fetch existing services when component mounts
  useEffect(() => {
    const fetchServices = async () => {
      if (!tenantID) {
        console.error('Tenant ID is missing!');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing!');
          return;
        }

        const response = await axios.post(
          'https://careautomate-backend.vercel.app/tenant/get-services',
          { tenantId: tenantID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          setAllServices(response.data.services);
        } else {
          console.log(response.data.message || 'Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [tenantID]);

  const handleServiceSelect = (selectedOptions) => {
    const selectedServices = selectedOptions.map((option) => ({
      serviceType: option.label,
      startDate: '',
      endDate: '',
      units: '',
      billRate: option.billRate,
      document: '',
      uploadedFileName: '',
      status: 'active',
      reviewStatus: 'approved',
    }));
    setServices(selectedServices);
  };

  const handleFileUpload = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File is too large. Maximum size is 5MB');
        return;
      }

      try {
        const reader = new FileReader();
        reader.onload = () => {
          const updatedServices = [...services];
          updatedServices[index] = {
            ...updatedServices[index],
            document: reader.result, // Store as data URL
            uploadedFileName: file.name
          };
          setServices(updatedServices);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading file:', error);
        toast.error('Error processing file');
      }
    };
    input.click();
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    setServices(updatedServices);
  };

  const handleSubmit = async (index) => {
    try {
      const service = services[index];
      const token = localStorage.getItem('token');
      const formData = new FormData();

      // Add basic service data
      formData.append('tenantId', tenantID);
      formData.append('serviceType', service.serviceType);
      formData.append('startDate', service.startDate);
      formData.append('endDate', service.endDate);
      formData.append('units', service.units);
      formData.append('rate', service.billRate);
      formData.append('status', 'active');
      formData.append('reviewStatus', 'approved');

      // Handle file upload
      if (service.document && service.uploadedFileName) {
        // Convert base64 to File object
        const base64Response = await fetch(service.document);
        const blob = await base64Response.blob();
        const file = new File([blob], service.uploadedFileName, {
          type: blob.type || 'application/octet-stream'
        });
        formData.append('document', file);
      }

      const response = await axios.post(
        'https://careautomate-backend.vercel.app/tenant/assign-services-documents',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      if (response.data.success) {
        toast.success('Service assigned successfully');
        // Refresh services list
        const fetchResponse = await axios.post(
          'https://careautomate-backend.vercel.app/tenant/get-services',
          { tenantId: tenantID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (fetchResponse.data.success) {
          setAllServices(fetchResponse.data.services);
        }
      }

    } catch (error) {
      console.error('Error submitting service:', error);
      toast.error(error.response?.data?.message || 'Failed to assign service');
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
                <FaUpload className="mr-1 ml-4" />
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

            <div className="col-span-1 mt-4">
              <button
                onClick={() => handleSubmit(index)}
                className="bg-blue-500 text-white px-1 py-3 rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
