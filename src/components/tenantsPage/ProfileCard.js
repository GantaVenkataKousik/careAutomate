import React from "react";
import { FaPhoneAlt, FaDownload } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import tenant from "../../images/tenant.jpg";
import {
  FaRegStickyNote,
  FaUserCheck,
  FaFileInvoice,
  FaFileAlt,
} from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ tenantData, tenantId }) => {
  const navigate = useNavigate();
  const handlePlanUsageClick = () => {
    navigate("/tenants/planUsage", { state: { tenantId } });
  };
  const listItems = [
    { name: "Notes", icon: <FaRegStickyNote /> },
    { name: "Eligibility", icon: <FaUserCheck /> },
    {
      name: "Plan Usage",
      icon: <FaFileInvoice />,
      onClick: handlePlanUsageClick,
    },
    { name: "Documents", icon: <FaFileAlt /> },
  ];

  return (
    <div className="bg-white p-6 rounded-[20px] shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center pb-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-2xl font-semibold text-[#6F84F8]">
            Profile Details
          </h2>
        </div>
        <button className="bg-[#6F84F8] hover:bg-[#4E6ADF] text-white py-2 px-4 rounded-full flex items-center">
          <FaDownload className="mr-2" /> Download Info
        </button>
      </div>

      <div className="flex p-6">
        {/* Left Content */}
        <div className="flex flex-col pr-6 w-1/2">
          {/* Top Section: Profile Photo, Name, Gender, and DOB */}
          <div className="flex items-center gap-6 pb-6">
            <img
              src={tenant || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover"
            />
            <div className="flex flex-col w-[25vw]">
              <h1 className="text-2xl font-bold  text-[#6F84F8]">
                {tenantData.name || "Krishika Iyer"}
              </h1>
              <p className="text-lg text-[#505254]">
                {tenantData.tenantData.gender || "Female"},{" "}
                {new Date().getFullYear() -
                  new Date(
                    tenantData.tenantData.dob || "2000-01-01"
                  ).getFullYear()}{" "}
                years old
              </p>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600 text-lg">
              <FaPhoneAlt className="mr-2 text-[#6F84F8]" />
              {tenantData?.phoneNo || "(+01) 234-349"}
            </div>
            <div className="flex items-center text-gray-600 text-lg">
              <MdEmail className="mr-2 text-[#6F84F8]" />
              {tenantData?.email || "rishikaranganath@gmail.com"}
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="border-l-4 border-gray-300 h-auto mx-6 rounded-full"></div>

        {/* Right Content */}
        <div className="flex-1 pl-6 w-1/2">
          <ul className="space-y-6">
            {listItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-lg group border-b-2 pb-4"
                onClick={item.onClick}
              >
                <span className="flex items-center gap-2 text-xl text-gray-600 group-hover:text-[#6F84F8] group-hover:font-semibold">
                  <span className="text-[#6F84F8] group-hover:text-[#6F84F8]">
                    {item.icon}
                  </span>
                  {item.name}
                </span>
                <BsChevronRight className="text-gray-600 group-hover:text-white group-hover:bg-[#6F84F8] group-hover:rounded-full group-hover:p-1 group-hover:text-white text-2xl" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
