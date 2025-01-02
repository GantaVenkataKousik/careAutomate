import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountField } from "../../../redux/accountSetup/accountSetupAction";

const Step1 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.accountSetup);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAccountField(name, value)); // Dispatch action to update the field
  };

  return (
    <div className="mb-7">
      <h1 className="underline">Personal Details</h1>
      {/* First Name and Last Name */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label
            htmlFor="firstName"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your First Name"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            required
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="lastName"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your Last Name"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            required
          />
        </div>
      </div>
      {/* Company Name */}
      <div className="mb-6">
        <label
          htmlFor="companyName"
          className="block text-lg font-medium text-[#6F84F8]"
        >
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter your Company Name"
          className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          required
        />
      </div>
      {/* Address Line 1 and Address Line 2 */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label
            htmlFor="addressLine1"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Address Line 1
          </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            placeholder="Enter Address Line 1"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            required
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="addressLine2"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Address Line 2
          </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
            placeholder="Enter Address Line 2"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          />
        </div>
      </div>
      {/* City and State */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label
            htmlFor="city"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter your City"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            required
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="state"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Enter your State"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            required
          />
        </div>
      </div>
      {/* Zip Code */}
      <div className="mb-6">
        <label
          htmlFor="zipCode"
          className="block text-lg font-medium text-[#6F84F8]"
        >
          Zip Code
        </label>
        <input
          type="number"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          placeholder="Enter your Zip Code"
          className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          required
        />
      </div>
      {/* Office and Cell Phone Number */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label
            htmlFor="officePhoneNumber"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Office Phone Number
          </label>
          <input
            type="number"
            name="officePhoneNumber"
            value={formData.officePhoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Office Phone Number"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            required
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="cellPhoneNumber"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Cell Phone Number
          </label>
          <input
            type="tel"
            name="cellPhoneNumber"
            value={formData.cellPhoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Cell Phone Number"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            required
          />
        </div>
      </div>
      {/* Primary and Alternate Email */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label
            htmlFor="primaryEmail"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Primary Email Address
          </label>
          <input
            type="email"
            name="primaryEmail"
            value={formData.primaryEmail}
            onChange={handleInputChange}
            placeholder="Enter Primary Email"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            required
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="alternateEmail"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Alternate Email Address
          </label>
          <input
            type="email"
            name="alternateEmail"
            value={formData.alternateEmail}
            onChange={handleInputChange}
            placeholder="Enter Alternate Email"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          />
        </div>
      </div>
      {/* Federal Tax ID and NPI/UMPI */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label
            htmlFor="federalTaxId"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Federal Tax ID
          </label>
          <input
            type="text"
            name="federalTaxId"
            value={formData.federalTaxId}
            onChange={handleInputChange}
            placeholder="Enter Federal Tax ID"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="npiUmpi"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            NPI/UMPI
          </label>
          <input
            type="text"
            name="npiUmpi"
            value={formData.npiUmpi}
            onChange={handleInputChange}
            placeholder="Enter NPI/UMPI"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          />
        </div>
      </div>
      {/**Tax */}
      <div className="mb-6">
        <label
          htmlFor="Taxonomy"
          className="block text-lg font-medium text-[#6F84F8]"
        >
          Taxonomy
        </label>
        <input
          type="text"
          name="Taxonomy"
          value={formData.Taxonomy}
          onChange={handleInputChange}
          placeholder="Enter your Taxonomy"
          className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          required
        />
      </div>{" "}
    </div>
  );
};

export default Step1;
