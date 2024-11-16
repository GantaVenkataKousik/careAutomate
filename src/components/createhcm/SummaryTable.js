import React from 'react';

const SummaryTable = ({ selectedServices, servicesInfo }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Summary Table</h3>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Service Type</th>
            <th className="py-2 px-4 border">Units</th>
            <th className="py-2 px-4 border">Bill Rate</th>
            <th className="py-2 px-4 border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {selectedServices.map((service, index) => {
            const serviceInfo = servicesInfo[service.description];
            const amount = (serviceInfo?.units || 0) * service.billRate;

            return (
              <tr key={index}>
                <td className="py-2 px-4 border">{service.description}</td>
                <td className="py-2 px-4 border">{serviceInfo?.units || 0}</td>
                <td className="py-2 px-4 border">{service.billRate}</td>
                <td className="py-2 px-4 border">{amount.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;