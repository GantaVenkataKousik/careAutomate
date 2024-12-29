import React, { useState } from "react";
import "./BankCard.css";
import cardlogo from "../../images/BankCard/cardlogo.png";
import chip from "../../images/BankCard/chip.png";

const BankCard = ({ editMode }) => {
  const [cardNumber, setCardNumber] = useState("4532123456789012");
  const [cardName, setCardName] = useState("Surya Abothula");
  const [expiryDate, setExpiryDate] = useState("2025-12");
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const getCardType = (cardNumber) => {
    const cardPatterns = [
      { type: "Visa", pattern: /^4\d{12}(\d{3})?(\d{3})?$/ },
      { type: "Mastercard", pattern: /^5[1-5]\d{14}$|^2[2-7]\d{14}$/ },
      { type: "American Express", pattern: /^3[47]\d{13}$/ },
      {
        type: "Discover",
        pattern:
          /^6(?:011|5\d{2}|4[4-9])\d{12}$|^622(?:12[6-9]|1[3-9]\d|2[0-5]\d|2[6-9]|9[0-2]|92[0-5])\d{10}$/,
      },
      { type: "Diners Club", pattern: /^3(?:6|8|0[0-5])\d{11}$/ },
      { type: "UnionPay", pattern: /^62\d{14,17}$/ },
      { type: "Interac Debit", pattern: /^6\d{15}$/ },
    ];

    const sanitizedNumber = cardNumber.replace(/[\s-]/g, "");
    for (let card of cardPatterns) {
      if (card.pattern.test(sanitizedNumber)) {
        return card.type;
      }
    }

    return "Unknown Card Type";
  };

  const getInputProps = () => {
    if (editMode) {
      return { disabled: false, className: "border rounded-lg bg-[#6F84F8]" };
    } else {
      return {
        disabled: true,
        className: "border-none rounded-lg bg-transparent",
      };
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { disabled, className } = getInputProps();

  return (
    <div className="flex justify-center m-5 p-5 rounded-xl items-center">
      <form>
        {/**Card div */}
        <div className="bankcard-container">
          <header className="bankcard-header">
            <span className="bankcard-logo">
              <img src={cardlogo} alt="Card Logo" />
              <h5>{getCardType(cardNumber)}</h5>
            </span>
            <img src={chip} alt="Chip" className="bankcard-chip" />
          </header>
          <div className="bankcard-card-details">
            <div>
              <h6 className="bankcard-header-tags">Card Number</h6>
              <h5 className="bankcard-number">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter card number"
                  disabled={disabled}
                  className={className}
                />
              </h5>
              <h5 className="bankcard-name">
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
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
                  className={`${className} w-full`}
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
      </form>
    </div>
  );
};

export default BankCard;
