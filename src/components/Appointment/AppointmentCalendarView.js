import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { appointmentFilter } from "../../utils/appointmentsFilter";
import "../../styles/customCalendarStyles.scss"; // Import your custom SASS file

// Initialize localizer for moment.js
const localizer = momentLocalizer(moment);

// // Custom Event Component
// const CustomEvent = ({ event }) => {
//   return (
//     <div className="custom-event-container">
//       <div className="event-header">
//         <span className="event-title">{event.title}</span>
//         {/* <span className="event-status">{event.status}</span> */}
//       </div>
//       {/* <div className="event-time">{`${moment(event.start).format("hh:mm A")} - ${moment(event.end).format("hh:mm A")}`}</div> */}
//       {event.description && (
//         <div className="event-description">{event.description}</div>
//       )}
//     </div>
//   );
// };

const AppointmentCalendarView = ({ appointments }) => {
  // Apply the filter to the appointments
  console.log(appointments);
  const events = appointmentFilter(appointments);

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
          let color = "";
          switch (event.status) {
            case "Pending":
              color = "#6F84F8"; // Green
              break;
            case "Completed":
              color = "#6DD98C"; // Blue
              break;
            case "Cancelled":
              color = "red"; // Yellow
              break;
            default:
              color = "#D5D8DC"; // Default gray
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

export default AppointmentCalendarView;
