import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Create a localizer for the calendar using moment.js
const localizer = momentLocalizer(moment);

const MonthView = () => {
  // Example events with title, start and end time, and description
  const events = [
    {
      title: "House Sustaining",
      start: new Date(2024, 11, 10, 10, 0), // December 10th, 2024, 10:00 AM
      end: new Date(2024, 11, 10, 11, 0), // December 10th, 2024, 11:00 AM
      description: "Alex with Bob",
      status: "Pending",
    },
    {
      title: "House Transition",
      start: new Date(2024, 11, 12, 14, 30), // December 12th, 2024, 2:30 PM
      end: new Date(2024, 11, 12, 16, 0), // December 12th, 2024, 4:00 PM
      description: "Sarah with John",
      status: "Completed",
    },
    {
      title: "House Sustaining",
      start: new Date(2024, 11, 15, 9, 0), // December 15th, 2024, 9:00 AM
      end: new Date(2024, 11, 15, 10, 30), // December 15th, 2024, 10:30 AM
      description: "Mike with Lisa",
      status: "Cancelled",
    },
    {
      title: "House Transition",
      start: new Date(2024, 11, 18, 13, 0), // December 18th, 2024, 1:00 PM
      end: new Date(2024, 11, 18, 15, 0), // December 18th, 2024, 3:00 PM
      description: "Emma with Chris",
      status: "Pending",
    },
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        // defaultView="month"
        views={"week"}
        // style={{ height: "80vh" }}
        eventPropGetter={(event) => {
          let color = "";
          switch (event.status) {
            case "Pending":
              color = "#6F84F8"; // Pending color (blue)
              break;
            case "Completed":
              color = "#6DD98C"; // Completed color (green)
              break;
            case "Cancelled":
              color = "red"; // Cancelled color (red)
              break;
            default:
              color = "#D5D8DC"; // Default color (gray)
          }
          return {
            style: {
              backgroundColor: color,
              borderRadius: "5px",
              padding: "5px",
            },
          };
        }}
      />
    </div>
  );
};

export default MonthView;
