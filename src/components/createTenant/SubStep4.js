// SubStep4.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmergencyContactInfo } from '../../redux/tenant/tenantSlice';

const SubStep4 = () => {
  const dispatch = useDispatch();
  const emergencyContactInfo = useSelector((state) => state.tenant.emergencyContactInfo);
  const [emergencyContact, setEmergencyContact] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    relationship: '',
  });

  useEffect(() => {
    setEmergencyContact(emergencyContactInfo);
  }, [emergencyContactInfo]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContact({
      ...emergencyContact,
      [name]: value,
    });

    dispatch(updateEmergencyContactInfo({ [name]: value })); // Dispatch to Redux store
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2 className="text-xl font-medium mb-4">Emergency Contact Information</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700" htmlFor="firstName">
            First Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="firstName"
            name="firstName"
            value={emergencyContact.firstName}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="middleName">
            Middle Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="middleName"
            name="middleName"
            value={emergencyContact.middleName}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="lastName"
            name="lastName"
            value={emergencyContact.lastName}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={emergencyContact.phoneNumber}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
              type="email"
              id="email"
              name="email"
              value={emergencyContact.email}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="relationship">
              Relationship
            </label>
            <select
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
              id="relationship"
              name="relationship"
              value={emergencyContact.relationship}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="parent">Parent</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubStep4;
