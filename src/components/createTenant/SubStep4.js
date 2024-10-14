import React from "react";

const SubStep4 = () => {
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2 className="text-xl font-medium mb-4">Emergency Contact Information</h2>

<div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
  <div>
    <label className="block text-gray-700" htmlFor="first-name">
      First Name
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
      id="first-name"
      name="first-name"
      placeholder=""
      required
    />
  </div>

  <div>
    <label className="block text-gray-700" htmlFor="middle-name">
      Middle Name
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="text"
      id="middle-name"
      name="middle-name"
      placeholder=""
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
      name="last-name"
      placeholder=""
      required
    />
  </div>
  <div>
  <label className="block text-gray-700" htmlFor="email">
      Phone Number
    </label>
    <input
      className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
      type="email"
      id="email"
      name="email"
      placeholder=""
      required
    />
  </div>
  {/* DOB and Gender in a Row */}
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
      placeholder=""
      required
    />
    </div>
    <div>
      <label className="block text-gray-700" htmlFor="gender">
        Relationship
      </label>
      <select
        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
        id="gender"
        name="gender"
        required
      >
        <option value="" disabled selected>
          Select
        </option>
        <option value="spouse">Spouse</option>
        <option value="Child">Child</option>
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
