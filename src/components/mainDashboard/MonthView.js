import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { appointmentFilter } from "../../utils/appointmentsFilter";

const localizer = momentLocalizer(moment);

const MonthView = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
        setAppointments(mappedAppointments);
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

  const handleMonthChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(e.target.value);
    setSelectedDate(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(e.target.value);
    setSelectedDate(newDate);
  };

  const events = appointmentFilter(appointments);

  return (
    <div style={{ marginTop: '-10px', marginBottom: '10px' }}>
      <div className="flex justify-end mb-2">
        <select value={selectedDate.getMonth()} onChange={handleMonthChange}>
          {moment.months().map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select value={selectedDate.getFullYear()} onChange={handleYearChange}>
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month"]}
        date={selectedDate}
        onNavigate={(date) => setSelectedDate(date)}
        toolbar={false}
        style={{ width: "70vh", height: "30vh", marginTop: "-2vh" }}
        eventPropGetter={(event) => {
          let color = "";
          switch (event.status) {
            case "Pending":
              color = "#6F84F8";
              break;
            case "Completed":
              color = "#6DD98C";
              break;
            case "Cancelled":
              color = "red";
              break;
            default:
              color = "#D5D8DC";
          }
          return {
            style: {
              backgroundColor: color,
              borderRadius: "5px",
              padding: "5px",
              marginTop: "-10px",
            },
          };
        }}
      />
    </div>
  );
};

export default MonthView;