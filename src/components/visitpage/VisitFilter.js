import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Select from "react-select";
import { BASE_URL } from "../../config";

// Reusable FilterDropdown Component
const FilterDropdown = ({
  title,
  isOpen,
  setIsOpen,
  children,
  selectedCount = 0,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`flex gap-2 text-lg font-bold ${isOpen ? "text-[#6F84F8]" : "text-[#333]"}`}
        >
          {title}
          <span
            className={`${isOpen ? "block" : "hidden"} h-6 w-6 flex items-center justify-center rounded-full font-bold text-lg p-2 bg-[#6F84F8] text-white`}
          >
            {selectedCount}
          </span>
        </span>
        <FaChevronDown className={`${isOpen ? "text-[#6F84F8]" : ""}`} />
      </div>
      {isOpen && children}
    </div>
  );
};

const VisitFilter = ({ onFilterUpdate }) => {
  // Date state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Dropdown states
  const [dropdownStates, setDropdownStates] = useState({
    date: false,
    tenant: false,
    hcm: false,
    status: false,
  });

  // Selection states
  const [selectedValues, setSelectedValues] = useState({
    tenant: [],
    hcm: [],
    status: [],
  });

  // Options state
  const [filterData, setFilterData] = useState({
    tenant: [],
    hcm: [],
    status: [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ],
  });

  const toggleDropdown = (key) => {
    setDropdownStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectionChange = (key, selectedOptions) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: selectedOptions ? selectedOptions.map((o) => o.value) : [],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch tenants
        const tenantsResponse = await fetch(`${BASE_URL}/tenant/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const tenantsData = await tenantsResponse.json();
        const formattedTenants = tenantsData.response.map((tenant) => ({
          value: tenant._id,
          label: tenant.name,
        }));

        // Fetch HCMs
        const hcmsResponse = await fetch(`${BASE_URL}/hcm/all`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
        const hcmsData = await hcmsResponse.json();
        const formattedHCMs = hcmsData.response.map((hcm) => ({
          value: hcm._id,
          label: hcm.name,
        }));

        setFilterData((prev) => ({
          ...prev,
          tenant: formattedTenants,
          hcm: formattedHCMs,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApply = () => {
    const filtersToApply = {
      ...selectedValues,
      startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : null,
    };
    // console.log(filtersToApply);
    onFilterUpdate(filtersToApply);
    // Pass filtersToApply to any onFilterUpdate function or API request as needed
  };

  const handleCancel = () => {
    const emptyFilters = {
      tenant: [],
      hcm: [],
      status: [],
      startDate: null,
      endDate: null,
    };
    setSelectedValues(emptyFilters);
    setStartDate(null);
    setEndDate(null);
    onFilterUpdate(emptyFilters);
  };
  return (
    <div className="flex flex-col h-full w-full p-2 py-4">
      <h2 className="flex justify-center text-3xl text-[#6F84F8] mb-4 font-black">
        Filter
      </h2>

      <FilterDropdown
        title="Select Date"
        isOpen={dropdownStates.date}
        setIsOpen={() => toggleDropdown("date")}
        selectedCount={startDate || endDate ? 1 : 0}
      >
        <div>
          <div className="flex flex-col mt-2">
            <h2 className="text-[#505254] mb-2">Start Date</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(startDate)}
                onChange={(date) => setStartDate(date)}
                sx={{
                  fontFamily: "Poppins",
                  height: "40px",
                  borderRadius: "30px",
                  // padding: "5px 10px",
                  fontSize: "15px",
                  marginRight: "1rem",
                  "& input": {
                    padding: "5px 10px", // Adjust padding inside input
                  },
                  "& .MuiInputBase-root": {
                    padding: "3px 8px",
                    // borderRadius: "30px",
                    border: "1px solid #6F84F8",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="flex flex-col mt-2">
            <h2 className="text-[#505254] mb-2">End Date</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(endDate)}
                onChange={(date) => setEndDate(date)}
                sx={{
                  fontFamily: "Poppins",
                  height: "40px",
                  borderRadius: "30px",
                  // padding: "5px 10px",
                  fontSize: "15px",
                  marginRight: "1rem",
                  "& input": {
                    padding: "5px 10px", // Adjust padding inside input
                  },
                  "& .MuiInputBase-root": {
                    // Customize input field container
                    padding: "3px 8px", // Adjust padding inside input

                    border: "1px solid #6F84F8",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </FilterDropdown>

      {Object.entries({
        tenant: "Select Tenant",
        hcm: "Select HCM",
        status: "Visit Status",
      }).map(([key, title]) => (
        <FilterDropdown
          key={key}
          title={title}
          isOpen={dropdownStates[key]}
          setIsOpen={() => toggleDropdown(key)}
          selectedCount={selectedValues[key].length}
        >
          <Select
            options={filterData[key]} // Dynamic options based on key
            value={filterData[key].filter(
              (option) => selectedValues[key]?.includes(option.value) // Match selected values correctly
            )}
            onChange={(selectedOptions) =>
              handleSelectionChange(key, selectedOptions)
            }
            isMulti
            isClearable
            placeholder={`Choose ${key}s...`}
          />
        </FilterDropdown>
      ))}

      <div className="flex items-center gap-2 justify-end mt-6">
        <button
          className="px-2 py-1 border border-[#F57070] text-[#F57070] rounded-lg hover:bg-[#F57070] hover:text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-2 py-1 border border-[#6F84F8] text-[#6F84F8] rounded-lg hover:bg-[#6F84F8] hover:text-white"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default VisitFilter;
