import React from 'react';
import { FaTrash, FaEdit, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // Importing icons
import { FolderIcon as FaFolder } from '@heroicons/react/24/outline';
export default function Substep32({ year }) { // Accepting the selected year as a prop
    return (
        <div className="border rounded-md p-4 shadow-md">
            {/* Header with file icon and year aligned to the left border */}
            <div className="flex flex-col items-start mb-4">
                <div className="flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full mt-1" style={{ marginLeft: '-25px', marginTop: '-28px' }}>
                <FaFolder className="text-gray-500 text-md" style={{ fill: '', stroke: 'gray' }} />
                </div>
                <span className="text-lg font-semibold" style={{ marginLeft: '-25px' }}>{year}</span> {/* Display the selected year */}
            </div>

            {/* Document details with titles */}
            <div className="flex justify-between font-semibold mb-2">
                <span className="flex-1 text-center">Document Name</span>
                <span className="flex-1 text-center">Status</span>
                <span className="flex-1 text-center">Submitted On</span>
                <span className="flex-1 text-center">Review Complete</span>
                <span className="flex-1 text-center">Actions</span>
            </div>

            {/* Example data row */}
            <div className="flex justify-between items-center mb-2">
                <span className="flex-1 text-center">Intake Form</span>
                <span className="flex-1 text-center">
                    Pending <FaExclamationCircle className="text-yellow-500 inline" />
                </span>
                <span className="flex-1 text-center">2/1/2023</span>
                <span className="flex-1 text-center">
                    <FaExclamationCircle className="text-red-500 inline" /> {/* Example of not completed */}
                </span>
                <span className="flex-1 text-center flex justify-center items-center space-x-2">
                    <FaTrash className="text-red-500 cursor-pointer hover:text-red-700" />
                    <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                </span>
            </div>

            {/* Additional example rows */}
            <div className="flex justify-between items-center mb-2">
                <span className="flex-1 text-center">Training Document</span>
                <span className="flex-1 text-center">
                    Complete <FaCheckCircle className="text-green-500 inline" />
                </span>
                <span className="flex-1 text-center">3/5/2023</span>
                <span className="flex-1 text-center">
                    <FaCheckCircle className="text-green-500 inline" />
                </span>
                <span className="flex-1 text-center flex justify-center items-center space-x-2">
                    <FaTrash className="text-red-500 cursor-pointer hover:text-red-700" />
                    <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                </span>
            </div>
        </div>
    );
}


