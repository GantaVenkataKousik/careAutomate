import React from "react";

const SubStep1 = () => {
  return (
    <div >
      <h2 className="text-xl font-medium mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700" htmlFor="first-name">
            First Name*
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="first-name"
            name="first-name"
            placeholder="First Name"
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
            placeholder="Middle Name"
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="last-name">
            Last Name*
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Last Name"
            required
          />
        </div>

        {/* DOB and Gender in a Row */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700" htmlFor="dob">
              DOB*
            </label>
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
              type="date"
              id="dob"
              name="dob"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="gender">
              Gender*
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
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700" htmlFor="phone-number">
            Phone Number*
          </label>
          <div className="flex">
            <select className="border border-gray-300 p-2 rounded-l focus:outline-none focus:border-blue-400">
              <option value="+91">🇮🇳 +91</option>
            </select>
            <input
              className="border border-gray-300 p-2 w-full rounded-r focus:outline-none focus:border-blue-400"
              type="tel"
              id="phone-number"
              name="phone-number"
              placeholder="Phone Number"
              required
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700" htmlFor="email">
            Email*
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SubStep1;
