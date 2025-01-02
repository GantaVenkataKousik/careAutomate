import React, { useEffect, useRef, useState } from "react";
import "./BankCard.css";
import cardlogo from "../../images/BankCard/cardlogo.png";
import chip from "../../images/BankCard/chip.png";
import Cleave from "cleave.js/react";

const BankCard = ({ editMode, setEditMode }) => {
  const [cardNumber, setCardNumber] = useState("4532123456789012");
  const [cardType, setCardType] = useState("Unknown Card Type");
  const [nameOnCard, setNameOnCard] = useState("Surya Abothula");
  const [expiryDate, setExpiryDate] = useState("2025-12");
  const [formData, setFormData] = useState({
    addressLine1: "addressLine1",
    addressLine2: "addressLine2",
    city: "city",
    state: "state",
    zipCode: "533103",
  });

  const getInputProps = () => {
    if (editMode) {
      return {
        disabled: false,
        className: "rounded-lg border-2 border-gray-400 py-2 px-5",
      };
    } else {
      return {
        disabled: true,
        className: "border-none rounded-lg bg-transparent",
      };
    }
  };
  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };
  const handleCardTypeChange = (type) => {
    console.log(type);
    const cardTypes = {
      visa: "Visa",
      mastercard: "Mastercard",
      amex: "American Express",
      discover: "Discover",
      jcb: "JCB",
      dinersclub: "Diners Club",
      unknown: "Unknown Card Type",
    };
    setCardType(type.toUpperCase() || "Unknown Card Type");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      billingAddress: {
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
    };
    console.log(payload);
  };
  const { disabled, className } = getInputProps();

  return (
    <div className="flex justify-center m-5 p-5 rounded-xl items-center">
      <form onSubmit={handleSubmit}>
        {/**Card div */}
        <div className="bankcard-container">
          <header className="bankcard-header">
            <span className="bankcard-logo">
              <img src={cardlogo} alt="Card Logo" />
              <h5>{cardType}</h5>{" "}
            </span>
            <img src={chip} alt="Chip" className="bankcard-chip" />
          </header>
          <div className="bankcard-card-details">
            <div>
              <h6 className="bankcard-header-tags">Card Number</h6>
              <h5 className="bankcard-number">
                {/* <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter card number"
                  disabled={disabled}
                  className={className}
                /> */}
                <Cleave
                  placeholder="Enter your credit card number"
                  options={{
                    creditCard: true,
                    onCreditCardTypeChanged: handleCardTypeChange,
                  }}
                  onChange={handleCardNumberChange}
                  value={cardNumber}
                  {...getInputProps()}
                  className={`w-full text-xl font-mono ${className}`}
                />
              </h5>
              <h5 className="bankcard-name">
                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="Enter name on card"
                  disabled={disabled}
                  className={className}
                />
              </h5>
            </div>
            <div>
              <h6 className="bankcard-header-tags">Valid Thru</h6>
              <h5>
                <input
                  type="month"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  disabled={disabled}
                  className={`${className} ${editMode ? "w-36" : "w-full"}`}
                />
              </h5>
            </div>
          </div>
        </div>

        {/**Address div */}
        <div className="mt-8">
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
                placeholder="Enter your Zip Code"
                className="mt-1 block w-full rounded-lg border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                required
              />
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default BankCard;
