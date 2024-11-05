import React, { useState } from 'react';

const BillingPayments = () => {

  const [checkedItems, setCheckedItems] = useState({
    selectAll: false,
    item1: false,
    item2: false,
    item3: false, // Add as many checkboxes as needed
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


  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold text-indigo-400 mb-6">
          Tom Hank's Billing and Payments :
        </h1>
        <div className="text-2xl font-bold md-6 cursor-pointer">
          <i class="fa-solid fa-download"></i></div>
        {/* Date Filters and Buttons */}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        {/* Date Pickers */}
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
        <div className="flex items-center gap-2 mt-8">
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
        </button>
      </div>

      {/* Info Cards */}
      <div className="flex flex-col md:flex-row items-center mb-8 gap-10">
        {/* Amount Card */}
        <div className="p-6 bg-white rounded-lg shadow-md shadow-indigo-400 border">
          <h3 className="font-semibold text-indigo-400 mb-2">Amount</h3>
          <div className="ml-3">
            <table className="table-auto w-full">
              <tr><td><p className="text-green-500">Billed</p></td> <td><p className="text-green-500">$150</p></td></tr>
              <tr><td><p className="text-red-500">UnBilled</p></td> <td><p className="text-red-500">$89</p></td></tr>
              <tr><td><p className="text-orange-500">Received</p></td> <td><p className="text-orange-500">$89</p></td></tr>
              <tr><td><p className="text-yellow-500">Waiting for Payments</p></td> <td><p className="text-yellow-500">$89</p></td></tr>
            </table>
          </div>
        </div>

        {/* Visits Card */}
        <div className="p-6 pb-12 bg-white rounded-lg shadow-md shadow-indigo-400 border">
          <h3 className="font-semibold text-indigo-400 mb-2">Visits</h3>
          <div className="ml-3">
            <table className="table-auto w-full">
              <tr><td><p className="text-green-500">Completed</p></td> <td><p className="text-green-500">150</p></td></tr>
              <tr><td><p className="text-red-500">Billed</p></td> <td><p className="text-red-500">89</p></td></tr>
              <tr><td><p className="text-yellow-500">Waiting for Decision</p></td> <td><p className="text-yellow-500">89</p></td></tr>
            </table>
          </div>
        </div>

        {/* Worked Hours Card */}
        <div className="p-6 pb-12 bg-white rounded-lg shadow-md shadow-indigo-400 border">
          <h3 className="font-semibold text-indigo-400 mb-2">Worked Hours</h3>
          <div className="ml-3">
            <table className="table-auto w-full">
              <tr><td><p className="text-green-500">Worked Hours</p></td> <td><p className="text-green-500">20 (80 Units)</p></td></tr>
              <tr><td><p className="text-red-500">Billed Hours</p></td> <td><p className="text-red-500">10 (40 Units)</p></td></tr>
              <tr><td><p className="text-yellow-500">UnBilled Hours</p></td> <td><p className="text-yellow-500">10 (40 Units)</p></td></tr>
            </table>
          </div>
        </div>
      </div>

      {/* SA-Housing Transition Section */}
      <div className="flex flex-col md:flex-row items-center mb-8 gap-10">
        <div className="p-6 bg-white rounded-lg shadow-md shadow-indigo-400 border">
          <h3 className="font-semibold text-indigo-400 mb-2">
            SA- Housing Transition (05/01/2024 - 10/31/2024)
          </h3>
          <div className="ml-3">
            <table className="table-auto w-full">
              <tr><td><p className="text-green-500">Allotted Hours</p></td> <td><p className="text-green-500">150(600 Units)</p></td></tr>
              <tr><td><p className="text-red-500">Worked Hours</p></td> <td><p className="text-red-500">150(600 Units)</p></td></tr>
              <tr><td><p className="text-yellow-500">Remaining Hours</p></td> <td><p className="text-yellow-500">150(600 Units)</p></td></tr>
            </table>
          </div>
        </div>
      </div>

      {/* Billing Table */}
      <div className="mt-10">
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
            {/* Sample Row */}

            {/* Add more rows as needed */}


            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item1" onChange={handleCheckboxChange} checked={checkedItems.item1} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item2" onChange={handleCheckboxChange} checked={checkedItems.item2} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item3" onChange={handleCheckboxChange} checked={checkedItems.item3} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item4" onChange={handleCheckboxChange} checked={checkedItems.item4} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item5" onChange={handleCheckboxChange} checked={checkedItems.item5} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item6" onChange={handleCheckboxChange} checked={checkedItems.item6} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item7" onChange={handleCheckboxChange} checked={checkedItems.item7} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item8" onChange={handleCheckboxChange} checked={checkedItems.item8} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item9" onChange={handleCheckboxChange} checked={checkedItems.item9} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item10" onChange={handleCheckboxChange} checked={checkedItems.item10} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item11" onChange={handleCheckboxChange} checked={checkedItems.item11} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item12" onChange={handleCheckboxChange} checked={checkedItems.item12} />
              </td>
            </tr>

            <tr>
              <td className="p-2">09/01/24</td>
              <td className="p-2">01:00 Hrs</td>
              <td className="p-2">Rick John</td>
              <td className="p-2">H2015 U8</td>
              <td className="p-2">Indirect</td>
              <td className="p-2">Not Billed</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">$70.00</td>
              <td className="p-2">09/15/24</td>
              <td className="p-2">Health Partners</td>
              <td className="p-2 text-center">
                <input type="checkbox" name="item13" onChange={handleCheckboxChange} checked={checkedItems.item13} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingPayments;