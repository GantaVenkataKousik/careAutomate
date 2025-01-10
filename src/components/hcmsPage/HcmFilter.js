import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Select from "react-select";
import { BASE_URL } from "../../config";

const DropdownFilter = ({
  title,
  items,
  selectedItems = [],
  setSelectedItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemChange = (item) => {
    if (Array.isArray(selectedItems)) {
      setSelectedItems(
        selectedItems.includes(item)
          ? selectedItems.filter((i) => i !== item)
          : [...selectedItems, item]
      );
    }
  };

  return (
    <div className="flex flex-col mb-2">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleDropdown}
      >
        <span
          className={`flex gap-2 text-lg font-bold ${isOpen ? "text-[#6F84F8]" : "text-[#333]"}`}
        >
          {title}{" "}
          <span
            className={`${isOpen ? "block" : "hidden"} h-6 w-6 flex items-center justify-center rounded-full font-bold text-lg p-2 bg-[#6F84F8] text-white`}
          >
            {selectedItems.length}
          </span>
        </span>
        <span
          className={`transform transition-all ${isOpen ? "rotate-180" : ""}`}
        >
          <FaChevronDown className={`${isOpen ? "text-[#6F84F8]" : ""}`} />
        </span>
      </div>
      {isOpen && (
        <ul className="mt-2 p-2 h-30 overflow-y-auto bg-white tenant-visits-scrollbar">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center p-1 cursor-pointer hover:bg-gray-200"
            >
              <input
                type="checkbox"
                id={item}
                checked={selectedItems.includes(item)}
                onChange={() => handleItemChange(item)}
                className="mr-2"
              />
              <label htmlFor={item} className="text-sm text-[#555]">
                {item}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const HcmFilter = () => {
  const [filters, setFilters] = useState({
    employeeTitle: [],
    employeeStatus: [],
  });
  const [selectedTenant, setSelectedTenant] = useState([]);
  const [selectTenantOpen, setSelectedTenantOpen] = useState(false);
  const [tenantOptions, setTenantOptions] = useState([
    { value: "tenant1", label: "Tenant One" },
    { value: "tenant2", label: "Tenant Two" },
    { value: "tenant3", label: "Tenant Three" },
    { value: "tenant4", label: "Tenant Four" },
  ]);
  const dropdownData = [
    {
      title: "Employee Title",
      key: "employeeTitle",
      items: ["HCM", "Admin", "CEO", "Consultant"],
    },
    {
      title: "Employee Status",
      key: "employeeStatus",
      items: ["Pre Employee", "Full Time", "Part Time", "Contract"],
    },
    {
      title: "City",
      key: "cities",
      items: ["Bemidji", "Brooklyn", "Fridley", "St. Cloud"],
    },
  ];

  // Example tenant names for the Select component
  //   const tenantOptions = [

  //   ];

  const updateSelectedItems = (key, selectedItems) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: selectedItems,
    }));
  };

  const handleApply = () => {
    const noFiltersSelected = Object.values(filters).every(
      (selectedItems) => selectedItems.length === 0
    );

    if (noFiltersSelected && selectedTenant.length === 0) {
      console.log("No filters or tenants are selected.");
    } else {
      console.log("Selected Filters:", filters);
      console.log("Selected Tenants:", selectedTenant);
    }
  };

  const handleCancel = () => {
    setFilters({
      employeeTitle: [],
      employeeStatus: [],
    });
    setSelectedTenant([]);
  };

  useEffect(() => {
    const fetchAllTenants = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${BASE_URL}/tenant/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const formattedTenants = data.response.map((tenant) => ({
          value: tenant.info_id,
          label: tenant.name,
        }));
        setTenantOptions(formattedTenants);
      } catch (error) {
        console.log("Error fetching tenants:", error);
      }
    };

    fetchAllTenants();
  }, []);

  return (
    <div className="flex flex-col h-full w-full p-2 py-4">
      <h2 className="flex justify-center text-xl text-[#6F84F8] mb-2 font-bold">
        Filter
      </h2>

      {/* Dynamically render DropdownFilters */}
      {dropdownData.map(({ title, key, items }) => (
        <DropdownFilter
          key={key}
          title={title}
          items={items}
          selectedItems={filters[key]}
          setSelectedItems={(selectedItems) =>
            updateSelectedItems(key, selectedItems)
          }
        />
      ))}

      {/* Custom Tenant Dropdown with Multiple Selection */}
      <div className="flex flex-col mb-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setSelectedTenantOpen(!selectTenantOpen)}
        >
          <span
            className={`flex gap-2 text-lg font-bold ${selectTenantOpen ? "text-[#6F84F8]" : "text-[#333]"}`}
          >
            Select Tenant
            <span
              className={`${selectTenantOpen ? "block" : "hidden"} h-6 w-6 flex items-center justify-center rounded-full font-bold text-lg p-2 bg-[#6F84F8] text-white`}
            >
              {selectedTenant.length}
            </span>
          </span>
          <span
            className={`transform transition-all ${
              selectTenantOpen ? "rotate-180" : ""
            }`}
          >
            <FaChevronDown
              className={`${selectTenantOpen ? "text-[#6F84F8]" : ""}`}
            />
          </span>
        </div>
        {selectTenantOpen && (
          <Select
            options={tenantOptions}
            value={tenantOptions.filter((option) =>
              selectedTenant.includes(option.value)
            )}
            onChange={(selectedOptions) =>
              setSelectedTenant(
                selectedOptions ? selectedOptions.map((o) => o.value) : []
              )
            }
            isMulti
            isClearable
            placeholder="Choose tenants..."
            styles={{
              container: (base) => ({ ...base, marginTop: "0.5rem" }),
            }}
          />
        )}
      </div>

      {/* Buttons */}
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

export default HcmFilter;
