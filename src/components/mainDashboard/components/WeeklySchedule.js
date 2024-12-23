import React from "react";
import MyCalendar2 from "../Mycalendar2";
import MonthView from "../MonthView";

const WeeklySchedule = () => {
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col px-2 py-1 border-2 rounded-3xl shadow-md">
      <div className="flex items-center justify-between mt-2">
        <h2 className="mt-1 ml-4 text-m">
          Weekly Schedule Calendar ( All HCM’s )
        </h2>

      </div>

      <div className="flex justify-evenly mt-2">
        <MonthView />
      </div>
    </div>
  );
};

export default WeeklySchedule;