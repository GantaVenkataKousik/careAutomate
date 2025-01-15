import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "../../styles/customCalendarStyles.scss"; // Import your custom SASS file
import { visitsFilter } from "../../utils/visitsUtils/visitsFilter";

// Initialize localizer for moment.js
const localizer = momentLocalizer(moment);

const VisitCalendarView = ({ visits }) => {
  const events = visitsFilter(visits);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        style={{ height: "80vh" }}
        eventPropGetter={(event) => {
          let backgroundColor = "#D5D8DC"; // Default gray

          if (event.status === "approved") {
            backgroundColor = "#6DD98C"; // Green for approved
          } else if (event.status === "rejected") {
            backgroundColor = "#FF6B6B"; // Red for rejected
          } else if (event.status === "pending") {
            backgroundColor = "#6F84F8"; // Purple for neither
          }

          return {
            style: {
              backgroundColor,
              borderRadius: "5px",
              padding: "5px",
              color: "#fff", // Ensure text is readable on dark backgrounds
            },
          };
        }}
      />
    </div>
  );
};

export default VisitCalendarView;
