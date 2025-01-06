import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { mapTenantToFormData } from "../../utils/tenants/editFormFormat";
import { getChangedFields } from "../../utils/tenants/editFormFormatForAPI";
import { API_ROUTES } from "../../routes";
import { toast } from "react-toastify";

const EditTenant = ({ open, setOpen, tenant }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: null,
    maPMINumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    mailingSameAsAbove: false,
    mailingDifferent: false,
    phoneNumber: "",
    homePhone: "",
    cellPhone: "",
    raceAndEthnicity: "",
    emergencyFirstName: "",
    emergencyMiddleName: "",
    emergencyLastName: "",
    emergencyPhoneNumber: "",
    emergencyEmail: "",
    emergencyRelationship: "",
    insurance: "",
    insuranceNumber: "",
    ssn: "",
    intakeDate: null,
    letGoDate: null,
    diagnosisCode: "",
    caseManagerFirstName: "",
    caseManagerMiddleName: "",
    caseManagerLastName: "",
    caseManagerPhoneNumber: "",
    caseManagerEmail: "",
    responsiblePartyFirstName: "",
    responsiblePartyMiddleName: "",
    responsiblePartyLastName: "",
    responsiblePartyPhoneNumber: "",
    responsiblePartyEmail: "",
    responsiblePartyRelationship: "",
    userName: "",
    password: "",
    notes: [],
  });

  useEffect(() => {
    if (tenant) {
      setFormData(mapTenantToFormData(tenant));
    }
  }, [tenant]);

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const changedFields = getChangedFields(formData, tenant);
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.");
      }

      const response = await fetch(`${API_ROUTES.TENANTS.UPDATE_TENANT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(changedFields),
      });

      if (!response.ok) {
        throw new Error(`Failed to update tenant. Status: ${response.status}`);
      }

      //   const data = await response.json();
      toast.success("Tenant updated successfully!");
      //   console.log("Updated tenant data:", data);
      setOpen(false);
    } catch (err) {
      console.error("Error updating tenant:", err.message);
      toast.error(`Error updating tenant: ${err.message}`);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[66%] h-[90%] bg-white shadow-lg p-6 rounded-lg overflow-auto tenant-visits-scrollbar">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-gray-700">Edit Tenant</h2>
          {/* "X" Close Button */}
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/**Form */}
        <form
          className="p-6 h-[90%] overflow-y-auto tenant-visits-scrollbar"
          onSubmit={handleSubmit}
        >
          {/**Personal Information */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#555] mb-2 underline">
              Personal Information
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="mb-[2px]">
                <label
                  htmlFor="firstName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="middleName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="lastname"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="dob"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Date of Birth
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(formData.dob)} // Ensure the value is in the Dayjs format
                    onChange={handleDateChange} // Format the selected date as "YYYY-MM-DD"
                    dateFormat="MM-DD-YYYY" // Set the display format for the date
                    placeholder="MM-DD-YYYY"
                    sx={{
                      width: "75%",
                      "& input": {
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        height: "32px", // Adjust input height
                        padding: "5px 10px", // Match padding inside the input field
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="maPMINumber"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  MA PMI
                </label>
                <input
                  type="text"
                  name="maPMINumber"
                  value={formData.maPMINumber}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border-t border-[rgba(80,82,84,0.5)]" />

          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#555] mb-2 underline">
              Address Information
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="mb-[2px]">
                <label
                  htmlFor="addressLine1"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="addressLine2"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="city"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="state"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="ZipCode"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border-t border-[rgba(80,82,84,0.5)]" />

          {/*contact Information*/}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#555] mb-2 underline">
              Contact Information
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="mb-[2px]">
                <label
                  htmlFor="phoneNumber"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="email"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="homePhone"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Home Phone
                </label>
                <input
                  type="text"
                  name="homePhone"
                  value={formData.homePhone}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="cellPhone"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Cell Phone
                </label>
                <input
                  type="text"
                  name="cellPhone"
                  value={formData.cellPhone}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border-t border-[rgba(80,82,84,0.5)]" />

          {/*Emerygency contact Information*/}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#555] mb-2 underline">
              Emergency Contact Information
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="mb-[2px]">
                <label
                  htmlFor="emergencyFirstName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="emergencyFirstName"
                  value={formData.emergencyFirstName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="emergencyMiddleName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="emergencyMiddleName"
                  value={formData.emergencyMiddleName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="emergencyLastName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="emergencyLastName"
                  value={formData.emergencyLastName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="emergencyPhoneNumber"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="emergencyPhoneNumber"
                  value={formData.emergencyPhoneNumber}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="emergencyEmail"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="emergencyEmail"
                  value={formData.emergencyEmail}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="emergencyRelationship"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Relationship
                </label>
                <input
                  type="text"
                  name="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
            </div>
          </div>

          <hr class="my-8 border-t border-[rgba(80,82,84,0.5)]" />

          {/*Admission Information*/}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#555] mb-2 underline">
              Admission Information
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="mb-[2px]">
                <label
                  htmlFor="insurance"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Insurance
                </label>
                <select
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                >
                  <option value="" disabled>
                    Select Insurance
                  </option>
                  <option value="Medical Assistance">Medical Assistance</option>
                  <option value="Blue Plus">Blue Plus</option>
                  <option value="Health Partners">Health Partners</option>
                  <option value="Hennepin Health">Hennepin Health</option>
                  <option value="IMCare">IMCare</option>
                  <option value="Medica">Medica</option>
                </select>
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="insuranceNumber"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Insurance Number
                </label>
                <input
                  type="text"
                  name="insuranceNumber"
                  value={formData.insuranceNumber}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="ssn"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  SSN
                </label>
                <input
                  type="text"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="intakeDate"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Intake Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(formData.intakeDate)}
                    onChange={handleDateChange}
                    dateFormat="MM-DD-YYYY"
                    placeholder="MM-DD-YYYY"
                    sx={{
                      width: "75%",
                      "& input": {
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        height: "32px", // Adjust input height
                        padding: "5px 10px", // Match padding inside the input field
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="letGoDate"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Let Go Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(formData.letGoDate)}
                    onChange={handleDateChange}
                    dateFormat="MM-DD-YYYY"
                    placeholder="MM-DD-YYYY"
                    sx={{
                      width: "75%",
                      "& input": {
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        height: "32px", // Adjust input height
                        padding: "5px 10px", // Match padding inside the input field
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="letGoReason"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Let Go Reason
                </label>
                <input
                  type="text"
                  name="letGoReason"
                  value={formData.letGoReason}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="diagnosisCode"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Diagnosis Code
                </label>
                <input
                  type="text"
                  name="diagnosisCode"
                  value={formData.diagnosisCode}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border-t border-[rgba(80,82,84,0.5)]" />

          {/*Case Manager  Information*/}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#555] mb-2 underline">
              Case Manager Information
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="mb-[2px]">
                <label
                  htmlFor="firstName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="caseManagerFirstName"
                  value={formData.caseManagerFirstName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="middleName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="caseManagerMiddleName"
                  value={formData.caseManagerMiddleName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="lastName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="caseManagerLastName"
                  value={formData.caseManagerLastName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="phoneNumber"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="caseManagerPhoneNumber"
                  value={formData.caseManagerPhoneNumber}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="email"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="caseManagerEmail"
                  value={formData.caseManagerEmail}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border-t border-[rgba(80,82,84,0.5)]" />

          {/*Responsible party  Information*/}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#555] mb-2 underline">
              Responsible party Information
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="mb-[2px]">
                <label
                  htmlFor="responsiblePartyFirstName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="responsiblePartyFirstName"
                  value={formData.responsiblePartyFirstName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="responsiblePartyMiddleName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="responsiblePartyMiddleName"
                  value={formData.responsiblePartyMiddleName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="responsiblePartyLastName"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="responsiblePartyLastName"
                  value={formData.responsiblePartyLastName}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="responsiblePartyPhoneNumber"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="responsiblePartyPhoneNumber"
                  value={formData.responsiblePartyPhoneNumber}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="responsiblePartyEmail"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="responsiblePartyEmail"
                  value={formData.responsiblePartyEmail}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="responsiblePartyRelationship"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Relationship
                </label>
                <input
                  type="text"
                  name="responsiblePartyRelationship"
                  value={formData.responsiblePartyRelationship}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md transition-colors duration-300 focus:border-[#4A90E2] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)]"
                />
              </div>
            </div>
          </div>

          {/**Buttons */}
          <div className="flex gap-4 w-2/6 mt-6" style={{ marginLeft: "auto" }}>
            <button
              type="button"
              className="cursor-pointer text-[#F57070] rounded-full border-[#F57070] border-2 py-2  w-full mt-4 mb-9 mr-8 hover:bg-[#F57070] hover:text-white"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer text-[#6F84F8] rounded-full border-[#6F84F8] border-2 py-2 w-full mt-4 mb-9 hover:bg-[#6F84F8] hover:text-white"
            >
              Update Tenant
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditTenant;
