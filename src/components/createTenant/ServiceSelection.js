import React, { useState, useEffect } from "react";
import { FaUpload, FaEdit } from "react-icons/fa"; // Add FaEdit import
import Select from "react-select";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for react-datepicker
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  setServices,
  addService,
  updateService,
  removeService,
} from "../../redux/tenant/tenantSlice";

const serviceOptions = [
  { value: 1, label: "Housing Consultation", billRate: 174.22 },
  { value: 2, label: "Housing Transition", billRate: 17.17 },
  { value: 3, label: "Housing Sustaining", billRate: 17.17 },
  { value: 4, label: "Moving Expenses", billRate: 3000 },
];

const ServiceSelection = ({ tenantID }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.tenant.services); // Get services from Redux store

  // Handles selecting services from the dropdown
  const handleServiceSelect = (selectedOptions) => {
    const newServices = selectedOptions
      .filter((option) => {
        return !services.some(
          (service) => service.serviceType === option.label
        );
      })
      .map((option) => ({
        serviceType: option.label,
        startDate: "",
        endDate: "",
        units: 600,
        billRate: option.billRate,
        document: "",
        uploadedFileName: "",
        status: "active",
        reviewStatus: "approved",
        isSaved: false, // Newly added service is not saved yet
      }));

    const updatedServices = services.filter((service) =>
      selectedOptions.some((option) => option.label === service.serviceType)
    );

    dispatch(setServices([...updatedServices, ...newServices])); // Update the services in Redux store
  };

  // Handles file upload and updates the service data in Redux
  const handleFileUpload = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const updatedServices = [...services];
        updatedServices[index] = {
          ...updatedServices[index],
          document: reader.result, // Store as data URL
          uploadedFileName: file.name,
        };
        dispatch(setServices(updatedServices)); // Update the services in Redux
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // Handles removing the file data from the service
  const clearFile = (index) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      document: "", // Reset the document (file data)
      uploadedFileName: "", // Reset the uploaded file name
    };
    dispatch(setServices(updatedServices)); // Update the services in Redux
  };

  // Handles changes to the service data (e.g., dates or units)
  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    dispatch(setServices(updatedServices)); // Update the services in Redux
  };

  // Handles date changes for service start/end dates
  const handleDateChange = (index, name, date) => {
    const updatedServices = [...services]; // Create a copy of the services array
    updatedServices[index] = {
      ...updatedServices[index], // Spread the existing service object
      [name]: date, // Update the specific property (startDate or endDate)
    };

    dispatch(setServices(updatedServices)); // Update the services in Redux
  };

  // Handle service removal from Redux store
  const handleDelete = (index) => {
    dispatch(removeService(index)); // Remove service from Redux store
  };

  // Handle service editing by marking it as unsaved
  const handleEdit = (index) => {
    // Create a shallow copy of the services array
    const updatedServices = [...services];

    // Update the specific service object at the given index
    updatedServices[index] = {
      ...updatedServices[index], // Spread the existing service object
      isSaved: false, // Mark the service as not saved (so it can be edited)
    };

    // Dispatch the updated services array to Redux
    dispatch(setServices(updatedServices));
  };
  // Handle saving the service (Placeholder for actual save functionality)
  const handleSubmit = (index) => {
    const updatedServices = [...services]; // Create a copy of the services array
    updatedServices[index] = {
      ...updatedServices[index], // Spread the existing service object
      isSaved: true, // Set isSaved to true
    };

    dispatch(setServices(updatedServices)); // Dispatch the updated services array to Redux
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
              <button
                onClick={() => handleFileUpload(index)}
                className="flex items-center text-blue-500 mt-2 ml-2"
              >
                <FaUpload className="mr-1 ml-4" />
                <p>{service.uploadedFileName || "Upload File"}</p>
              </button>
              {service.uploadedFileName && (
                <button
                  onClick={() => clearFile(index)}
                  className="ml-2 mt-2 hover:scale-110 hover:text-red-700 transition-all duration-200"
                >
                  <RxCrossCircled
                    style={{
                      color: "red",
                      fontSize: "1.5rem",
                      marginLeft: "1rem",
                    }}
                  />
                </button>
              )}
            </div>

            <div className="col-span-2">
              <label>Start Date:</label>
              <DatePicker
                selected={service.startDate}
                onChange={(date) => handleDateChange(index, "startDate", date)}
                dateFormat="MM-dd-yyyy" // Format the date
                className="border p-2 rounded w-full"
                placeholderText="MM-DD-YYYY"
              />
            </div>

            <div className="col-span-2">
              <label>End Date:</label>
              <DatePicker
                selected={service.endDate}
                onChange={(date) => handleDateChange(index, "endDate", date)}
                dateFormat="MM-dd-yyyy" // Format the date
                className="border p-2 rounded w-full"
                placeholderText="MM-DD-YYYY"
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

            <div className="col-span-1 mt-5 flex justify-center items-center">
              {!service.isSaved ? (
                <button
                  onClick={() => handleSubmit(index)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-yellow-500 hover:scale-110 hover:text-yellow-700 transition-all duration-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 ml-2 hover:scale-110 hover:text-red-700 transition-all duration-200"
                  >
                    <RxCrossCircled />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
