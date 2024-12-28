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

      const response = await fetch(`${API_ROUTES.VISITS.BASE}/filtervisits`, {
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
        `${API_ROUTES.APPOINTMENTS.BASE}/filterAppointments`,
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
            <span className="text-[#6F84F8] mb-4 text-md">{` `}</span>
            <a
              href="/appointments"
              className="text-[#6F84F8] hover:underline text-md"
            >
              View More
            </a>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[calc(5*7rem)] mt-2 tenant-visits-scrollbar">
            {/* Display upcoming appointments */}
            {appointments?.appointments?.upcoming &&
            Object.keys(appointments.appointments.upcoming).length > 0 ? (
              Object.entries(appointments.appointments.upcoming).map(
                ([year, months]) =>
                  Object.entries(months).map(([month, days]) =>
                    Object.entries(days).map(([day, appointmentsForDay]) => (
                      <div key={`${year}-${month}-${day}`}>
                        {/* Display date */}
                        <div className="bg-gray-100 p-2 rounded-md font-semibold text-gray-800">
                          {`${day} ${month}, ${year}`}
                        </div>
                        {appointmentsForDay.map((appointment) => (
                          <div key={appointment._id} className="mt-2">
                            <div className="mb-3 rounded-[20px]">
                              <div className="flex justify-between items-center mt-3">
                                <p className="text-[#6F84F8]">
                                  {appointment.hcmDetails.name}
                                </p>
                                <div className="flex space-x-3 text-gray-500"></div>
                              </div>

                              <div className=" mt-2">
                                <p className="font-medium text-gray-800 text-md">
                                  {`${new Date(appointment.startTime).getHours().toString().padStart(2, "0")}:${new Date(appointment.startTime).getMinutes().toString().padStart(2, "0")}`}{" "}
                                  -{" "}
                                  {`${new Date(appointment.endTime).getHours().toString().padStart(2, "0")}:${new Date(appointment.endTime).getMinutes().toString().padStart(2, "0")}`}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {appointment.serviceType}
                                </p>
                              </div>
                            </div>
                            <hr className="my-2" />
                          </div>
                        ))}
                      </div>
                    ))
                  )
              )
            ) : (
              <p className="text-gray-500 text-center mt-5">
                No upcoming appointments available.
              </p>
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
            <span className="block text-[#6F84F8] text-md">{` `}</span>
            <a
              href="/visits"
              className="text-[#6F84F8] hover:underline text-md"
            >
              View More
            </a>
          </div>

          <div
            className="space-y-2 overflow-y-auto max-h-[calc(5*7rem)] tenant-visits-scrollbar mt-2" // Adjust height to show 5-6 items
          >
            {visits?.response?.length > 0 ? (
              visits.response.map((visit) => (
                <div key={visit.id} className="">
                  {/* Display the date */}
                  <div className="bg-gray-100 p-2 rounded-md font-semibold text-gray-800">
                    {new Date(visit.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <p className="font-medium text-[#6F84F8]">
                      {visit?.tenantId?.name || "Unknown Name"}
                    </p>
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
                          : visit.endTime}{" "}
                      </p>
                      <p className="text-sm text-gray-600">
                        {visit.serviceType || "No Purpose"}
                      </p>
                    </div>
                  </div>

                  <hr className="my-2 mt-3" />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-5">
                No visits available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentVisits;
