import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Base styles
import "./CalendarStyle.css"; // Custom styles

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  // List of marked dates
  const markedDates = [
    new Date(2024, 11, 12), // Example marked date (December 12, 2024)
    new Date(2024, 11, 13), // Example consecutive date (December 13, 2024)
    new Date(2024, 11, 14), // Example consecutive date (December 14, 2024)
    new Date(2024, 11, 25), // Another marked date (December 25, 2024)
  ];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleHover = (date) => {
    setHoveredDate(date); // Set the hovered date
  };

  const handleLeave = () => {
    setHoveredDate(null); // Reset the hovered date
  };

  // Check if a date is marked
  const isMarked = (date) => {
    return markedDates.some(
      (markedDate) => markedDate.toDateString() === date.toDateString()
    );
  };

  // Function to find and return the start and end of the consecutive range
  const getConsecutiveRange = (dates) => {
    const sortedDates = dates.sort((a, b) => a - b);
    const ranges = [];
    let rangeStart = sortedDates[0];
    let rangeEnd = sortedDates[0];

    for (let i = 1; i < sortedDates.length; i++) {
      const current = sortedDates[i];
      const diffInTime = current - rangeEnd;

      if (diffInTime === 86400000) {
        // Consecutive day (1 day difference)
        rangeEnd = current;
      } else {
        ranges.push([rangeStart, rangeEnd]);
        rangeStart = current;
        rangeEnd = current;
      }
    }

    // Add the last range
    ranges.push([rangeStart, rangeEnd]);
    return ranges;
  };

  // Get the ranges of consecutive dates
  const consecutiveRanges = getConsecutiveRange(markedDates);

  // Check if the date is part of any consecutive range
  const isInRange = (date) => {
    return consecutiveRanges.some(
      ([start, end]) => date >= start && date <= end
    );
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="relative">
        <Calendar
          onChange={handleDateChange}
          value={date}
          next2Label={null}
          prev2Label={null}
          view="month"
          tileClassName={({ date }) => {
            if (isInRange(date)) return "react-calendar__tile--range"; // Apply the same background for range
            return isMarked(date) ? "highlight-today" : "";
          }}
          onMouseOver={({ date }) => handleHover(date)} // Hover over a tile
          onMouseOut={handleLeave} // Remove hover
        />
        {hoveredDate && isMarked(hoveredDate) && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 p-2 bg-black text-white rounded-lg shadow-lg text-xs tooltip">
            {`This is a special day: ${hoveredDate.toDateString()}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCalendar;
