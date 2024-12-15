import React, { useState, useEffect } from "react";
import { LuMessagesSquare } from "react-icons/lu";
import InfoCard from "./InfoCard";
import WeeklySchedule from "./WeeklySchedule";

const MainDashboard = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center p-6">
        <div className="fex flex-col items-center">
          <div className="flex gap-5">
            <InfoCard
              count={15}
              description="New Messages"
              icon={<LuMessagesSquare color="#6F84F8" size="1.5rem" />}
            />
            <InfoCard
              count={20}
              description="New Visits Waiting for Decision"
            />
            <InfoCard count={18} description="Tenants running out of Visits" />
          </div>
          <WeeklySchedule />
        </div>
        visit compilance
      </div>
      financial flow
    </div>
  );
};

export default MainDashboard;
