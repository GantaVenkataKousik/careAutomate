import React, { useState } from "react";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";

const Preferences = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleToggle = () => {
    setIsSubscribed((prev) => !prev);
  };
  return (
    <div className="m-6 border-2 border-gray-390 rounded-xl p-5">
      <div className="flex gap-2 items-center pb-3">
        <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
        <h2 className="text-xl font-semibold ">Preferences</h2>
      </div>

      {/**Inner Container */}
      <div className="m-5 p-5 border-2 border-gray-350 rounded-xl">
        {/**Email Suncribe container */}
        <div className="flex items-center w-full gap-6 mt-5">
          <h2 className="text-lg text-gray-600 w-1/4">Email Notifications:</h2>
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={handleToggle}
          >
            <div
              className={`px-4 py-2 border rounded-full text-sm font-semibold ${
                isSubscribed
                  ? "bg-white text-[#6F84F8] shadow-lg"
                  : "bg-white text-[#6F84F8] shadow-lg"
              }`}
            >
              {isSubscribed ? "Subscribed" : "unSubscribe"}
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <span className="transform rotate-180 mr-2 text-[#6F84F8] text-4xl font-bold">
                <HiMiniArrowsRightLeft />
              </span>
              <span className="text-gray-500">
                {isSubscribed ? "unSubscribe" : "Subscribed"}
              </span>
            </div>
          </div>
        </div>
        {/**Language Select div */}
        <div className="flex items-center w-full gap-6 mt-5">
          <h2 className="text-lg text-gray-600 w-1/4">Language for Content:</h2>
          {/* <p className="text-lg w-1/2 ">No Suspicious Activity Detected</p> */}
          <select
            name="language"
            className="border border-gray-200 px-3 text-[#6F84F8] py-1 rounded-lg bg-white shadow-lg cursor-pointer"
          >
            <option value="English">English</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
