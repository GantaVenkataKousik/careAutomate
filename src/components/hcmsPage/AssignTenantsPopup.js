import { Modal } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { API_ROUTES } from "../../routes";
import axios from "axios";
import { toast } from "react-toastify";

const AssignTenantsPopup = ({
  open,
  onClose,
  hcm,
  setShouldRefreshAssignedTenants,
}) => {
  // console.log("popup", hcm);
  const [allTenants, setAllTenants] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTenants = async () => {
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
        });

        const data = await response.json();
        if (response.status === 200 && data.success) {
          const tenantData = data.data.tenants
            .map((tenant) => ({
              id: tenant._id,
              name: tenant.name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
          setAllTenants(tenantData);
        } else {
          console.error("Failed to fetch tenants:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };

    fetchTenants();
  }, []);

  const handleCheckboxChange = (tenant) => {
    const updatedTenants = selectedTenants.some((t) => t.id === tenant.id)
      ? selectedTenants.filter((t) => t.id !== tenant.id)
      : [...selectedTenants, tenant];
    setSelectedTenants(updatedTenants);
  };

  const handleSelectAllToggle = () => {
    if (selectedTenants.length === allTenants.length) {
      setSelectedTenants([]);
    } else {
      setSelectedTenants(allTenants);
    }
  };

  const filteredTenants = useMemo(
    () =>
      allTenants.filter((tenant) =>
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [allTenants, searchQuery]
  );

  const handleSubmit = async () => {
    const selected = selectedTenants.map((data) => data.id);
    const payload = {
      tenantIds: selected,
      hcmId: hcm._id,
    };
    // console.log(hcm);

    // console.log(payload);
    // return;
    try {
      const response = await axios.post(
        `${API_ROUTES.HCM.ASSIGN_TENANTS}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Tenants assigned to HCM successfully");
        setShouldRefreshAssignedTenants(true);
        onClose();
      } else {
        console.error("Failed to assign tenants:", response.data);
        toast.error("Failed to assign tenants");
      }
    } catch (error) {
      console.error("Error assigning tenants:", error);
      toast.error("Error assigning tenants");
    }
  };

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55%] h-[75%] bg-white shadow-lg p-6 rounded-lg overflow-y-auto">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Assign Tenants to {hcm?.personalInfo?.firstName || "HCM"}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Main Content */}
          <div className="flex justify-between space-x-8">
            {/* Tenant Selection */}
            <div className="w-[45%] bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search tenants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <button
                onClick={handleSelectAllToggle}
                className="w-full mb-4 px-4 py-2 text-white bg-[#6F84F8] rounded-lg hover:bg-[#6F84F8]"
              >
                {selectedTenants.length === allTenants.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
              <ul className="space-y-2 max-h-[300px] overflow-y-auto tenant-visits-scrollbar p-4">
                {filteredTenants.map((tenant) => (
                  <li
                    key={tenant.id}
                    className={`flex items-center justify-between px-4 py-2 border rounded-lg cursor-pointer ${
                      selectedTenants.some((t) => t.id === tenant.id)
                        ? "bg-[#6F84F8] text-white"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => handleCheckboxChange(tenant)}
                  >
                    <span>{tenant.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/**Arrow */}
            <div className="flex items-center">
              <FaArrowRightLong />
            </div>

            {/* Selected Tenants */}
            <div className="w-[45%] bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Selected Tenants</h3>
              <ul className="space-y-2 max-h-[350px] overflow-y-auto p-4 tenant-visits-scrollbar">
                {selectedTenants.map((tenant) => (
                  <li
                    key={tenant.id}
                    className="px-4 py-2 border rounded-lg bg-white"
                  >
                    {tenant.name}
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
            Assign Tenants
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignTenantsPopup;
