import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountField } from "../../../redux/accountSetup/accountSetupAction";

const Step2 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.accountSetup);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAccountField(name, value)); // Dispatch action to update the field
  };
  return (
    <>
      <div className="mb-7">
        <h1 className="underline">MNITS Login Information</h1>
        {/**Username and password */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label
              htmlFor="mnitsUserName"
              className="block text-lg font-medium text-[#6F84F8]"
            >
              UserName
            </label>
            <input
              type="text"
              name="mnitsUserName"
              value={formData.mnitsUserName}
              onChange={handleInputChange}
              placeholder="Enter Username"
              className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="mnitsPassword"
              className="block text-lg font-medium text-[#6F84F8]"
            >
              Password
            </label>
            <input
              type="password"
              name="mnitsPassword"
              value={formData.mnitsPassword}
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
        </div>
      </div>
      <div className="mb-7">
        <h1 className="underline">Waystar Login Information</h1>
        {/**Username and password */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label
              htmlFor="WaystarUserName"
              className="block text-lg font-medium text-[#6F84F8]"
            >
              UserName
            </label>
            <input
              type="text"
              name="WaystarUserName"
              value={formData.WaystarUserName}
              onChange={handleInputChange}
              placeholder="Enter Username"
              className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="WaystarPassword"
              className="block text-lg font-medium text-[#6F84F8]"
            >
              Password
            </label>
            <input
              type="password"
              name="WaystarPassword"
              value={formData.WaystarPassword}
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="mt-1 block w-full rounded-full border-2 border-gray-400 py-2 px-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
