import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserTie } from "react-icons/fa";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { BASE_URL } from "../../config";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

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
const TenantsAssigned = ({
  hcmId,
  setOpenAssignTenantModal,
  shouldRefreshAssignedTenants,
}) => {
  // console.log("assigned", hcmId);
  const [tenants, setTenants] = useState([]);
  useEffect(() => {
    const fetchAssignedTenants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.post(
          `${BASE_URL}/hcm/get-assigned-tenants-to-hcm/`,
          { hcmId: hcmId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.response) {
          setTenants(response.data.response);
          // console.log(response);
        } else {
          console.error(
            "Failed to fetch assigned HCMs:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching assigned HCMs:", error);
      }
    };

    fetchAssignedTenants();
  }, [hcmId, shouldRefreshAssignedTenants]);

  return (
    <div className="relative bg-white p-5 rounded-[20px] shadow-lg max-w-md mx-auto">
      {/* Assigned HCMs Header */}
      <div className="flex flex-col mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-2xl px-10 font-semibold text-[#6F84F8]">
            Assigned Tenant's
          </h2>
        </div>
      </div>

      {/* List of Assigned HCMs */}
      <div className=" space-y-3 overflow-y-auto max-h-[calc(5*3rem)] mt-2 tenant-visits-scrollbar">
        {tenants.map((tenant) => (
          <div
            className="bg-[#e3e7f8] flex items-center justify-between p-3 rounded-lg shadow-sm "
            key={tenant._id}
          >
            <FaUserTie className="text-xl text-black " />
            <p className="text-[#435DED] font-medium text-sm pl-3">
              {tenant.name}
            </p>
            <PhoneInTalkIcon className="text-black" />
          </div>
        ))}
      </div>

      {/* Icons at Bottom */}
      <div className="absolute bottom-5 right-5 flex space-x-2">
        <AiFillPlusCircle
          className="text-3xl text-[#6DD98C] cursor-pointer"
          onClick={() => setOpenAssignTenantModal(true)}
        />
        <AiFillMinusCircle className=" text-3xl text-[#F57070] cursor-pointer" />
      </div>
    </div>
  );
};

export default TenantsAssigned;
