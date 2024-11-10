import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginInfo } from '../../redux/tenant/tenantSlice';

const SubStep6 = () => {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.tenant.loginInfo);

  const [formData, setFormData] = useState(loginInfo);

  useEffect(() => {
    setFormData(loginInfo);
  }, [loginInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(updateLoginInfo({ [name]: value }));
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2 className="text-xl font-medium mb-4">Login Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700" htmlFor="user-name">
            Username
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="user-name"
            name="userName"
            value={formData.userName}
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

        <div>
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>




      </div>
    </div>
  );
};

export default SubStep6;
