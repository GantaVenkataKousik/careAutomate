import { Modal } from "@mui/material";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { API_ROUTES } from "../../routes";

const SetupPop = ({ open, onClose, onSubmit }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [childAccount, setChildAccount] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    officePhoneNumber: "",
    cellPhoneNumber: "",
    primaryEmail: "",
    alternateEmail: "",
    federalTaxId: "",
    npiUmpi: "",
    Taxonomy: "",
    mnitsUserName: "",
    mnitsPassword: "",
    WaystarUserName: "",
    WaystarPassword: "",
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    // Child account fields
    childFirstName: "",
    childLastName: "",
    childAddressLine1: "",
    childAddressLine2: "",
    childCity: "",
    childState: "",
    childZipCode: "",
    childOfficePhoneNumber: "",
    childCellPhoneNumber: "",
    childUsername: "",
    childPassword: "",
    // Permissions
    billing: false,
    tenant: false,
    hcm: false,
    appointments: false,
    visit: false,
    communication: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBillingAddressCheckbox = (e) => {
    const checked = e.target.checked;
    setUseSameAddress(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        billingAddress: prev.addressLine1,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipCode: prev.zipCode,
      }));
    }
  };
  const formatFormData = (formData) => {
    const accountData = {
      firstName: formData.get("firstName") || "",
      lastName: formData.get("lastName") || "",
      companyName: formData.get("companyName") || "",
      address: {
        addressLine1: formData.get("addressLine1") || "",
        addressLine2: formData.get("addressLine2") || "",
        city: formData.get("city") || "",
        state: formData.get("state") || "",
        zipCode: formData.get("zipCode") || "",
      },
      contact: {
        officePhoneNumber: formData.get("officePhoneNumber") || "",
        cellPhoneNumber: formData.get("cellPhoneNumber") || "",
        primaryEmailAddress: formData.get("primaryEmail") || "",
        alternateEmailAddress: formData.get("alternateEmail") || "",
      },
      federalTaxId: formData.get("federalTaxId") || "",
      idnpiUmpi: formData.get("npiUmpi") || "",
      taxonomy: formData.get("Taxonomy") || "",
      mnitsLogin: {
        username: formData.get("mnitsUserName") || "",
        password: formData.get("mnitsPassword") || "",
      },
      waystarLogin: {
        username: formData.get("WaystarUserName") || "",
        password: formData.get("WaystarPassword") || "",
      },
      childAdminAccounts: childAccount
        ? [
          {
            firstName: formData.get("childFirstName") || "",
            lastName: formData.get("childLastName") || "",
            address: {
              addressLine1: formData.get("childAddressLine1") || "",
              addressLine2: formData.get("childAddressLine2") || "",
              city: formData.get("childCity") || "",
              state: formData.get("childState") || "",
              zipCode: formData.get("childZipCode") || "",
            },
            contact: {
              officePhoneNumber: formData.get("childOfficePhoneNumber") || "",
              cellPhoneNumber: formData.get("childCellPhoneNumber") || "",
            },
            username: formData.get("childUsername") || "",
            password: formData.get("childPassword") || "",
            permissions: {
              billing: formData.get("billing") === "on",
              tenant: formData.get("tenant") === "on",
              hcm: formData.get("hcm") === "on",
              appointments: formData.get("appointments") === "on",
              visit: formData.get("visit") === "on",
              communication: formData.get("communication") === "on",
            },
          },
        ]
        : [],
      bankingInfo: {
        nameOnCard: formData.get("nameOnCard") || "",
        cardNumber: formData.get("cardNumber") || "",
        expiryDate: formData.get("expiryDate") || "",
        billingAddress: {
          addressLine1:
            formData.get("billingAddressCheckBox") === "on"
              ? formData.get("addressLine1")
              : formData.get("address") || "",
          addressLine2:
            formData.get("billingAddressCheckBox") === "on"
              ? formData.get("addressLine2")
              : "",
          city: formData.get("billingCity") || formData.get("city") || "",
          state: formData.get("billingState") || formData.get("state") || "",
          zipCode:
            formData.get("billingZipCode") || formData.get("zipCode") || "",
        },
      },
    };
    return { accountData, adminId: userId };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formattedData = formatFormData(formData);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error(token);
      return; // Stop execution if no token
    }

    try {
      const response = await fetch(
        `${API_ROUTES.AUTH.BASE}/office-admin-account-setup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Account setup successful:", responseData);
      user.accountSetup = true;
      localStorage.setItem("user", JSON.stringify(user));
      onClose();
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="setup-modal">
      <div className="bg-white p-6 px-9 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-24">
        <h2 className="text-3xl font-bold mb-6" id="setup-modal">
          Complete Your Profile
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="h-[60vh] overflow-y-auto p-1 tenant-visits-scrollbar">
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
              </div>
            </div>

            <div className="mb-7">
              <h1 className="underline">MNITS Login Information</h1>
              {/**Username and password */}
              <div className="flex gap-4 mb-6">
                <div className="w-1/2">
                  <label
                    htmlFor="mnitsUserName"
                    className="block text-lg font-medium text-[#6F84F8]"
                  >
                    UserName
                  </label>
                  <input
                    type="text"
                    name="mnitsUserName"
                    value={formData.mnitsUserName}
                    onChange={handleInputChange}
                    placeholder="Enter Username"
                    className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="mnitsPassword"
                    className="block text-lg font-medium text-[#6F84F8]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="mnitsPassword"
                    value={formData.mnitsPassword}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="mb-7">
              <h1 className="underline">Waystar Login Information</h1>
              {/**Username and password */}
              <div className="flex gap-4 mb-6">
                <div className="w-1/2">
                  <label
                    htmlFor="WaystarUserName"
                    className="block text-lg font-medium text-[#6F84F8]"
                  >
                    UserName
                  </label>
                  <input
                    type="text"
                    name="WaystarUserName"
                    value={formData.WaystarUserName}
                    onChange={handleInputChange}
                    placeholder="Enter Username"
                    className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="WaystarPassword"
                    className="block text-lg font-medium text-[#6F84F8]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="WaystarPassword"
                    value={formData.WaystarPassword}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                  />
                </div>
              </div>
            </div>

            {/**Child Account */}
            <div className="mb-7">
              <div className="flex items-center w-full">
                <label
                  htmlFor="childAccount"
                  className="block text-lg font-medium text-[#6F84F8]"
                >
                  Would you like to add a child admin account?
                </label>
                <Switch
                  checked={childAccount}
                  onChange={() => setChildAccount(!childAccount)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>

              {childAccount && (
                <div>
                  {/**First and Last Name */}
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/2">
                      <label
                        htmlFor="childFirstName"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="childFirstName"
                        value={formData.childFirstName}
                        onChange={handleInputChange}
                        placeholder="Enter your First Name"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="childLastName"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="childLastName"
                        value={formData.childLastName}
                        onChange={handleInputChange}
                        placeholder="Enter your Last Name"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      />
                    </div>
                  </div>

                  {/* Address Line 1 and Address Line 2 */}
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/2">
                      <label
                        htmlFor="childAddressLine1"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="childAddressLine1"
                        value={formData.childAddressLine1}
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 1"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="childAddressLine2"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="childAddressLine2"
                        value={formData.childAddressLine2}
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
                        htmlFor="childCity"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="childCity"
                        value={formData.childCity}
                        onChange={handleInputChange}
                        placeholder="Enter your City"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="childState"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        name="childState"
                        value={formData.childState}
                        onChange={handleInputChange}
                        placeholder="Enter your State"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      />
                    </div>
                  </div>

                  {/* Zip Code */}
                  <div className="mb-6">
                    <label
                      htmlFor="childZipCode"
                      className="block text-lg font-medium text-[#6F84F8]"
                    >
                      Zip Code
                    </label>
                    <input
                      type="number"
                      name="childZipCode"
                      value={formData.childZipCode}
                      onChange={handleInputChange}
                      placeholder="Enter your Zip Code"
                      className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                    />
                  </div>

                  {/* Office and Cell Phone Number */}
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/2">
                      <label
                        htmlFor="childOfficePhoneNumber"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        Office Phone Number
                      </label>
                      <input
                        type="number"
                        name="childOfficePhoneNumber"
                        value={formData.childOfficePhoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Office Phone Number"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="childCellPhoneNumber"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        Cell Phone Number
                      </label>
                      <input
                        type="tel"
                        name="childCellPhoneNumber"
                        value={formData.childCellPhoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Cell Phone Number"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      />
                    </div>
                  </div>

                  {/* Username and password */}
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/2">
                      <label
                        htmlFor="childUsername"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        Username
                      </label>
                      <input
                        type="email"
                        name="childUsername"
                        value={formData.childUsername}
                        onChange={handleInputChange}
                        placeholder="Enter Username"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="childPassword"
                        className="block text-lg font-medium text-[#6F84F8]"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="childPassword"
                        value={formData.childPassword}
                        onChange={handleInputChange}
                        placeholder="Enter Password"
                        className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="permissions"
                      className="block text-lg font-medium text-[#6F84F8]"
                    >
                      Permissions
                    </label>

                    <input
                      type="checkbox"
                      id="billing"
                      name="billing"
                      checked={formData.billing}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="billing">Billing Administration</label>
                    <br />

                    <input
                      type="checkbox"
                      id="tenant"
                      name="tenant"
                      checked={formData.tenant}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="tenant">Tenant Administration</label>
                    <br />

                    <input
                      type="checkbox"
                      id="hcm"
                      name="hcm"
                      checked={formData.hcm}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="hcm">HCM Administration</label>
                    <br />

                    <input
                      type="checkbox"
                      id="appointments"
                      name="appointments"
                      checked={formData.appointments}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="appointments">
                      Appointments Administration
                    </label>
                    <br />

                    <input
                      type="checkbox"
                      id="visit"
                      name="visit"
                      checked={formData.visit}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="visit">Visit Administration</label>
                    <br />

                    <input
                      type="checkbox"
                      id="communication"
                      name="communication"
                      checked={formData.communication}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="communication">Communication</label>
                    <br />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-7">
              <h1 className="underline">Banking Information</h1>
              <div className="mb-6">
                <label
                  htmlFor="nameOnCard"
                  className="block text-lg font-medium text-[#6F84F8]"
                >
                  Name On Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  placeholder="Enter your Name On Card"
                  className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="cardNumber"
                  className="block text-lg font-medium text-[#6F84F8]"
                >
                  Card Number
                </label>
                <input
                  type="number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your Card Number"
                  className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="expiryDate"
                  className="block text-lg font-medium text-[#6F84F8]"
                >
                  Expiry Date
                </label>
                <input
                  type="month"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="Enter your Expiry Date"
                  className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="billingAddressCheckBox"
                  className="block text-lg font-medium text-[#6F84F8]"
                >
                  Billing Address
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="billingAddressCheckBox"
                    id="billingAddressCheckBox"
                    checked={useSameAddress}
                    onChange={handleBillingAddressCheckbox}
                    className="mt-1 mr-2 block rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                  />
                  <label htmlFor="billingAddressCheckBox" className="text-lg">
                    Same as Company Address
                  </label>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-lg font-medium text-[#6F84F8]"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your Address"
                  className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                />
              </div>

              <div className="flex gap-4 mb-6">
                <div className="w-1/3">
                  <label
                    htmlFor="city"
                    className="block text-lg font-medium text-[#6F84F8]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your City"
                    className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                    required
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="state"
                    className="block text-lg font-medium text-[#6F84F8]"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter your State"
                    className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                    required
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="zipCode"
                    className="block text-lg font-medium text-[#6F84F8]"
                  >
                    Zip Code
                  </label>
                  <input
                    type="number"
                    name="zipCode"
                    placeholder="Enter your Zip Code"
                    className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SetupPop;
