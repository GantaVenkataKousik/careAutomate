import React, { useEffect, useState } from 'react';
import { API_ROUTES } from '../routes';
import { useLocation } from "react-router-dom";

const BillingPayments = () => {
  const location = useLocation();
  const { tenantId } = location.state || {};
  const [pendingBills, setPendingBills] = useState([]);
  const [completedBills, setCompletedBills] = useState([]);
  const [totalBilled, setTotalBilled] = useState(0);
  const [totalUnbilled, setTotalUnbilled] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalWaiting, setTotalWaiting] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [billedCount, setBilledCount] = useState(0);
  const [unbilledCount, setUnbilledCount] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [workedHours, setWorkedHours] = useState(0);
  const [billedHours, setBilledHours] = useState(0);
  const [unbilledHours, setUnbilledHours] = useState(0);
  const [planUsage, setPlanUsage] = useState({});
  const [selectedTransitionPeriod, setSelectedTransitionPeriod] = useState('');
  const [selectedSustainingPeriod, setSelectedSustainingPeriod] = useState('');

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlanUsage = async () => {
      try {
        const response = await fetch(API_ROUTES.BILLING.PLAN_USAGE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tenantId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plan usage');
        }

        const data = await response.json();
        console.log(data);
        setPlanUsage(data.response);
        setSelectedTransitionPeriod(data.response["Housing Transition"].period);
        setSelectedSustainingPeriod(data.response["Housing Sustaining"].period);
      } catch (error) {
        console.error('Error fetching plan usage:', error);
      }
    };

    fetchPlanUsage();
  }, [token]);

  const handleTransitionPeriodChange = (event) => {
    setSelectedTransitionPeriod(event.target.value);
  };

  const handleSustainingPeriodChange = (event) => {
    setSelectedSustainingPeriod(event.target.value);
  };

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch(API_ROUTES.BILLING.BILLS_PENDING_BY_TENANT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tenantId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bills');
        }

        const data = await response.json();
        console.log(data);
        setPendingBills(data.response.Bills || []);

        // Calculate totals for pending bills
        let unbilledAmount = 0;
        let waitingAmount = 0;
        let unbilledCount = 0;
        let waitingCount = 0;
        let unbilledHours = 0;

        data.response.Bills.forEach(bill => {
          unbilledCount += 1;
          waitingCount += 1;
          bill.serviceLine.forEach(line => {
            unbilledAmount += line.lineItemChargeAmount;
            waitingAmount += line.lineItemChargeAmount;
            unbilledHours += line.serviceUnitCount;
          });
        });

        setUnbilledCount(unbilledCount);
        setWaitingCount(waitingCount);
        setTotalUnbilled(unbilledAmount);
        setTotalWaiting(waitingAmount);
        setUnbilledHours(unbilledHours);

      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    const fetchCompletedBills = async () => {
      try {
        const response = await fetch(API_ROUTES.BILLING.BILLS_COMPLETED_BY_TENANT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tenantId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch completed bills');
        }

        const data = await response.json();
        console.log(data);
        setCompletedBills(data.response.Bills || []);

        // Calculate totals for completed bills
        let completedAmount = 0;
        let billedAmount = 0;
        let completedCount = 0;
        let billedHours = 0;

        data.response.Bills.forEach(bill => {
          completedCount += 1;
          billedAmount += bill.serviceLine.reduce((sum, line) => sum + line.lineItemChargeAmount, 0);
          billedHours += bill.serviceLine.reduce((sum, line) => sum + line.serviceUnitCount, 0);
        });

        setTotalCompleted(completedCount);
        setTotalBilled(billedAmount);
        setBilledCount(completedCount);
        setBilledHours(billedHours);

      } catch (error) {
        console.error('Error fetching completed bills:', error);
      }
    };

    fetchBills();
    fetchCompletedBills();
  }, [tenantId, token]);

  const [checkedItems, setCheckedItems] = useState({
    selectAll: false,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
    item9: false,
    item10: false,
    item11: false,
    item12: false,
    item13: false,
  });

  const handleSelectAll = () => {
    const newState = !checkedItems.selectAll;
    setCheckedItems({
      selectAll: newState,
      item1: newState,
      item2: newState,
      item3: newState,
      item4: newState,
      item5: newState,
      item6: newState,
      item7: newState,
      item8: newState,
      item9: newState,
      item10: newState,
      item11: newState,
      item12: newState,
      item13: newState,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) {
      return 'N/A'; // Return 'N/A' or any default value if startTime or endTime is undefined
    }

    try {
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 'N/A'; // Skip if the date is invalid
      }

      const diff = (end - start) / (1000 * 60); // difference in minutes
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      return `${hours}h ${minutes}m`;
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'N/A'; // Return 'N/A' if there's an error parsing the date
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold text-indigo-400 mb-6">
          Tom Hank's Billing and Payments :
        </h1>
        <div className="text-2xl font-bold md-6 cursor-pointer">
          <i className="fa-solid fa-download"></i></div>
        {/* Date Filters and Buttons */}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        {/* Date Pickers
        <div className="flex items-center gap-2 mt-8">
          <input className="border rounded-full px-6 py-2 text-black border-blue-500" type="text" placeholder="Search Dates" />
        </div>
        <div className="flex flex-col items-left gap-2">
          <label className="font-semibold">Start Date</label>
          <input type="date" className="border rounded-full px-6 py-2 text-black border-blue-500" />
        </div>
        <div className="flex flex-col items-left gap-2">
          <label className="font-semibold">End Date</label>
          <input type="date" className="border rounded-full px-6 py-2 text-black border-blue-500" />
        </div>
        {/* Dropdown */}

        {/* <div className="flex items-center gap-2 mt-8">
          <select className="border rounded-full px-6 py-2 text-black border-blue-500">
            <option>All</option>
            <option>Bill</option>
            <option>ReBill</option>
          </select>
        </div>
        <button className="border rounded-full px-6 py-2 text-black border-blue-500 mt-8">
          Bill
        </button>
        <button className="border rounded-full px-6 py-2 text-black border-blue-500 mt-8">
          ReBill
        </button>
        <button className="border rounded-full px-6 py-2 text-black border-blue-500 mt-8">
          Replace
        </button>
        <button className="border rounded-full px-6 py-2 text-black border-blue-500 mt-8">
          Void
        </button> */}
      </div>

      {/* Info Cards */}
      <div className="flex flex-col md:flex-row items-center mb-8 gap-10">
        <div className="flex flex-col md:flex-row items-center mb-8 gap-10">
          {/* Amount Card */}
          <div className="p-6 bg-white rounded-lg shadow-md shadow-indigo-400 border">
            <h3 className="font-semibold text-indigo-400 mb-2">Amount</h3>
            <div className="ml-3">
              <table className="table-auto w-full">
                <tr><td><p className="text-green-500">Billed</p></td> <td><p className="text-green-500">${totalBilled.toFixed(2)}</p></td></tr>
                <tr><td><p className="text-red-500">UnBilled</p></td> <td><p className="text-red-500">${totalUnbilled.toFixed(2)}</p></td></tr>
                <tr><td><p className="text-orange-500">Received</p></td> <td><p className="text-orange-500">${totalReceived.toFixed(2)}</p></td></tr>
                <tr><td><p className="text-yellow-500">Waiting for Payments</p></td> <td><p className="text-yellow-500">${totalWaiting.toFixed(2)}</p></td></tr>
              </table>
            </div>
          </div>
        </div>

        {/* Visits Card */}
        <div className="p-6 pb-12 bg-white rounded-lg shadow-md shadow-indigo-400 border">
          <h3 className="font-semibold text-indigo-400 mb-2">Visits</h3>
          <div className="ml-3">
            <table className="table-auto w-full">
              <tr><td><p className="text-green-500">Completed</p></td> <td><p className="text-green-500">{totalCompleted} </p></td></tr>
              <tr><td><p className="text-red-500">UnBilled</p></td> <td><p className="text-red-500">{unbilledCount} </p></td></tr>
              <tr><td><p className="text-red-500">Billed</p></td> <td><p className="text-red-500">{billedCount} </p></td></tr>
              <tr><td><p className="text-yellow-500">Waiting for Decision</p></td> <td><p className="text-yellow-500">{waitingCount} </p></td></tr>
            </table>
          </div>
        </div>

        {/* Worked Hours Card */}
        <div className="p-6 pb-12 bg-white rounded-lg shadow-md shadow-indigo-400 border">
          <h3 className="font-semibold text-indigo-400 mb-2">Worked Hours</h3>
          <div className="ml-3">
            <table className="table-auto w-full">
              <tr><td><p className="text-green-500">Worked Hours</p></td> <td><p className="text-green-500">{workedHours} (Units)</p></td></tr>
              <tr><td><p className="text-red-500">Billed Hours</p></td> <td><p className="text-red-500">{billedHours} (Units)</p></td></tr>
              <tr><td><p className="text-yellow-500">UnBilled Hours</p></td> <td><p className="text-yellow-500">{unbilledHours} (Units)</p></td></tr>
            </table>
          </div>
        </div>
      </div>

      {/* Plan Usage Section */}
      <div className="flex flex-col md:flex-row items-center mb-8 gap-10">
        <div className="p-6 bg-white rounded-lg shadow-md shadow-indigo-400 border">
          <h3 className="font-semibold text-indigo-400 mb-2">Housing Transition</h3>
          <select value={selectedTransitionPeriod} onChange={handleTransitionPeriodChange} className="mb-4">
            <option value={planUsage["Housing Transition"]?.period}>{planUsage["Housing Transition"]?.period}</option>
          </select>
          <div className="ml-3">
            <table className="table-auto w-full">
              <tr>
                <td><p className="text-green-500">Allotted Hours</p></td>
                <td><p className="text-green-500">{planUsage["Housing Transition"]?.totalUnits?.toFixed(2) || '0.00'} Units</p></td>
              </tr>
              <tr>
                <td><p className="text-red-500">Worked Hours</p></td>
                <td><p className="text-red-500">{planUsage["Housing Transition"]?.workedUnits?.toFixed(2) || '0.00'} Units</p></td>
              </tr>
              <tr>
                <td><p className="text-yellow-500">Remaining Hours</p></td>
                <td><p className="text-yellow-500">{planUsage["Housing Transition"]?.unitsRemaining?.toFixed(2) || '0.00'} Units</p></td>
              </tr>
            </table>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md shadow-indigo-400 border">
          <h3 className="font-semibold text-indigo-400 mb-2">Housing Sustaining</h3>
          <select value={selectedSustainingPeriod} onChange={handleSustainingPeriodChange} className="mb-4">
            <option value={planUsage["Housing Sustaining"]?.period}>{planUsage["Housing Sustaining"]?.period}</option>
          </select>
          <div className="ml-3">
            <table className="table-auto w-full">
              <tr>
                <td><p className="text-green-500">Allotted Hours</p></td>
                <td><p className="text-green-500">{planUsage["Housing Sustaining"]?.totalUnits?.toFixed(2) || '0.00'} Units</p></td>
              </tr>
              <tr>
                <td><p className="text-red-500">Worked Hours</p></td>
                <td><p className="text-red-500">{planUsage["Housing Sustaining"]?.workedUnits?.toFixed(2) || '0.00'} Units</p></td>
              </tr>
              <tr>
                <td><p className="text-yellow-500">Remaining Hours</p></td>
                <td><p className="text-yellow-500">{planUsage["Housing Sustaining"]?.unitsRemaining?.toFixed(2) || '0.00'} Units</p></td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      {/* Billing Table */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-indigo-400 mb-4">Pending Bills</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left text-indigo-400">
              <th className="p-2">Schedule</th>
              <th className="p-2">Duration</th>
              <th className="p-2">HCM</th>
              <th className="p-2">Service Type</th>
              <th className="p-2">Visit Type</th>
              <th className="p-2">Bill Status</th>
              <th className="p-2">Bill Amount</th>
              <th className="p-2">Received Amount</th>
              <th className="p-2">Date of Bill</th>
              <th className="p-2">Payor</th>
              <th className="p-2 text-center"> Select All <input type="checkbox" onChange={handleSelectAll} checked={checkedItems.selectAll} /> </th>
            </tr>
          </thead>
          <tbody>
            {pendingBills.map((bill, index) => {
              const duration = calculateDuration(bill.visit.startTime, bill.visit.endTime);
              if (duration === 'N/A') return null; // Skip the record if duration is 'N/A'

              return (
                <tr key={bill._id}>
                  <td className="p-2">{new Date(bill.visit.date).toLocaleDateString()}</td>
                  <td className="p-2">{duration}</td>
                  <td className="p-2">{bill.renderingProvider.name}</td>
                  <td className="p-2">{bill.serviceType}</td>
                  <td className="p-2">{bill.visit.methodOfVisit}</td>
                  <td className="p-2">{bill.status}</td>
                  <td className="p-2">${bill.serviceLine.reduce((sum, line) => sum + line.lineItemChargeAmount, 0).toFixed(2)}</td>
                  <td className="p-2">$0.00</td> {/* Assuming no received amount is provided */}
                  <td className="p-2">{new Date(bill.hierarchicalTransaction.creationDate).toLocaleDateString()}</td>
                  <td className="p-2">{bill.payerName.name}</td>
                  <td className="p-2 text-center">
                    <input type="checkbox" name={`item${index + 1}`} onChange={handleCheckboxChange} checked={checkedItems[`item${index + 1}`]} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-indigo-400 mb-4">Completed Bills</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left text-indigo-400">
              <th className="p-2">Schedule</th>
              <th className="p-2">Duration</th>
              <th className="p-2">HCM</th>
              <th className="p-2">Service Type</th>
              <th className="p-2">Visit Type</th>
              <th className="p-2">Bill Status</th>
              <th className="p-2">Bill Amount</th>
              <th className="p-2">Received Amount</th>
              <th className="p-2">Date of Bill</th>
              <th className="p-2">Payor</th>
            </tr>
          </thead>
          <tbody>
            {completedBills.map((bill, index) => (
              <tr key={bill._id}>
                <td className="p-2">{new Date(bill.visit.date).toLocaleDateString()}</td>
                <td className="p-2">{calculateDuration(bill.visit.startTime, bill.visit.endTime)}</td>
                <td className="p-2">{bill.renderingProvider.name}</td>
                <td className="p-2">{bill.serviceType}</td>
                <td className="p-2">{bill.visit.methodOfVisit}</td>
                <td className="p-2">{bill.status}</td>
                <td className="p-2">${bill.serviceLine.reduce((sum, line) => sum + line.lineItemChargeAmount, 0).toFixed(2)}</td>
                <td className="p-2">$0.00</td> {/* Assuming no received amount is provided */}
                <td className="p-2">{new Date(bill.hierarchicalTransaction.creationDate).toLocaleDateString()}</td>
                <td className="p-2">{bill.payerName.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingPayments;