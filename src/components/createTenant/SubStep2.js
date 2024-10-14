import React, { useState } from 'react';

const SubStep2 = () => {
  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    mailingSameAsAbove: false,
    mailingDifferent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress({
      ...address,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Address Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div>
          <label className="block text-gray-700" htmlFor="addressLine1">
            Address Line 1*
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="addressLine2">
            Address Line 2
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="city">
            City*
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="state">
            State*
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="zipCode">
            Zip Code*
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="zipCode"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>
      </div>

      <h3 className="text-xl font-medium mb-4">Mailing Address</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            id="mailingSameAsAbove"
            name="mailingSameAsAbove"
            checked={address.mailingSameAsAbove}
            onChange={handleChange}
          />
          <label className="ml-2" htmlFor="mailingSameAsAbove">
            Same as Above
          </label>
        </div>

        <div>
          <input
            type="checkbox"
            id="mailingDifferent"
            name="mailingDifferent"
            checked={address.mailingDifferent}
            onChange={handleChange}
          />
          <label className="ml-2" htmlFor="mailingDifferent">
            Different
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubStep2;