import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserTie } from "react-icons/fa";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { BASE_URL } from "../../config"; // Ensure BASE_URL is correctly set

const AssignedHcms = ({ tenantId }) => {
  const [hcms, setHcms] = useState([]);
  useEffect(() => {
    const fetchAssignedHcms = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.post(
          `${BASE_URL}/tenant/get-assigned-hcms-to-tenant`,
          { tenantId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.response) {
          setHcms(response.data.response);
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

    fetchAssignedHcms();
  }, [tenantId]);

  return (
    <div className="space-y-3">
      {hcms.map((hcm) => (
        <div
          className="bg-[#e3e7f8] flex items-center justify-between p-3 rounded-lg shadow-sm"
          key={hcm._id}
        >
          <FaUserTie className="text-xl text-black" />
          <p className="text-[#435DED] font-medium text-sm">{hcm.name}</p>
          <PhoneInTalkIcon className="text-black" />
        </div>
      ))}
    </div>
  );
};

export default AssignedHcms;
