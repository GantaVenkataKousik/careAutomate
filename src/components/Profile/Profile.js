import React, { useState } from "react";
// import PersonalDetails from "./PersonalDetails";
import MnitsLogin from "./MnitsLogin";
import WaystarLogin from "./WaystarLogin";
import BankingInfo from "./BankingInfo";
import PersonalDetails from "./PersonalDetails";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("Personal Details");

  const menuOptions = [
    "Personal Details",
    "Mnits Login",
    "Waystar Login",
    "Banking Information",
  ];
  return (
    <div className="w-full">
      <div className="pl-4 border-b-2 border-gray-300 font-poppins font-semibold">
        <h1 className="text-[1.8rem]"> Profile</h1>
      </div>

      {/**Side bar */}
      <div className="flex p-4">
        <div className="flex flex-col pr-4 h-78vh w-[300px]">
          {menuOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`p-4 text-base text-left ${
                selectedOption === option
                  ? "bg-[#6f84f8] font-semibold text-white"
                  : "bg-transparent font-normal text-black"
              } border-none outline-none cursor-pointer rounded-md`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className={`flex flex-1 p-4 border-l-2 border-gray-300`}>
          {selectedOption === "Personal Details" && <PersonalDetails />}
          {selectedOption === "Mnits Login" && <MnitsLogin />}
          {selectedOption === "Waystar Login" && <WaystarLogin />}
          {selectedOption === "Banking Information" && <BankingInfo />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
