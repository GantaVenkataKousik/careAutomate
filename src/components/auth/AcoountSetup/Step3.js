import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountField } from "../../../redux/accountSetup/accountSetupAction";
import Switch from "@mui/material/Switch";

const Step3 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.accountSetup);
  //   const [childAccount, setChildAccount] = useState(false);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special handling for the switch component
    if (type === "checkbox") {
      dispatch(updateAccountField(name, checked)); // Handle checkbox state change
    } else {
      dispatch(updateAccountField(name, value)); // For all other inputs
    }
  };
  return (
    <>
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
            checked={formData.childAccount}
            onChange={handleInputChange}
            name="childAccount" // Ensure the switch uses the same name as the state field
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>

        {formData.childAccount && (
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
              <label htmlFor="appointments">Appointments Administration</label>
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
    </>
  );
};

export default Step3;
