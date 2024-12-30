import React, { useState, useEffect } from "react";
import { FaUpload, FaEdit } from "react-icons/fa";
import Select from "react-select";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  const services = useSelector((state) => state.tenant.services);

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
        isSaved: false,
      }));

    const updatedServices = services.filter((service) =>
      selectedOptions.some((option) => option.label === service.serviceType)
    );

    dispatch(setServices([...updatedServices, ...newServices]));
  };

  const handleFileUpload = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const updatedServices = [...services];
        updatedServices[index] = {
          ...updatedServices[index],
          document: reader.result,
          uploadedFileName: file.name,
        };
        dispatch(setServices(updatedServices));
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const clearFile = (index) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      document: "",
      uploadedFileName: "",
    };
    dispatch(setServices(updatedServices));
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    dispatch(setServices(updatedServices));
  };

  const handleDateChange = (index, name, date) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      [name]: date,
    };

    dispatch(setServices(updatedServices));
  };

  const handleDelete = (index) => {
    dispatch(removeService(index));
  };

  const handleEdit = (index) => {
    const updatedServices = [...services];

    updatedServices[index] = {
      ...updatedServices[index],
      isSaved: false,
    };

    dispatch(setServices(updatedServices));
  };

  const handleSubmit = (index) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      isSaved: true,
    };

    dispatch(setServices(updatedServices));
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
          value={services.map((service) => ({
            label: service.serviceType,
            value: service.serviceType,
          }))}
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
              <CustomDatePicker
                value={service.startDate}
                onChange={(date) => handleDateChange(index, "startDate", date)}
                className="border p-2 rounded w-full"
                placeholderText="MM-DD-YYYY"
                disabled={service.isSaved}
              />
            </div>

            <div className="col-span-2">
              <label>End Date:</label>
              <CustomDatePicker
                value={service.endDate}
                onChange={(date) => handleDateChange(index, "endDate", date)}
                className="border p-2 rounded w-full"
                placeholderText="MM-DD-YYYY"
                disabled={service.isSaved}
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
                disabled={service.isSaved}
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
                disabled={service.isSaved}
              />
            </div>

            <div className="col-span-1 mt-5 flex justify-center items-center">
              {!service.isSaved ? (
                <button
                  onClick={() => handleSubmit(index)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  disabled={!service.startDate || !service.endDate}
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

const CustomDatePicker = ({ value, onChange, disabled, placeholder }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjs(value)} // Ensure the value is a Dayjs object
        onChange={(date) => onChange(date?.format("YYYY-MM-DD"))} // Format the selected date as "YYYY-MM-DD"
        dateFormat="MM-DD-YYYY" // Set the display format for the date
        placeholder={placeholder || "MM-DD-YYYY"}
        disabled={disabled}
        sx={{
          width: "100%",
          "& input": {
            fontFamily: "Poppins",
            fontWeight: 500,
            height: "32px", // Adjust input height
            padding: "5px 10px", // Match padding inside the input field
          },
          "& .MuiInputBase-root": {
            height: "100%",
            // Ensure the input field takes up full height
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default ServiceSelection;
