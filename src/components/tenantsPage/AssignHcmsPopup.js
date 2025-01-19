import { Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { API_ROUTES } from "../../routes";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

const AssignHcmsPopup = ({
  open,
  onClose,
  tenantData,
  setShouldRefreshAssignedHcms,
}) => {
  const [allHcms, setAllHcms] = useState([]); // Store all HCMs
  const [selectedHcms, setSelectedHcms] = useState([]); // Store selected HCMs
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all HCMs from API
  useEffect(() => {
    const fetchHCMs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(`${API_ROUTES.ALL.FETCH_ALL}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();
        if (response.status === 200 && data.success) {
          const hcmData = data.data.hcm
            .map((hcm) => ({
              id: hcm._id,
              name: hcm.name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
          setAllHcms(hcmData);
        } else {
          console.error("Failed to fetch HCMs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching HCMs:", error);
      }
    };

    fetchHCMs();
  }, []);

  const handleCheckboxChange = (hcm) => {
    const updatedHcms = selectedHcms.some((t) => t.id === hcm.id)
      ? selectedHcms.filter((t) => t.id !== hcm.id)
      : [...selectedHcms, hcm];
    setSelectedHcms(updatedHcms);
  };

  const handleSelectAllToggle = () => {
    if (selectedHcms.length === allHcms.length) {
      setSelectedHcms([]);
    } else {
      setSelectedHcms(allHcms);
    }
  };

  const filteredHcms = allHcms.filter((hcm) =>
    hcm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    const selected = selectedHcms.map((data) => data.id);
    const payload = {
      hcmIds: selected,
      tenantId: tenantData._id,
    };
    try {
      const response = await axios.post(
        `${API_ROUTES.TENANTS.ASSIGN_HCMS}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //   console.log(response);
      if (response.status === 200) {
        toast.success("HCMs assigned successfully");
        setShouldRefreshAssignedHcms((prev) => !prev);
        onClose();
      } else {
        console.error("Failed to assign HCMs:", response.data);
        toast.error("Failed to assign the HCMs");
      }
    } catch (error) {
      console.error("Error assigning HCMs:", error);
      toast.error("Failed to assign the HCMs");
    }
  };
  return (
    <Modal open={open} onClose={() => {}}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55%] h-[75%] bg-white shadow-lg p-6 rounded-lg overflow-y-auto">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Assign HCM's to {tenantData?.name || "Tenant"}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <div className="flex justify-between space-x-8">
            {/* HCM Selection */}
            <div className="w-[45%] bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search HCM's..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#6F84F8]"
                />
              </div>
              <button
                onClick={handleSelectAllToggle}
                className="w-full mb-4 px-4 py-2 text-white bg-[#6F84F8] rounded-lg hover:bg-[#6F84F8]"
              >
                {selectedHcms.length === allHcms.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
              <ul className="space-y-2 max-h-[300px] overflow-y-auto tenant-visits-scrollbar p-4">
                {filteredHcms.map((hcm) => (
                  <li
                    key={hcm.id}
                    className={`flex items-center justify-between px-4 py-2 border rounded-lg cursor-pointer ${
                      selectedHcms.some((t) => t.id === hcm.id)
                        ? "bg-[#6F84F8] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleCheckboxChange(hcm)}
                  >
                    <span>{hcm.name}</span>
                    <input
                      type="checkbox"
                      checked={selectedHcms.some((t) => t.id === hcm.id)}
                      onChange={() => handleCheckboxChange(hcm)}
                      className="hidden"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/**Arrow */}
            <div className="flex items-center">
              <FaArrowRightLong />
            </div>

            {/* Selected HCMs */}
            <div className="w-[45%] bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Selected HCM's</h3>
              <ul className="space-y-2 max-h-[400px] overflow-y-auto p-4">
                {selectedHcms.map((hcm) => (
                  <li
                    key={hcm.id}
                    className="px-4 py-2 border rounded-lg bg-white"
                  >
                    {hcm.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/**Buttons */}
        <div className="flex gap-2 justify-end mt-4">
          <button
            type="button"
            className="cursor-pointer text-[#F57070] rounded-full border-[#F57070] border-2 py-2 px-3 hover:bg-[#F57070] hover:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer text-[#6F84F8] rounded-full border-[#6F84F8] border-2 py-2 px-3 hover:bg-[#6F84F8] hover:text-white"
            onClick={handleSubmit}
          >
            Assign HCM's
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignHcmsPopup;
