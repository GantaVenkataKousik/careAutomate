import React, { useState, useEffect } from "react";
import AppointmentModal from "./AppointModal";
import axios from "axios";
import { IoFilterOutline } from "react-icons/io5";
import AppointmentCard from "./AppointmentCard";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("Completed");
  const [showPopup1, setShowPopup1] = useState(null);
  const [showDeletePopup1, setShowDeletePopup1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [showFilter, setShowFilter] = useState(false); // Added missing state for filter visibility
  const token = localStorage.getItem("token");
  const [hcmList, setHcmList] = useState([]);
  const [allTenants, setAllTenants] = useState([]);
  const [filters, setFilters] = useState({
    tenantId: "",
    hcmId: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  // Fetch appointments data on component mount
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
        // Map API data to match the desired structure
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

  useEffect(() => {
    const fetchHcm = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(
          "https://careautomate-backend.vercel.app/hcm/all",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const hcmData = data.hcms.map((hcm) => ({
            id: hcm._id,
            name: hcm.name,
          }));
          setHcmList(hcmData);
        } else {
          console.error("Failed to fetch HCMs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching HCMs:", error);
      }
    };

    fetchHcm();
  }, []);

  const handleInputChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const applyFilters = async () => {
    console.log("Applying filters with the following criteria:", filters);
    try {
      const response = await axios.post(
        "https://careautomate-backend.vercel.app/appointment/filterAppointments",
        filters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.visits) {
        setAppointments(response.data.visits); // Use filtered results
      } else {
        setAppointments([]); // Clear appointments if no results
      }
    } catch (error) {
      console.error("Error fetching data:", error.response || error);
    }
  };

  const handleFilterIconClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const togglePopup1 = (id) => {
    setShowPopup1((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteClick1 = (id) => {
    setShowDeletePopup1((prevId) => (prevId === id ? null : id));
  };

  return (
    <div
      style={{
        margin: "1rem",
        maxHeight: "200px",
        fontFamily: "poppins",
      }}
    >
      <div>
        {/* Fixed Header and Tabs */}
        <div className="p-4 shadow-sm ">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Appointments</h1>
            <div className="flex items-center">
              {/* <div className="flex items-center"> */}
              <button
                className="px-4 py-2 rounded-full text-white bg-[#6F84F8] mr-4"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                New Appointment
              </button>

              <div>
                {/* Filter Button */}
                {/* <button> */}
                <IoFilterOutline
                  onClick={() => setShowFilter(!showFilter)}
                  className="text-2xl cursor-pointer"
                />
                {/* </div> */}

                {/* Filter Popup */}
                {showFilter && (
                  <div className="absolute mt-7 right-2 p-4 bg-white rounded-xl shadow-lg flex flex-col gap-4 w-72 ">
                    {/* HCM Dropdown */}
                    <select
                      value={filters.hcmId}
                      onChange={(e) =>
                        handleInputChange("hcmId", e.target.value)
                      }
                      className="p-2 rounded border border-[#6F84F8] w-full focus:border-[#6F84F8]"
                    >
                      <option value="">Select HCM</option>
                      {hcmList.map((hcm) => (
                        <option key={hcm.id} value={hcm.id}>
                          {hcm.name}
                        </option>
                      ))}
                    </select>

                    {/* Tenant Dropdown */}
                    <select
                      value={filters.tenantId}
                      onChange={(e) =>
                        handleInputChange("tenantId", e.target.value)
                      }
                      className="p-2 rounded border border-[#6F84F8] w-full focus:border-[#6F84F8]"
                    >
                      <option value="">Select Tenant</option>
                      {allTenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </option>
                      ))}
                    </select>

                    {/* Date Filters */}
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                      className="p-2 rounded border border-[#6F84F8] w-full focus:border-[#6F84F8]"
                    />
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      className="p-2 rounded border border-[#6F84F8] w-full focus:border-[#6F84F8]"
                    />

                    {/* Status Dropdown */}
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="p-2 rounded border border-[#6F84F8] w-full focus:border-[#6F84F8]"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    {/* Apply Button */}
                    <button
                      onClick={applyFilters}
                      className="bg-[#6F84F8] text-white p-2 rounded-lg w-full font-bold uppercase transition-all duration-300 ease-in-out hover:bg-[#5b72d8] focus:ring focus:ring-[#6F84F8]"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-4 rounded-full bg-gray-200 w-fit p-2">
            {["Completed", "Pending", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-medium ${
                  activeTab === tab
                    ? "bg-[#6F84F8] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      {/* Display Appointment Cards */}
      {/* <h2 className="text-lg font-semibold mt-6">Today</h2> */}
      <div className="space-y-4 h-[200px]">
        {appointments.filter((appointment) => appointment.status === activeTab)
          .length > 0 ? (
          appointments
            .filter((appointment) => appointment.status === activeTab)
            .map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                togglePopup1={togglePopup1}
                handleDeleteClick1={handleDeleteClick1}
                showPopup1={showPopup1}
                showDeletePopup1={showDeletePopup1}
                setShowDeletePopup1={setShowDeletePopup1}
              />
            ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600">
            No {activeTab} appointments are available
          </div>
        )}
      </div>

      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)} // Close the modal
        onAptCreated={fetchAppointments}
      />
    </div>
  );
};

export default Appointment;
