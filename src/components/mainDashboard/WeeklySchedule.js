import React from "react";
import MyCalendar from "./MyCalendar";
import MyCalendar2 from "./Mycalendar2";
import AppointmentCalendarView from "../Appointment/AppointmentCalendarView";
import MonthView from "./MonthView";

const WeeklySchedule = () => {
  return (
    <div className="flex flex-col px-2 py-1 border-2 rounded-3xl shadow-md">
      <div className="flex items-center justify-between ">
        <h2>Weekly Schedule Calendar ( All HCM’s )</h2>
        <div className="flex items-center border-2 rounded-3xl p-2">
          Jan 1, 2025 - Jan 7, 2025
        </div>
      </div>
      <div className="flex justify-between">
        <MyCalendar />

        <MyCalendar2 />
        {/* <AppointmentCalendarView appointments={[]} /> */}
        <MonthView />
      </div>
    </div>
  );
};

export default WeeklySchedule;
