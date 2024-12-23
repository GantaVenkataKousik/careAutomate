import React from "react";
import { FaUserTie } from "react-icons/fa";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

// Component for each row
const HCMRow = ({ name, onCallClick }) => (
  <div className="bg-[#e3e7f8] flex items-center justify-between p-3 rounded-lg shadow-sm">
    <FaUserTie className="text-xl text-black" />
    <p className="text-[#435DED] font-medium text-sm">{name}</p>
    <button onClick={onCallClick} aria-label={`Call ${name}`}>
      <PhoneInTalkIcon className="text-black" />
    </button>
  </div>
);

// Main component
const TenantsAssigned = () => {
  // Dummy data
  const hcms = [
    { name: "Robert Ross" },
    { name: "John Doe" },
    { name: "Jane Doe" },
    { name: "Alice Smith" },
  ];

  return (
    <div className="bg-white p-5 rounded-[20px] shadow-lg max-w-lg mx-auto">
      {/* Assigned HCMs Header */}
      <div className="flex flex-col mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-2xl px-10 font-semibold text-[#6F84F8]">
            Assigned HCM's
          </h2>
        </div>
        <a
          href="/assign-tenants"
          className="text-[#5970F4] hover:underline text-sm ml-auto mt-2"
        >
          View More
        </a>
      </div>

      {/* List of Assigned HCMs */}
      <div className="space-y-3">
        {hcms.length > 0 ? (
          hcms.map((hcm, index) => (
            <HCMRow
              key={index}
              name={hcm.name}
              onCallClick={() => console.log(`Calling ${hcm.name}`)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No HCMs assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default TenantsAssigned;
