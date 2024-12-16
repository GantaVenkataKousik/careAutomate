import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { IoCalendar, IoList } from "react-icons/io5";

const VisitHeader = ({
  isListView,
  filters,

  setIsListView,
  setOpenNewVisitPopup,
  handleInputChange,
  applyFilters,
}) => {
  const [allTenants, setAllTenants] = useState([]);
  const [hcmList, setHcmList] = useState([]);
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(
          "https://careautomate-backend.vercel.app/tenant/all",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const tenantData = data.tenants.map((tenant) => ({
            id: tenant._id,
            name: tenant.name,
          }));
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

  useEffect(() => {
    const fetchHcm = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(
          "https://careautomate-backend.vercel.app/hcm/all",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const hcmData = data.hcms.map((hcm) => ({
            id: hcm._id,
            name: hcm.name,
          }));
          setHcmList(hcmData);
        } else {
          console.error("Failed to fetch HCMs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching HCMs:", error);
      }
    };

    fetchHcm();
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold mb-0">Visits</h1>
        <div className="flex items-center justify-center gap-2">
          <div className="flex bg-gray-200 rounded-2xl p-1  w-fit mr-6">
            {/* Calendar Button */}
            <button
              onClick={() => setIsListView(false)}
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                !isListView ? "bg-white text-[#6F84F8]" : "text-gray-600"
              }`}
            >
              <IoCalendar className="text-2xl" />
            </button>

            {/* List Button */}
            <button
              onClick={() => setIsListView(true)}
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                isListView ? "bg-white text-[#6F84F8]" : "text-gray-600"
              }`}
            >
              <IoList className="text-2xl" />
            </button>
          </div>

          <Button
            style={{
              marginRight: "10px",
              borderRadius: "20px",
              fontFamily: "Poppins",
              background: "none",
              color: "#505254",
              border: "2px solid #6F84F8",
              padding: "5px 30px",
              fontSize: "1rem",
            }}
            onClick={{}}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#6F84F8";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#505254";
            }}
          >
            Export{" "}
          </Button>
          <Button
            style={{
              marginRight: "10px",
              borderRadius: "20px",
              fontFamily: "Poppins",
              background: "none",
              color: "#505254",
              border: "2px solid #6F84F8",
              padding: "5px 30px",
              fontSize: "1rem",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={() => setOpenNewVisitPopup(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#6F84F8";
              e.currentTarget.style.color = "white";

              const icon = e.currentTarget.querySelector("svg");
              if (icon) icon.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#505254";

              const icon = e.currentTarget.querySelector("svg");
              if (icon) icon.style.color = "#6F84F8";
            }}
          >
            <FaPlus
              style={{
                marginRight: "0.5rem",
                color: "#6F84F8",
                transition: "color 0.3s ease",
              }}
            />
            New Visit
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "end", marginBottom: "1rem" }}>
        {/* Filter Section */}

        {/* Date Filters */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ color: "#505254", marginBottom: "0.5rem" }}>
            Start Date
          </h2>
          <TextField
            type="date"
            value={filters.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            InputProps={{
              style: {
                fontFamily: "Poppins",
                height: "40px",
                border: "1px solid #6F84F8",
                borderRadius: "30px",
                padding: "5px 10px",
                fontSize: "15px",
                marginRight: "1rem",
              },
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ color: "#505254", marginBottom: "0.5rem" }}>End Date</h2>
          <TextField
            type="date"
            value={filters.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
            InputProps={{
              style: {
                fontFamily: "Poppins",
                height: "40px",
                border: "1px solid #6F84F8",
                borderRadius: "30px",
                padding: "5px 10px",
                fontSize: "15px",
                marginRight: "1rem",
              },
            }}
          />
        </div>

        {/* HCM Dropdown */}
        <Select
          value={filters.hcmId}
          onChange={(e) => handleInputChange("hcmId", e.target.value)}
          displayEmpty
          sx={{
            width: "200px",
            fontFamily: "Poppins",
            height: "40px",
            border: "1px solid #6F84F8",
            borderRadius: "30px",
            padding: "5px 10px",
            fontSize: "15px",
            marginRight: "1rem",
          }}
        >
          <MenuItem value="" sx={{ fontFamily: "Poppins" }}>
            Select HCM
          </MenuItem>
          {hcmList.map((hcm) => (
            <MenuItem
              key={hcm.id}
              value={hcm.id}
              sx={{ fontFamily: "Poppins" }}
            >
              {hcm.name}
            </MenuItem>
          ))}
        </Select>

        {/* Tenant Dropdown */}
        <Select
          value={filters.tenantId}
          onChange={(e) => handleInputChange("tenantId", e.target.value)}
          displayEmpty
          sx={{
            width: "200px",
            fontFamily: "Poppins",
            height: "40px",
            border: "1px solid #6F84F8",
            borderRadius: "30px",
            padding: "5px 10px",
            fontSize: "15px",
            marginRight: "1rem",
          }}
        >
          <MenuItem value="" sx={{ fontFamily: "Poppins" }}>
            Select Tenant
          </MenuItem>
          {allTenants.map((tenant) => (
            <MenuItem
              key={tenant.id}
              value={tenant.id}
              sx={{ fontFamily: "Poppins" }}
            >
              {tenant.name}
            </MenuItem>
          ))}
        </Select>

        {/* Status Dropdown */}
        <Select
          value={filters.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
          displayEmpty
          sx={{
            width: "200px",
            fontFamily: "Poppins",
            height: "40px",
            border: "1px solid #6F84F8",
            borderRadius: "30px",
            padding: "5px 10px",
            fontSize: "15px",
            marginRight: "1rem",
          }}
        >
          <MenuItem value="" sx={{ fontFamily: "Poppins" }}>
            All Statuses
          </MenuItem>
          <MenuItem value="pending" sx={{ fontFamily: "Poppins" }}>
            Pending
          </MenuItem>
          <MenuItem value="approved" sx={{ fontFamily: "Poppins" }}>
            Approved
          </MenuItem>
          <MenuItem value="rejected" sx={{ fontFamily: "Poppins" }}>
            Rejected
          </MenuItem>
        </Select>

        {/* Apply Button */}
        <button
          className="cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          // style={{
          //   backgroundColor: "#6F84F8",
          //   fontFamily: "Poppins",
          //   fontWeight: "bold",
          // }}
          onClick={applyFilters}
        >
          Apply
        </button>
      </div>{" "}
    </div>
  );
};

export default VisitHeader;
