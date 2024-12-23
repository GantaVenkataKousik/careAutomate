import React, { useState, useEffect } from "react";
import { API_ROUTES } from "../../routes";
import { formatTime, monthNames, today } from "../../utils/timeFilter";
import {
  FaBars,
  FaCheck,
  FaFileAlt,
  FaMicrophone,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const AppoinmentVisits = ({ hcmId }) => {
  const [appointments, setAppointments] = useState([]);
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVisits = async (hcmId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await fetch(`${API_ROUTES.VISITS}/filtervisits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hcmId }), // Use hcmId directly
      });
      if (!response.ok) {
        throw new Error("Failed to fetch visits");
      }
      const data = await response.json();
      setVisits(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
    }
  };

  const fetchAppointments = async (hcmId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await fetch(
        `${API_ROUTES.APPOINTMENTS}/filterAppointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ hcmId }), // Use hcmId directly
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      setAppointments(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(hcmId);
    fetchVisits(hcmId);
  }, []);
  return (
    <div className="flex gap-1  ">
      {/* Appointments */}
      <div className="flex  bg-white p-4 shadow-lg rounded-[20px] gap-5">
        <div className="w-[18rem] p-1">
          <div className="flex gap-2 items-center pb-3">
            <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
            <h2 className="text-2xl font-semibold text-[#6F84F8]">
              Appointments
            </h2>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6F84F8] mb-4 text-md">Today</span>
            <a
              href="/appointments"
              className="text-[#6F84F8] hover:underline text-md"
            >
              View More
            </a>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[calc(5*5rem)] mt-2 tenant-visits-scrollbar">
            {/* Loop through upcoming appointments */}
            {appointments?.["appointments"]?.["upcoming"]?.[
              today.getFullYear()
            ]?.[monthNames[today.getMonth()]]?.[
              today.getDate() < 9 ? "0" + today.getDate() : today.getDate
            ] ? (
              appointments["appointments"]["upcoming"][today.getFullYear()][
                monthNames[today.getMonth()]
              ][
                today.getDate() < 9 ? "0" + today.getDate() : today.getDate
              ].map((appointment) => (
                <div key={appointment._id}>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">
                      {appointment.startTime.length > 6
                        ? formatTime(appointment.startTime)
                        : appointment.startTime}{" "}
                      -{" "}
                      {appointment.endTime.length > 6
                        ? formatTime(appointment.endTime)
                        : appointment.endTime}
                    </p>
                  </div>
                  <div className="hover:bg-green-100 p-3 rounded-[20px]">
                    <div className="flex justify-between items-center mt-3">
                      {/* Display tenant's name */}
                      <p className="text-[#6F84F8]">
                        {appointment.hcmDetails.name}
                      </p>
                      <div className="flex space-x-3 text-gray-500">
                        <FaMicrophone />
                        <FaUser />
                        <PhoneInTalkIcon />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      {/* Display service type */}
                      <p className="text-sm text-gray-600">
                        {appointment.serviceType}
                      </p>
                      <div className="flex space-x-2">
                        <div className="w-6 h-6 bg-green-200 flex items-center justify-center rounded-full">
                          <FaCheck className="text-green-600" />
                        </div>
                        <div className="w-6 h-6 bg-red-200 flex items-center justify-center rounded-full">
                          <FaTimes className="text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming appointments for this day.</p>
            )}
          </div>
        </div>

        <div className="border-dotted border-2 border-[#6F84F8]"></div>

        {/* Visits */}
        <div className="w-[20rem] p-1">
          <div className="flex gap-3 items-center pb-3">
            <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
            <h2 className="text-2xl font-semibold text-[#6F84F8]">Visits</h2>
          </div>
          <div className="flex justify-between">
            <span className="block text-[#6F84F8] text-md">Today</span>
            <a
              href="/calendar"
              className="text-[#6F84F8] hover:underline text-md"
            >
              View More
            </a>
          </div>

          <div
            className="space-y-2 overflow-y-auto max-h-[calc(5*5rem)] mt-2 tenant-visits-scrollbar" // Adjust height to show 5-6 items
          >
            {visits?.visits?.length > 0 ? (
              visits.visits.map((visit) => (
                <div key={visit.id} className="p-2">
                  <div className="flex justify-between items-center mt-3">
                    <p className="font-medium text-[#6F84F8]">
                      {visit?.hcmId?.name || "Unknown Name"}
                    </p>

                    <div className="flex space-x-3 text-gray-500">
                      <FaMicrophone />
                      <FaUser />
                      <FaFileAlt />
                      <FaBars />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-gray-800">
                        {visit.startTime.length > 6
                          ? formatTime(visit.startTime)
                          : visit.startTime}{" "}
                        -{" "}
                        {visit.endTime.length > 6
                          ? formatTime(visit.endTime)
                          : visit.endTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        {visit.serviceType || "No Purpose"}
                      </p>
                    </div>
                    <a
                      href="/sign-send"
                      className="text-[#6F84F8] hover:underline text-[15px]"
                    >
                      Sign & Send
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No visits available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentVisits;
