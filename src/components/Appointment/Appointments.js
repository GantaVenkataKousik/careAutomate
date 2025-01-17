import React, { useState, useEffect } from "react";
import AppointmentModal from "./AppointModal";
import axios from "axios";
import { IoFilterOutline, IoCalendar, IoList } from "react-icons/io5";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AppointmentCard from "./AppointmentCard";
import AppointmentCalendarView from "./AppointmentCalendarView";
import { BASE_URL } from "../../config";
const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("Completed");
  const [showPopup1, setShowPopup1] = useState(null);
  const [showDeletePopup1, setShowDeletePopup1] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const token = localStorage.getItem("token");
  const [hcmList, setHcmList] = useState([]);
  const [allTenants, setAllTenants] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filters, setFilters] = useState({
    tenantId: "",
    hcmId: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const handleEditClick = (appointment) => {
    setIsEdit(true);
    setCurrentAppointment(appointment);
    setShowModal(true);
  };
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

      if (response.data.success) {
        const mappedAppointments = response.data.response.map((apt) => {
          const startDateTime = new Date(apt.startTime);
          const endDateTime = new Date(apt.endTime);

          return {
            id: apt._id,
            date: new Date(apt.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            }),
            startDate: apt.date,
            startTime: apt.startTime,
            endTime:
              apt.endTime ||
              endDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            location: apt.placeOfService || "N/A",
            from: apt.hcmDetails?.name || "N/A",
            service: apt.serviceType || "N/A",
            with: apt.tenantDetails?.name || "N/A",
            status: apt.status.charAt(0).toUpperCase() + apt.status.slice(1),
            hcmId: apt.hcmId?._id,
            tenantId: apt.tenantDetails?._id,
            activity: apt.activity || "N/A",
            methodOfContact: apt.methodOfContact || "in-person",
          };
        });
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
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch(`${BASE_URL}/tenant/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const tenantsData = data.response.map((tenant) => ({
            id: tenant._id,
            name: tenant.name,
          }));
          setAllTenants(tenantsData);
        } else {
          console.error("Failed to fetch tenants:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tenants:", error.message || error);
      }
    };

    fetchTenants();
  }, []);

  useEffect(() => {
    const fetchHcm = async () => {
      try {
        const response = await fetch(`${BASE_URL}/hcm/all`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();
        // console.log(data);
        if (response.status === 200 && data.success) {
          const hcmData = data.response.map((hcm) => ({
            id: hcm._id,
            name: hcm.name,
          }));
          setHcmList(hcmData);
          // console.log(hcmList);
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
  const handleFilterClear = () => {
    fetchAppointments();
    setIsFilterApplied(false);
    setShowFilter(false);
  };
  const applyFilters = () => {
    const { tenantId, hcmId, startDate, endDate, status } = filters;

    // Check if all filters are empty
    if (Object.values(filters).every((value) => value === "")) {
      console.log("No filters applied, fetching all appointments.");
      fetchAppointments();
    }

    const filteredAppointments = appointments.filter((appointment) => {
      // Parse the date string into a Date object (assuming 'date' field is in format 'Thu, Dec 12')
      const appointmentDate = new Date(appointment.date + " 2024"); // Adding a year to make it valid

      // Convert the filter dates to Date objects, or null if not provided
      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;

      // Apply each filter condition
      const matchesTenant = tenantId ? appointment.tenantId === tenantId : true;
      const matchesHcm = hcmId ? appointment.hcmId === hcmId : true;
      const matchesStatus = status ? appointment.status === status : true;
      const matchesStartDate = startDateObj
        ? appointmentDate >= startDateObj
        : true;
      const matchesEndDate = endDateObj ? appointmentDate <= endDateObj : true;

      return (
        matchesTenant &&
        matchesHcm &&
        matchesStatus &&
        matchesStartDate &&
        matchesEndDate
      );
    });

    setAppointments(filteredAppointments);
    setIsFilterApplied(true);
    // Optional: reset filters here if you intend to clear them after applying
    // setFilters({
    //   tenantId: "",
    //   hcmId: "",
    //   startDate: "",
    //   endDate: "",
    //   status: "",
    // });
    setShowFilter(false);
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
        <div className="p-4 shadow-sm ">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold flex gap-2">
              <span>Appointments</span>
              <span className="h-9 w-9 flex items-center justify-center rounded-full font-bold text-lg p-2 bg-[#6F84F8] text-white">
                {appointments.length}
              </span>
            </h1>
            <button
              className="px-4 py-2 rounded-full text-white bg-[#6F84F8] mr-4"
              onClick={() => {
                setShowModal(true);
              }}
            >
              New Appointment
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-4 rounded-full bg-gray-200 w-fit p-2">
              {["All", "Completed", "Pending", "Cancelled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full font-medium ${activeTab === tab
                    ? "bg-[#6F84F8] text-white"
                    : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4">
              {/* <button
                onClick={handleToggle}
                className="flex items-center gap-2 px-6 py-2 text-white bg-[#6F84F8] rounded-full mr-4 shadow-md hover:bg-[#5b72d8] focus:outline-none focus:ring-2 focus:ring-[#6F84F8] transition-colors"
              >
                {isListView ? (
                  <>
                    <IoList className="text-lg" />
                    <span>List</span>
                  </>
                ) : (
                  <>
                    <IoCalendar className="text-lg" />
                    <span>Calendar</span>
                  </>
                )}
              </button> */}
              <div className="flex bg-gray-200 rounded-2xl p-1  w-fit mr-6">
                {/* Calendar Button */}
                <button
                  onClick={() => setIsListView(false)}
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${!isListView ? "bg-white text-[#6F84F8]" : "text-gray-600"
                    } `}
                >
                  <IoCalendar className="text-2xl" />
                </button>

                {/* List Button */}
                <button
                  onClick={() => setIsListView(true)}
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${isListView ? "bg-white text-[#6F84F8]" : "text-gray-600"
                    } `}
                >
                  <IoList className="text-2xl" />
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#6F84F8] text-white rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-[#5b72d8] focus:ring focus:ring-[#6F84F8]"
                >
                  <IoFilterOutline className="text-lg" />
                  Filters
                </button>

                {showFilter && (
                  <div className="absolute mt-7 right-2 p-4 bg-white rounded-xl shadow-lg flex flex-col gap-4 w-72 z-50">
                    <select
                      value={filters.hcmId}
                      onChange={(e) =>
                        handleInputChange("hcmId", e.target.value)
                      }
                      className="w-full border border-[#6F84F8] rounded-full px-2.5 py-1.5 font-poppins"
                    >
                      <option value="">Select HCM</option>
                      {hcmList.map((hcm) => (
                        <option key={hcm.id} value={hcm.id}>
                          {hcm.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filters.tenantId}
                      onChange={(e) =>
                        handleInputChange("tenantId", e.target.value)
                      }
                      className="w-full border border-[#6F84F8] rounded-full px-2.5 py-1.5 font-poppins"
                    >
                      <option value="">Select Tenant</option>
                      {allTenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </option>
                      ))}
                    </select>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // value={filters.startDate} // Bind value to filters.startDate
                        onChange={(date) =>
                          handleInputChange(
                            "startDate",
                            date?.format("YYYY-MM-DD")
                          )
                        }
                        sx={{
                          fontFamily: "Poppins",
                          height: "40px",
                          fontSize: "15px",
                          width: "100%",
                          "& input": {
                            padding: "5px 10px", // Match padding inside the input field
                          },
                          "& .MuiInputBase-root": {
                            padding: "3px 8px", // Match padding inside the container
                            borderRadius: "30px",
                            border: "1px solid #6F84F8", // Match the border color
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#6F84F8",
                          },
                        }}
                        InputProps={{
                          className:
                            "p-2 rounded border border-[#6F84F8] w-full focus:border-[#6F84F8]",
                        }}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // value={filters.startDate} // Bind value to filters.startDate
                        onChange={(date) =>
                          handleInputChange(
                            "endDate",
                            date?.format("YYYY-MM-DD")
                          )
                        }
                        sx={{
                          fontFamily: "Poppins",
                          height: "40px",
                          fontSize: "15px",
                          // marginRight: "1rem",
                          width: "100%",
                          "& input": {
                            padding: "5px 10px", // Match padding inside the input field
                          },
                          "& .MuiInputBase-root": {
                            padding: "3px 8px", // Match padding inside the container
                            borderRadius: "30px",
                            border: "1px solid #6F84F8", // Match the border color
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#6F84F8",
                          },
                        }}
                        InputProps={{
                          className:
                            "p-2 rounded border border-[#6F84F8] w-full focus:border-[#6F84F8]",
                        }}
                      />
                    </LocalizationProvider>

                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full border border-[#6F84F8] rounded-full px-2.5 py-1.5 font-poppins focus:border-[#6F84F8]"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <button
                      onClick={applyFilters}
                      className="bg-[#6F84F8] text-white p-2 rounded-full w-full font-bold uppercase transition-all duration-300 ease-in-out hover:bg-[#5b72d8] focus:ring focus:ring-[#6F84F8]"
                    >
                      Apply
                    </button>
                    {isFilterApplied && (
                      <button
                        onClick={handleFilterClear}
                        className="bg-white text-[#FF6B6B] border-2 border-[#FF6B6B] p-2 rounded-full w-full font-bold uppercase transition-all duration-300 ease-in-out hover:bg-[#FF6B6B] hover:text-white focus:ring focus:ring-[#6F84F8]"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      {!isListView ? (
        (() => {
          const filteredAppointments = (appointments || []).filter(
            (appointment) =>
              appointment.status === activeTab || activeTab === "All"
          );
          return filteredAppointments.length > 0 ? (
            <AppointmentCalendarView appointments={filteredAppointments} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              No {activeTab} appointments are available.
            </div>
          );
        })()
      ) : (
        <div className="space-y-4 h-[200px]">
          {appointments.filter(
            (appointment) =>
              appointment.status === activeTab || activeTab === "All"
          ).length > 0 ? (
            appointments
              .filter(
                (appointment) =>
                  appointment.status === activeTab || activeTab === "All"
              )
              .map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  togglePopup1={togglePopup1}
                  handleDeleteClick1={handleDeleteClick1}
                  handleEdit={handleEditClick}
                  showPopup1={showPopup1}
                  setShowModal={setShowModal}
                  setIsEdit={setIsEdit}
                  setCurrentAppointment={setCurrentAppointment}
                  showDeletePopup1={showDeletePopup1}
                  setShowDeletePopup1={setShowDeletePopup1}
                />
              ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              No {activeTab} appointments are available.
            </div>
          )}
        </div>
      )}

      <AppointmentModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEdit(false);
          setCurrentAppointment(null);
        }}
        onAptCreated={fetchAppointments}
        isEdit={isEdit}
        appointmentData={currentAppointment}
      />
    </div>
  );
};

export default Appointment;
