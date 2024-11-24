import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleAppointment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('13:00');
  const [endTime, setEndTime] = useState('17:00');
  const [frequency, setFrequency] = useState('once');
  const [interval, setInterval] = useState(2);
  const [occurrences, setOccurrences] = useState(10);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MMM d, yyyy"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-gray-700">From</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">To</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Frequency</label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="once"
            name="frequency"
            value="once"
            checked={frequency === 'once'}
            onChange={() => setFrequency('once')}
            className="mr-2"
          />
          <label htmlFor="once">Only once</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="recurring"
            name="frequency"
            value="recurring"
            checked={frequency === 'recurring'}
            onChange={() => setFrequency('recurring')}
            className="mr-2"
          />
          <label htmlFor="recurring">Every</label>
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="border p-1 rounded mx-2 w-12"
            disabled={frequency !== 'recurring'}
          />
          <select
            className="border p-1 rounded"
            disabled={frequency !== 'recurring'}
          >
            <option value="weeks">weeks</option>
            <option value="days">days</option>
          </select>
        </div>
      </div>

      {frequency === 'recurring' && (
        <div className="mb-4">
          <label className="block text-gray-700">End after</label>
          <input
            type="number"
            value={occurrences}
            onChange={(e) => setOccurrences(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <span className="text-gray-500">occurrences</span>
        </div>
      )}

      <div className="flex justify-between">
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          Back
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
