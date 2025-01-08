import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountField } from "../../../redux/accountSetup/accountSetupAction";

const Step4 = () => {
  const dispatch = useDispatch();

  // Get form data from the store
  const formData = useSelector((state) => state.accountSetup);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAccountField(name, value)); // Dispatch action to update the field
  };

  // Handle the Billing Address Checkbox
  const handleBillingAddressCheckbox = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Set billing address to the same as the company address
      dispatch(updateAccountField("billingAddress", formData.addressLine1));
      dispatch(updateAccountField("billingCity", formData.city));
      dispatch(updateAccountField("billingState", formData.state));
      dispatch(updateAccountField("billingZipCode", formData.zipCode));
    } else {
      // Clear the billing address fields
      dispatch(updateAccountField("billingAddress", ""));
      dispatch(updateAccountField("billingCity", ""));
      dispatch(updateAccountField("billingState", ""));
      dispatch(updateAccountField("billingZipCode", ""));
    }
  };

  return (
    <div className="mb-7 h-[410px] overflow-y-auto tenant-visits-scrollbar">
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
          htmlFor="billingAddress"
          className="block text-lg font-medium text-[#6F84F8]"
        >
          Address
        </label>
        <input
          type="text"
          name="billingAddress"
          value={formData.billingAddress}
          onChange={handleInputChange}
          placeholder="Enter your Address"
          className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <div className="w-1/3">
          <label
            htmlFor="billingCity"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            City
          </label>
          <input
            type="text"
            name="billingCity"
            value={formData.billingCity}
            onChange={handleInputChange}
            placeholder="Enter your City"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          />
        </div>
        <div className="w-1/3">
          <label
            htmlFor="billingState"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            State
          </label>
          <input
            type="text"
            name="billingState"
            value={formData.billingState}
            onChange={handleInputChange}
            placeholder="Enter your State"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          />
        </div>
        <div className="w-1/3">
          <label
            htmlFor="billingZipCode"
            className="block text-lg font-medium text-[#6F84F8]"
          >
            Zip Code
          </label>
          <input
            type="number"
            name="billingZipCode"
            value={formData.billingZipCode}
            onChange={handleInputChange}
            placeholder="Enter your Zip Code"
            className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
