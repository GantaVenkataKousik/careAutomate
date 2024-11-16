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
  const [submitResponse, setSubmitResponse] = useState([]);
  const [allServices, setAllServices] = useState([]);

  // Fetch existing services when component mounts
  useEffect(() => {
    const fetchServices = async () => {
      if (!tenantID) {
        toast.error('Tenant ID is missing!');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token is missing!');
          return;
        }

        // Log tenantID for debugging
        console.log('Fetching services for tenantID:', tenantID);

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
          toast.error(response.data.message || 'Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Error fetching services.');
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
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // Max 5MB
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File is too large. Max size is 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result.split(',')[1]; // Extract base64 string
        const updatedServices = [...services];
        updatedServices[index].uploadedFileName = file.name;
        updatedServices[index].document = base64File; // Store base64 string as document
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

  const handleSubmit = async (index) => {
    if (!tenantID) {
      toast.error('Tenant ID is missing!');
      return;
    }

    const service = services[index];
    if (!service.startDate || !service.endDate || !service.units) {
      toast.error('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('tenantId', tenantID);
    formData.append('serviceType', service.serviceType);
    formData.append('startDate', service.startDate);
    formData.append('endDate', service.endDate);
    formData.append('units', service.units);
    formData.append('rate', service.billRate);
    formData.append('status', service.status); 
    formData.append('reviewStatus', service.reviewStatus);

    // Append document (if exists)
    if (service.document) {
      formData.append('document', service.document); // Base64 file content
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token is missing');
        return;
      }

      // Log request payload for debugging
      console.log('Submitting service with data:', formData);

      const response = await axios.post(
        'https://careautomate-backend.vercel.app/tenant/assign-services-documents',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedResponses = [...submitResponse];
      const successMessage = response.data.success
        ? 'Service created successfully'
        : 'Failed to create service';

      updatedResponses[index] = {
        success: response.data.success,
        message: response.data.message || successMessage,
      };

      setSubmitResponse(updatedResponses);

      // Update status and reviewStatus based on the response
      const updatedServices = [...services];
      updatedServices[index].status = response.data.success ? 'active' : 'pending';
      updatedServices[index].reviewStatus = response.data.success ? 'approved' : 'approved';

      setServices(updatedServices);

      toast[response.data.success ? 'success' : 'error'](updatedResponses[index].message);
    } catch (error) {
      console.error('Error during API call:', error);
      toast.error('Error submitting service. Please try again.');
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

              {submitResponse[index] && (
                <div className="mt-2">
                  <p className="text-sm">{`File: ${service.uploadedFileName}`}</p>
                  <p className={`text-sm ${submitResponse[index].success ? 'text-green-500' : 'text-red-500'}`}>
                    {submitResponse[index].message}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
