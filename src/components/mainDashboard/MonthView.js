import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { appointmentFilter } from "../../utils/appointmentsUtils/appointmentsFilter";
import { BASE_URL } from "../../config";

const localizer = momentLocalizer(moment);

const MonthView = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/tenant/get-appointments`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.response) {
        const mappedAppointments = response.data.response.map((apt) => {
          const startDateTime = new Date(
            `${apt.date.split("T")[0]}T${apt.startTime}`
          );
          const endDateTime = new Date(
            `${apt.date.split("T")[0]}T${apt.endTime}`
          );
          return {
            id: apt._id,
            date: new Date(apt.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            }),
            startDate: apt.date,
            startTime: apt.startTime,
            endTime: apt.endTime,
            location: apt.placeOfService || "N/A",
            from: apt.hcmDetails?.name || "N/A",
            service: apt.serviceType || "N/A",
            with: apt.tenantDetails?.name || "N/A",
            status: apt.status.charAt(0).toUpperCase() + apt.status.slice(1),
            hcmId: apt.hcmId?._id,
            tenantId: apt.tenantDetails?._id,
            activity: apt.activity || "N/A",
            methodOfContact: apt.methodOfContact || "in-person",
            // You can add 'reasonForRemote' if necessary
          };
        });
        setAppointments(mappedAppointments);
        // console.log("Mapped: ", mappedAppointments);
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
    <div style={{ marginTop: "-10px", marginBottom: "10px" }}>
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
        views={["month", "week", "day"]}
        date={selectedDate}
        onNavigate={(date) => setSelectedDate(date)}
        // toolbar={false}
        style={{ height: "60vh" }}
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
              marginTop: "-10px",
              width: "165px",
            },
          };
        }}
      />
    </div>
  );
};

export default MonthView;
