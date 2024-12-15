import React from "react";
import MyCalendar from "../MyCalendar";
import MyCalendar2 from "../Mycalendar2";
import AppointmentCalendarView from "../../Appointment/AppointmentCalendarView";
import MonthView from "../MonthView";
import ReactApexChart from "react-apexcharts";

const WeeklySchedule = () => {
  const [timeRange, setTimeRange] = React.useState("Jan 2024 - Jun 2024");

  return (
    <div className="flex flex-col px-2 py-1 border-2 rounded-3xl shadow-md h-25vh">
      <div className="flex items-center justify-between mt-2">
        <h2 className="mt-2 ml-4 text-m">
          Weekly Schedule Calendar ( All HCM’s )
        </h2>
        <div className="flex justify-end">
          <select
            onChange={(e) => setTimeRange(e.target.value)}
            value={timeRange}
          >
            <option value="Jan 2024 - Jun 2024">Jan 2024 - Jun 2024</option>
            <option value="Jul 2024 - Dec 2024">Jul 2024 - Dec 2024</option>
            <option value="Jan 2025 - Jun 2025">Jan 2025 - Jun 2025</option>
          </select>
        </div>
      </div>

      <div className="flex justify-evenly mt-5 ">
        <MyCalendar2 />
        <MonthView />
        {/* <AppointmentCalendarView appointments={[]} /> */}
      </div>
    </div>
  );
};

export default WeeklySchedule;
