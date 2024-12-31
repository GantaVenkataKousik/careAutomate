import React, { useState } from "react";
import dummyImage from "../../images/tenant.jpg";
const PersonalDetailsForm = ({ editMode, setEditMode }) => {
  const [imageSrc, setImageSrc] = useState(dummyImage);

  const [formData, setFormData] = useState({
    firstName: "Surya",
    lastName: "Abothula",
    companyName: "CareAutomate",
    addressLine1: "73-10-5/3, Narayanapuram, Rajahmundry",
    addressLine2: "qwert",
    city: "Rajahmundry",
    state: "AP",
    zipCode: "533103",
    officePhoneNumber: "7989503377",
    cellPhoneNumber: "7989503377",
    primaryEmail: "surya.abothula@gmail.com",
    alternateEmail: "surya.abothula@gmail.com",
    federalTaxId: "1234567890",
    npiUmpi: "098765432",
    Taxonomy: "456789",
  });
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result); // Set the uploaded image as the src
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setEditMode((prev) => !prev);
  };

  const getInputProps = (name) => {
    return {
      className: !editMode
        ? "rounded-lg border-2 border-gray-400 text-[#6F84F8] mt-1 block w-full text-xl py-2 px-5"
        : "mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg",
      labelClassName: !editMode
        ? "block text-lg font-medium text-[#505254]"
        : "block text-lg font-medium text-[#6F84F8]",

      // divClassName: editMode ? "flex gap-4 mb-6" : "flex gap-4 mb-6",
      disabled: !editMode,
    };
  };

  const { inputClassName, labelClassName, disabled } = getInputProps();
  return (
    <form
      className="flex flex-col m-5 p-5 border-2 border-gray-350 rounded-xl "
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center my-6">
        <label htmlFor="imageUpload">
          <img
            src={imageSrc}
            alt="User"
            className="w-40 h-40 rounded-full cursor-pointer"
          />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageUpload(e)}
          disabled={disabled}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label
            htmlFor="firstName"
            className={`${getInputProps().labelClassName}`}
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your First Name"
            className={`${getInputProps().className}`}
            disabled={disabled}
            required
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="lastName"
            className={`${getInputProps().labelClassName}`}
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your Last Name"
            className={`${getInputProps().className}`}
            disabled={disabled}
            required
          />
        </div>
      </div>

      {/* Company Name */}
      <div className="mb-6 w-full">
        <label
          htmlFor="companyName"
          className={`${getInputProps().labelClassName}`}
        >
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter your Company Name"
          className={`${getInputProps().className}`}
          disabled={disabled}
          required
        />
      </div>

      {/* Office and Cell Phone Number */}
      <div className="flex gap-4 mb-6 mt-8">
        <div className="w-1/2">
          <label
            htmlFor="officePhoneNumber"
            className={`${getInputProps().labelClassName}`}
          >
            Office Phone Number
          </label>
          <input
            type="number"
            name="officePhoneNumber"
            value={formData.officePhoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Office Phone Number"
            className={`${getInputProps().className}`}
            disabled={disabled}
            required
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="cellPhoneNumber"
            className={`${getInputProps().labelClassName}`}
          >
            Cell Phone Number
          </label>
          <input
            type="tel"
            name="cellPhoneNumber"
            value={formData.cellPhoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Cell Phone Number"
            className={`${getInputProps().className}`}
            disabled={disabled}
            required
          />
        </div>
      </div>

      {/* Primary and Alternate Email */}
      <div className="flex gap-4 mb-6 mt-8">
        <div className="w-1/2">
          <label
            htmlFor="primaryEmail"
            className={`${getInputProps().labelClassName}`}
          >
            Primary Email Address
          </label>
          <input
            type="email"
            name="primaryEmail"
            value={formData.primaryEmail}
            onChange={handleInputChange}
            placeholder="Enter Primary Email"
            className={`${getInputProps().className}`}
            disabled={disabled}
            required
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="alternateEmail"
            className={`${getInputProps().labelClassName}`}
          >
            Alternate Email Address
          </label>
          <input
            type="email"
            name="alternateEmail"
            value={formData.alternateEmail}
            onChange={handleInputChange}
            placeholder="Enter Alternate Email"
            className={`${getInputProps().className}`}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label
              htmlFor="addressLine1"
              className={`${getInputProps().labelClassName}`}
            >
              Address Line 1
            </label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              disabled={disabled}
              placeholder="Enter Address Line 1"
              className={`${getInputProps().className}`}
              required
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="addressLine2"
              className={`${getInputProps().labelClassName}`}
            >
              Address Line 2
            </label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              disabled={disabled}
              placeholder="Enter Address Line 2"
              className={`${getInputProps().className}`}
            />
          </div>
        </div>

        {/* City and State */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/3">
            <label
              htmlFor="city"
              className={`${getInputProps().labelClassName}`}
            >
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter your City"
              className={`${getInputProps().className}`}
              disabled={disabled}
              required
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="state"
              className={`${getInputProps().labelClassName}`}
            >
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter your State"
              className={`${getInputProps().className}`}
              disabled={disabled}
              required
            />
          </div>
          {/* Zip Code */}
          <div className="w-1/3">
            <label
              htmlFor="zipCode"
              className={`${getInputProps().labelClassName}`}
            >
              Zip Code
            </label>
            <input
              type="number"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Enter your Zip Code"
              className={`${getInputProps().className}`}
              disabled={disabled}
              required
            />
          </div>
        </div>
      </div>

      {/* Federal Tax ID and NPI/UMPI */}
      <div className="flex gap-4 mb-6 mt-8">
        <div className="w-1/3">
          <label
            htmlFor="federalTaxId"
            className={`${getInputProps().labelClassName}`}
          >
            Federal Tax ID
          </label>
          <input
            type="text"
            name="federalTaxId"
            value={formData.federalTaxId}
            onChange={handleInputChange}
            placeholder="Enter Federal Tax ID"
            className={`${getInputProps().className}`}
            disabled={disabled}
          />
        </div>
        <div className="w-1/3">
          <label
            htmlFor="npiUmpi"
            className={`${getInputProps().labelClassName}`}
          >
            NPI/UMPI
          </label>
          <input
            type="text"
            name="npiUmpi"
            value={formData.npiUmpi}
            onChange={handleInputChange}
            placeholder="Enter NPI/UMPI"
            className={`${getInputProps().className}`}
            disabled={disabled}
          />
        </div>
        {/**Tax */}
        <div className="w-1/3">
          <label
            htmlFor="Taxonomy"
            className={`${getInputProps().labelClassName}`}
          >
            Taxonomy
          </label>
          <input
            type="text"
            name="Taxonomy"
            value={formData.Taxonomy}
            onChange={handleInputChange}
            placeholder="Enter your Taxonomy"
            className={`${getInputProps().className}`}
            disabled={disabled}
            required
          />
        </div>
      </div>

      {/* </div> */}

      {/**Buttons div */}
      {editMode && (
        <div className="flex items-center w-2/3 mt-8 ml-auto">
          <button
            className=" cursor-pointer   text-[#F57070] rounded-lg border-[#F57070] border-2 py-3 px-6 w-full mt-4 mb-9 mr-8 hover:bg-[#F57070] hover:text-white"
            onClick={() => setEditMode((prev) => !prev)}
          >
            Reset Changes
          </button>
          <button
            className=" cursor-pointer   text-[#6F84F8] rounded-lg border-[#6F84F8] border-2 py-3 px-6 w-full mt-4 mb-9 hover:bg-[#6F84F8] hover:text-white"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default PersonalDetailsForm;
