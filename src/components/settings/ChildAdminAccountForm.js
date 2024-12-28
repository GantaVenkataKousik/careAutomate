import React, { useState } from "react";
import { API_ROUTES } from "../../routes";
import { toast } from "react-toastify";

const ChildAdminAccountForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    officePhoneNumber: "",
    cellPhoneNumber: "",
    username: "",
    password: "",
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

  const formatFormData = () => {
    const userId = user._id;
    const formattedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: {
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      contact: {
        officePhoneNumber: formData.officePhoneNumber,
        cellPhoneNumber: formData.cellPhoneNumber,
        // primaryEmailAddress: "contact.primaryEmailAddress",
        // alternateEmailAddress: "contact.alternateEmailAddress",
      },
      email: formData.username,
      password: formData.password,
      // Permissions
      permissions: {
        billing: formData.billing,
        tenant: formData.tenant,
        hcm: formData.hcm,
        appointments: formData.appointments,
        visit: formData.visit,
        communication: formData.communication,
      },
    };
    formattedData.adminId = userId;
    return formattedData;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formattedData = formatFormData(formData);
    console.log("data", formattedData);

    try {
      const response = await fetch(
        `${API_ROUTES.AUTH.BASE}/add-child-admin-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formattedData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Child Admin Account created successfully!");
        // handleReset(); // Reset the form
      } else {
        toast.error(data.message || "Failed to create Child Admin Account.");
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating Child Admin Account.");
    }
  };
  return (
    <div className="m-5 py-5 px-2 border-2 border-gray-350 rounded-xl">
      {/* ChildAdminAccountForm */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center pb-3 mx-10 mt-4">
          <div className="bg-[#6F84F8] w-2 rounded-[20px] h-8"></div>
          <h2 className="text-lg ">Add a Child Admin Account</h2>
        </div>
      </div>

      {/**Form */}
      <form className="flex flex-col gap-2 mx-10 mt-4" onSubmit={handleSubmit}>
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
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
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
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              required
            />
          </div>
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
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
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
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
        </div>

        {/* City and State */}
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
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter your City"
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
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
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter your State"
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              required
            />
          </div>
          {/* Zip Code */}
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
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Enter your Zip Code"
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              required
            />
          </div>
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
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
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
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              required
            />
          </div>
        </div>

        {/* Username and password */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-[#6F84F8]"
            >
              Username
            </label>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter Username"
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="Password"
              className="block text-lg font-medium text-[#6F84F8]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
        </div>

        <div className="w-full mt-6 ">
          <label
            htmlFor="permissions"
            className="block text-xl font-medium text-[#6F84F8]"
          >
            Permissions
          </label>
          <hr className="w-60 my-2" />
          <div className="flex gap-20 items-center mx-6 mb-6">
            <div>
              <input
                type="checkbox"
                id="billing"
                name="billing"
                className="w-4 h-4"
                checked={formData.billing}
                onChange={handleInputChange}
              />
              <label
                htmlFor="billing"
                className={`ml-1 text-xl ${formData.billing ? "text-[#6F84F8]" : ""}`}
              >
                Billing Administration
              </label>
              <br />

              <input
                type="checkbox"
                id="tenant"
                name="tenant"
                className="w-4 h-4"
                checked={formData.tenant}
                onChange={handleInputChange}
              />
              <label
                htmlFor="tenant"
                className={`ml-1 text-xl ${formData.tenant ? "text-[#6F84F8]" : ""}`}
              >
                Tenant Administration
              </label>
              <br />

              <input
                type="checkbox"
                id="hcm"
                name="hcm"
                className="w-4 h-4"
                checked={formData.hcm}
                onChange={handleInputChange}
              />
              <label
                htmlFor="hcm"
                className={`ml-1 text-xl ${formData.hcm ? "text-[#6F84F8]" : ""}`}
              >
                HCM Administration
              </label>
              <br />
            </div>
            <div>
              <input
                type="checkbox"
                id="appointments"
                name="appointments"
                className="w-4 h-4"
                checked={formData.appointments}
                onChange={handleInputChange}
              />
              <label
                htmlFor="appointments"
                className={`ml-1 text-xl ${formData.appointments ? "text-[#6F84F8]" : ""}`}
              >
                Appointments Administration
              </label>
              <br />

              <input
                type="checkbox"
                id="visit"
                name="visit"
                className="w-4 h-4"
                checked={formData.visit}
                onChange={handleInputChange}
              />
              <label
                htmlFor="visit"
                className={`ml-1 text-xl ${formData.visit ? "text-[#6F84F8]" : ""}`}
              >
                Visit Administration
              </label>
              <br />

              <input
                type="checkbox"
                id="communication"
                name="communication"
                className="w-4 h-4"
                checked={formData.communication}
                onChange={handleInputChange}
              />
              <label
                htmlFor="communication"
                className={`ml-1 text-xl ${formData.communication ? "text-[#6F84F8]" : ""}`}
              >
                Communication
              </label>
              <br />
            </div>
          </div>
        </div>

        {/**Buttons div */}
        <div className="flex items-center w-1/3 ml-auto">
          <button
            className=" cursor-pointer transition-all bg-[#F57070] text-white 
                    px-6 py-2 rounded-lg border-red-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px] 
                    py-3 px-6 w-full mt-4 mb-9 mr-8"
            // onClick={handleReset}
          >
            cancel
          </button>
          <button
            className=" cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
                  border-blue-600
                  border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  py-3 px-6 w-full mt-4  mb-9"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChildAdminAccountForm;
