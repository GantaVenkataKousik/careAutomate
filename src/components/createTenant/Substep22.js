import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Importing the trash icon

export default function Substep22() {
  const [activeTab, setActiveTab] = useState('Checklist');

  const tabs = ['Checklist', 'InTake', 'Training', 'Performance', 'Resignation'];
  return (
    <div className="p-4">
      {/* Documentation aligned left */}
      <h2 className="text-left mb-2">Documentation</h2>

      {/* Checklist links */}
      {/* <div className="flex space-x-4 mt-2">
                <span className="text-blue-600 hover:underline cursor-pointer">Checklist</span>
                <span className="text-blue-600 hover:underline cursor-pointer">InTake</span>
                <span className="text-blue-600 hover:underline cursor-pointer">Training</span>
                <span className="text-blue-600 hover:underline cursor-pointer">Performance</span>
                <span className="text-blue-600 hover:underline cursor-pointer">Resignation</span>
            </div> */}
      <div>
        {/* Tab Navigation */}
        <div className="flex space-x-4 mt-10 ml-6">
          {tabs.map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 rounded-t-md ${activeTab === tab
                ? 'text-white bg-[#92A1F2]'
                : 'hover:text-white hover:bg-[#92A1F2]'
                }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <br></br>
      {/* Housing Focused Person Centered Plan */}
      <p className="text mt-2 ml-10 text-left">Housing Focused Person Centered Plan</p>
      <br></br>
      {/* Flexbox layout for button and delete icon */}
      <div className="flex items-center mt-4">
        {/* Centering the button */}
        <div className="flex-grow flex justify-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Fill & Submit
          </button>
        </div>
        {/* Aligning the delete icon to the extreme right */}
        <FaTrash className="ml-4 text-gray-500 cursor-pointer hover:text-red-700" />
      </div>
    </div>
  );
}




