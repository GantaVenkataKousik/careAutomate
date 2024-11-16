import React from 'react';


const caregivers = [
  { name: 'John' },
  { name: 'Alice' },
  { name: 'David' },
  { name: 'Sophia' },
];

const services = ['Service1', 'Service2', 'Service3', 'Service4'];

const ServiceSelectionTable = ({ selectedServices, onServiceToggle }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 border"> {/* Reduced max width */}
      <table className="w-auto bg-white rounded-md overflow-hidden shadow-lg">
        <thead>
          <tr>
          <th className="border-r border-gray-300 px-4 py-2 text-center">Caregiver Name</th>
            {services.map(service => (
              <th key={service} className="border-r border-gray-300 px-4 py-2 text-center">{service}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {caregivers.map(caregiver => (
           <tr key={caregiver.name} className="">
              <td className="border-r border-gray-300 px-4 py-2 text-center">{caregiver.name}</td>
              {services.map(service => (
                 <td key={service} className="border-r border-gray-300 px-4 py-2 text-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 rounded-lg border border-gray-400" 
                      checked={selectedServices[caregiver.name]?.includes(service) || false}
                      onChange={() => onServiceToggle(caregiver.name, service)}
                    />
                    <span className="ml-2">{service}</span>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceSelectionTable;


