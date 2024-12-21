import React, { useState } from "react";

const CommunicationHeader = ({ activeTab, setActiveTab, unreadCount }) => {
  // const [activeTab, setActiveTab] = useState("HCM");

  return (
    <div
      className="px-4 pt-4 shadow-sm"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h2 className="text-2xl font-bold flex gap-2">
        <span>Messages</span>
        <span className="h-9 w-9 flex items-center justify-center rounded-full font-bold text-lg p-2 bg-[#6F84F8] text-white">
          {unreadCount}
        </span>
      </h2>

      <div className="flex mt-5">
        {["HCM", "Tenant"].map((tab) => (
          <button
            key={tab}
            className={`border-b-4  hover:border-[#6F84F8] text-[#505254]  px-7 ${
              activeTab === tab ? "border-[#6F84F8] font-bold" : ""
            }`}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommunicationHeader;
