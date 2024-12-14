import React, { useState } from "react";

const CommunicationsCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const sampleRecords = [
    {
      id: 1,
      name: "Robert John",
      date: "08-09-2024, 2:00 PM",
      description:
        "We'll meet tomorrow, also bring some additional documents...",
    },
    {
      id: 2,
      name: "Alice Smith",
      date: "08-09-2024, 3:00 PM",
      description:
        "Discussion about project updates. Make sure to prepare the latest stats.",
    },
    {
      id: 3,
      name: "Mark Brown",
      date: "08-10-2024, 1:00 PM",
      description:
        "Review meeting for the last quarter's performance and next steps.",
    },
    {
      id: 4,
      name: "Sarah",
      date: "08-11-2024, 4:00 PM",
      description:
        "Catch-up on the progress of ongoing tasks, please bring your reports.",
    },
    {
      id: 5,
      name: "Saraheu",
      date: "08-11-2024, 4:00 PM",
      description:
        "Catch-up on the progress of ongoing tasks, please bring your reports.",
    },
    {
      id: 6,
      name: "Saraheu",
      date: "08-11-2024, 4:00 PM",
      description:
        "Catch-up on the progress of ongoing tasks, please bring your reports.",
    },
  ];

  const togglePopup = (description = "") => {
    setIsPopupOpen(!isPopupOpen);
    setSelectedDescription(description);
  };

  return (
    <div className="w-1/2 bg-white p-6 shadow-lg rounded-2xl">
      <div className="flex items-center pb-1">
        <div className="flex justify-center items-center gap-2">
          <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
          <h2 className="text-2xl font-semibold text-[#6F84F8]">
            Communication
          </h2>
        </div>
      </div>
      <div className="flex justify-end p-2">
        <a href="/messages" className="text-[#6F84F8] hover:underline text-md">
          View More
        </a>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-[calc(5*5rem)] mt-2 tenant-visits-scrollbar">
        {sampleRecords.map((record) => (
          <div key={record.id} className="bg-blue-50 px-6 p-2 rounded-[20px]">
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800">{record.name}</p>
              <span className="text-sm text-gray-500">{record.date}</span>
            </div>
            <p
              className="text-gray-600 mt-2 cursor-pointer hover:text-blue-600"
              onClick={() => togglePopup(record.description)}
            >
              {record.description.length > 50
                ? `${record.description.substring(0, 50)}...`
                : record.description}
            </p>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem]">
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <p className="text-gray-700">{selectedDescription}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => togglePopup()}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationsCard;
