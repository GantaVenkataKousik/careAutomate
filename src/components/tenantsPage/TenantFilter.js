import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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
        <ul className="mt-2 p-2 h-40 overflow-y-auto bg-white tenant-visits-scrollbar">
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

const TenantFilter = ({ onFilterUpdate }) => {
  const [filters, setFilters] = useState({
    services: [],
    insurances: [],
    cities: [],
  });

  const dropdownData = [
    {
      title: "Service Type",
      key: "services",
      items: [
        "Housing Consultation",
        "Housing Transition",
        "Housing Sustaining",
        "Moving Expenses",
      ],
    },
    {
      title: "City",
      key: "cities",
      items: [
        "Bemidji",
        "Brooklyn",
        "Fridley",
        "St. Cloud",
        "Brooklyn Center",
        "Bhimavaram",
      ],
    },
    {
      title: "Insurance Type",
      key: "insurances",
      items: [
        "Medical Assistance",
        "Blue Plus",
        "Health Partners",
        "Hennepin Health",
        "IMCare",
        "Medica",
        "PrimeWest",
        "SouthCountry",
        "UCare",
        "United Healthcare",
      ].map((item) => item.toLowerCase()),
    },
  ];

  const updateSelectedItems = (key, selectedItems) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [key]: selectedItems,
      };
      return newFilters;
    });
  };

  const handleApply = () => {
    onFilterUpdate(filters);
  };

  const handleCancel = () => {
    const emptyFilters = {
      services: [],
      insurances: [],
      cities: [],
    };
    setFilters(emptyFilters);
    onFilterUpdate(emptyFilters);
  };

  return (
    <div className="flex flex-col h-full w-full p-2 py-4">
      <h2 className="flex justify-center text-xl text-[#6F84F8] mb-2 font-bold">
        Filter
      </h2>

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

export default TenantFilter;
