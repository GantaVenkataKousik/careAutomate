// SubStep3.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContactInfo } from '../../redux/tenant/tenantSlice';

const SubStep3 = () => {
  const dispatch = useDispatch();
  const contactInfo = useSelector((state) => state.tenant.contactInfo);
  const [contact, setContact] = useState({
    homePhone: '',
    cellPhone: '',
    workPhone: '',
    extension: '',
    email: '',
  });
  useEffect(() => {
    setContact(contactInfo);
  }, [contactInfo]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });

    dispatch(updateContactInfo({ [name]: value })); // Dispatch to Redux store
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2 className="text-xl font-medium mb-4">Contact Information</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700" htmlFor="homePhone">
            Home Phone Number
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="homePhone"
            name="homePhone"
            value={contact.homePhone}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="cellPhone">
            Cell Phone Number
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="cellPhone"
            name="cellPhone"
            value={contact.cellPhone}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="workPhone">
            Work Phone Number
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="workPhone"
            name="workPhone"
            value={contact.workPhone}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="extension">
            Ext
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="extension"
            name="extension"
            value={contact.extension}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
};

export default SubStep3;
