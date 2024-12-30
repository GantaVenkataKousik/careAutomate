import React from "react";
import "./PersonalDetails.css";
import dummyImage from "../../images/tenant.jpg";

export default function PersonalDetails() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="settings-personalDetails w-full">
      <div className="settings-personalDetails-container">
        <div className="settings-personalDetails-imageContainer">
          <img
            src={dummyImage}
            alt="User"
            className="settings-personDetails-image"
          />
          <h1 className="mb-0 font-medium text-[#505254]">{user?.name}</h1>
          <h1 className="mb-0 text-[#6F84F8] text-[18px]">{user?.email}</h1>
        </div>
        <div className="settings-personalDetails-centerContainer">
          <div>
            <div className="settings-personalDetails-infoContainer">
              <h1 className="mb-1 font-medium text-[#505254]">First Name</h1>
              <h1 className="mb-0 text-[#6F84F8] text-[18px]">{user?.name}</h1>
            </div>
            <div className="settings-personalDetails-infoContainer">
              <h1 className="mb-1 font-medium text-[#505254]">Mobile Number</h1>
              <h1 className="mb-0 text-[#6F84F8] text-[18px]">
                {user?.phoneNo || "+0000000000"}
              </h1>
            </div>
            <div className="settings-personalDetails-infoContainer">
              <h1 className="mb-1 font-medium text-[#505254]">Nationality</h1>
              <h1 className="mb-0 text-[#6F84F8] text-[18px]">
                {user?.nationality || "American"}
              </h1>
            </div>
          </div>
          <div>
            <div className="settings-personalDetails-infoContainer">
              <h1 className="mb-1 font-medium text-[#505254]">Last Name</h1>
              <h1 className="mb-0 text-[#6F84F8] text-[18px]">
                {user?.lastName || "Doe"}
              </h1>
            </div>
            <div className="settings-personalDetails-infoContainer">
              <h1 className="mb-1 font-medium text-[#505254]">Gender</h1>
              <h1 className="mb-0 text-[#6F84F8] text-[18px]">
                {user?.gender || "Male"}
              </h1>
            </div>
            <div className="settings-personalDetails-infoContainer">
              <h1 className="mb-1 font-medium text-[#505254]">Date of Birth</h1>
              <h1 className="mb-0 text-[#6F84F8] text-[18px]">
                {user?.dateOfBirth || "10-11-2000"}
              </h1>
            </div>
          </div>
        </div>
        <div className="settings-personalDetails-bottomContainer">
          <button
            className=" cursor-pointer transition-all bg-[#F57070] text-white 
                px-6 py-2 rounded-lg border-red-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px] 
                py-3 px-6 w-full mt-4 mb-9 mr-8"
          >
            Reset Changes
          </button>
          <button
            className=" cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  py-3 px-6 w-full mt-4  mb-9"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
