import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCaseManagerInfo } from '../../redux/tenant/tenantSlice';

const SubStep5 = () => {
  const dispatch = useDispatch();
  const caseManagerInfo = useSelector((state) => state.tenant.caseManagerInfo);

  const [formData, setFormData] = useState(caseManagerInfo);

  useEffect(() => {
    setFormData(caseManagerInfo);
  }, [caseManagerInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(updateCaseManagerInfo({ [name]: value }));
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2 className="text-xl font-medium mb-4">Case Manager Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700" htmlFor="first-name">
            First Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="middle-initial">
            Middle Initial
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="middle-initial"
            name="middleInitial"
            value={formData.middleInitial}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="last-name">
            Last Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700" htmlFor="phone-number">
              Phone Number
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
              type="text"
              id="phone-number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubStep5;
