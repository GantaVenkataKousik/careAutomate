import React, { useState } from "react";
import PasswordChange from "./PasswordChange";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";

const Security = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <div className="m-6 border-2 border-gray-390 rounded-xl p-5">
      <div className="flex gap-2 items-center pb-3">
        <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
        <h2 className="text-2xl font-semibold ">Security</h2>
      </div>
      {/**Inner container */}
      {!changePassword ? (
        <div className="m-5 p-5 border-2 border-gray-350 rounded-xl">
          <div className="flex items-center w-full gap-6 mt-5">
            <h2 className="text-lg text-gray-600 w-1/4">
              Password Last Changes:
            </h2>
            <p className="text-lg w-1/2 ">December 12, 2024</p>
          </div>

          <div className="flex items-center w-full gap-6 mt-5">
            <h2 className="text-lg text-gray-600 w-1/4">
              Login Notifications:
            </h2>
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={handleToggle}
            >
              <div
                className={`px-4 py-2 border rounded-full text-sm font-semibold ${
                  isEnabled
                    ? "bg-white text-[#6F84F8] shadow-lg"
                    : "bg-white text-[#6F84F8] shadow-lg"
                }`}
              >
                {isEnabled ? "Enabled" : "Disabled"}
              </div>
              <div className="flex items-center space-x-1 text-gray-400">
                <span className="transform rotate-180 mr-2 text-[#6F84F8] text-4xl font-bold">
                  <HiMiniArrowsRightLeft />
                </span>
                <span className="text-gray-500">
                  {isEnabled ? "Disable" : "Enable"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full gap-6 mt-5">
            <h2 className="text-lg text-gray-600 w-1/4">
              Recent Account Activity:
            </h2>
            <p className="text-lg w-1/2 ">No Suspicious Activity Detected</p>
          </div>

          <div className="flex items-center w-full gap-6 mt-5">
            <h2 className="text-lg text-gray-600 w-1/4">password:</h2>
            <div className="flex gap-2">
              <p className="text-lg">************</p>
              <FaRegEyeSlash className="text-[#6F84F8] w-5 h-5 cursor-pointer" />
              <CiEdit
                className="text-[#6F84F8] w-5 h-5 cursor-pointer"
                onClick={() => setChangePassword(!changePassword)}
              />
            </div>
          </div>
        </div>
      ) : (
        <PasswordChange />
      )}
    </div>
  );
};

export default Security;
