import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import axios from 'axios';

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
  const [allServices, setAllServices] = useState([]);

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

  const handleServiceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    setServices(updatedServices);
  };

  const handleFileUpload = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File is too large. Maximum size is 5MB');
        return;
      }
  
      const updatedServices = [...services];
      updatedServices[index].uploadedFileName = file.name;
      updatedServices[index].document = file; // Directly store file as-is
      setServices(updatedServices);
    };
    input.click();
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
  
    // Append the file directly without conversion
    if (service.document) {
      formData.append('document', service.document);
    }
  
    try {
      const service = services[index];
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token is missing');
        return;
      }
  
      const response = await axios.post(
        'https://careautomate-backend.vercel.app/tenant/assign-services-documents',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Correct MIME type for file uploads
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
  
      const updatedServices = [...services];
      updatedServices[index].status = response.data.success ? 'active' : 'pending';
      updatedServices[index].reviewStatus = response.data.success ? 'approved' : 'pending';
  
      setServices(updatedServices);
  
      toast[response.data.success ? 'success' : 'error'](updatedResponses[index].message);
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

            <div className="col-span-1">
              <button onClick={() => handleSubmit(index)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
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
