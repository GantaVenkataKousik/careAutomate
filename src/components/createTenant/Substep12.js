
import React, { useState } from 'react';
import { FaFolder } from 'react-icons/fa'; // Importing the folder icon
import FileInfoBox from './Substep32'; // Importing FileInfoBox component

const Substep1 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
  const [selectedYear, setSelectedYear] = useState(''); // State to track which year was clicked
  const [activeTab, setActiveTab] = useState('Checklist');

  const tabs = ['Checklist', 'InTake', 'Training', 'Performance', 'Resignation'];


  // Function to open the popup and set the year
  const openPopup = (year) => {
    setSelectedYear(year);
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4">
      {/* Documentation aligned left */}
      <h2 className="text-left mb-2">Documentation</h2>

    
      <div>
      {/* Tab Navigation */}
      <div className="flex space-x-4 mt-10 ml-6">
        {tabs.map((tab) => (
       
        <span
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`cursor-pointer px-4 py-2 rounded-t-md ${
          activeTab === tab
            ? 'text-white bg-[#92A1F2]'
            : 'hover:text-white hover:bg-[#92A1F2]'
        }`}
      >
        {tab}
      </span>
        ))}
      </div>

  
    </div>
      <br />

      {/* File Icons and Years */}
      <div className="grid grid-cols-5 gap-4 mt-4">
        {['2024', '2023', '2022', '2021', '2020'].map((year) => (
          <div
            key={year}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => openPopup(year)} // Trigger popup on click
          >
            <div className="p-2 rounded-md">
              <FaFolder className="text-gray-500 text-3xl" />
            </div>
            <span className="mt-1">{year}</span>
          </div>
        ))}
      </div>

      {/* Second Row of File Icons and Years */}
      <div className="grid grid-cols-5 gap-4 mt-2">
        {['2019', '2018', '2017', '2016'].map((year) => (
          <div
            key={year}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => openPopup(year)} // Trigger popup on click
          >
            <div className="p-2 rounded-md">
              <FaFolder className="text-gray-500 text-3xl" />
            </div>
            <span className="mt-1">{year}</span>
          </div>
        ))}
      </div>

      {/* Popup for FileInfoBox */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg relative w-4/5 max-w-2xl"> {/* Increased width */}
            <button
              className="absolute top-2 right-2 bg-white-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closePopup} // Close button for the popup
            >
              <span className=" text-md">❌</span> {/* Circle close icon */}
            </button>
            {/* Pass the selected year to FileInfoBox */}
            <FileInfoBox year={selectedYear} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Substep1;



