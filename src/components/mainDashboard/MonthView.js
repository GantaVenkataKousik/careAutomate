import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { appointmentFilter } from "../../utils/appointmentsFilter";
// Create a localizer for the calendar using moment.js
const localizer = momentLocalizer(moment);

const MonthView = () => {
  // Example events with title, start and end time, and description
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    try {
      const response = await axios.post(
        "https://careautomate-backend.vercel.app/tenant/get-appointments",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.appointments) {
        const mappedAppointments = response.data.appointments.map((apt) => ({
          id: apt._id,
          date: new Date(apt.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          time: `${apt.startTime} – ${apt.endTime}`,
          location: apt.placeOfService || "N/A",
          from: apt.hcmDetails?.name || "Unknown",
          service: apt.serviceType || "Unknown",
          with: apt.tenantDetails?.name || "Unknown",
          status: apt.status.charAt(0).toUpperCase() + apt.status.slice(1),
        }));
        setAppointments(mappedAppointments); // This will update both list and calendar views
      } else {
        console.error("Failed to fetch appointment data");
      }
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const events = appointmentFilter(appointments);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={""}
        style={{ width: "60vh" }}
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
