import { Modal } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EditHcmPopup = ({ open, setOpen, hcm }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    mailingAddress: "",
    homePhone: "",
    cellPhone: "",
    workPhone: "",
    extension: "",
    employmentTitle: "",
    hireDate: "",
    terminationDate: "",
    ssn: "",
    rateOfPay: "",
  });

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
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[66%] h-[90%] bg-white shadow-lg p-6 rounded-lg overflow-auto tenant-visits-scrollbar">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-gray-700">Edit HCM</h2>
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
        <form className="p-6 h-[90%] overflow-y-auto tenant-visits-scrollbar">
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border-t border-[rgba(80,82,84,0.5)]" />

          {/**Address Info */}
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border-t border-[rgba(80,82,84,0.5)]" />

          {/**Employement Deatils */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#555] mb-2 underline">
              Employment Information
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <div className="mb-[2px]">
                <label
                  htmlFor="employmentTitle"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Employment Title
                </label>
                <input
                  type="text"
                  name="employmentTitle"
                  value={formData.employmentTitle}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
                />
              </div>
              <div className="mb-[2px]">
                <label
                  htmlFor="hireDate"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Hire Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(formData.hireDate)}
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
                  htmlFor="terminationDate"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Termination Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(formData.terminationDate)}
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
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
                />
              </div>

              <div className="mb-[2px]">
                <label
                  htmlFor="rateOfPay"
                  className="block text-base text-[#6F84F8] mb-1 font-semibold"
                >
                  Rate of Pay
                </label>
                <input
                  type="text"
                  name="rateOfPay"
                  value={formData.rateOfPay}
                  onChange={handleChange}
                  className="w-4/5 px-2.5 py-1 border border-[#ddd] rounded-full text-base shadow-md  transition-colors duration-300 focus:border-[#6F84F8] focus:shadow-[0px_0px_4px_rgba(74,144,226,0.5)] outline-none"
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
              Update HCM
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditHcmPopup;
