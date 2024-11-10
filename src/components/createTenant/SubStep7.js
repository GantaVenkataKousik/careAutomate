import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResponsiblePartyInfo } from "../../redux/tenant/tenantSlice";

const SubStep7 = () => {
  const dispatch = useDispatch();
  const responsiblePartyInfo = useSelector((state) => state.tenant.responsiblePartyInfo);

  const [formData, setFormData] = useState(responsiblePartyInfo);

  useEffect(() => {
    setFormData(responsiblePartyInfo);
  }, [responsiblePartyInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(updateResponsiblePartyInfo({ [name]: value }));
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2 className="text-xl font-medium mb-4">Responsible Party Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700" htmlFor="firstName">
            First Name
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
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
            value={formData.middleName}
            onChange={handleChange}
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
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="phoneNumber"
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
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="relationship">
            Relationship
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SubStep7;
