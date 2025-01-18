import React, { useState, useEffect, useMemo } from "react";
import AppointmentModal from "./AppointModal";
import axios from "axios";
import { IoCalendar, IoList } from "react-icons/io5";
// import AppointmentCard from "./AppointmentCard";
import AppointmentCalendarView from "./AppointmentCalendarView";
import { BASE_URL } from "../../config";
import AppointmentFilter from "./AppointmentFilter";
import AppointmentCard2 from "./AppointmentCard2";
import AppointmentDetailsPopup from "./AppointmentDetailsPopup";
import {
  applyAppointmentFilters,
  formatAppointmentFilters,
} from "../../utils/appointmentsUtils/appointmentListFilterUtils/appointmentFetchFilter";
const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("Completed");
  const [showModal, setShowModal] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const token = localStorage.getItem("token");
  const [detailsPopup, setDetailsPopup] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    tenant: [],
    hcm: [],
    status: [],
    startDate: null,
    endDate: null,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const handleDetailsClick = (details) => {
    setDetailsPopup(details);
    setOpenPopup(true);
  };

  const handleFilterUpdate = (newFilters) => {
    setActiveFilters(newFilters);
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
          // const startDateTime = new Date(apt.startTime);
          // const endDateTime = new Date(apt.endTime);

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
            reasonForRemote: apt.reasonForRemote,
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

  const filteredAppointments = useMemo(() => {
    // First apply the utility filters
    const filteredByUtils = applyAppointmentFilters(
      appointments,
      formatAppointmentFilters(activeFilters)
    );

    // Filter by active tab
    let appointmentsAfterTabFilter = filteredByUtils;
    if (activeTab !== "All") {
      appointmentsAfterTabFilter = filteredByUtils.filter(
        (appointment) => appointment.status === activeTab
      );
    }

    // Sort the filtered appointments
    return appointmentsAfterTabFilter.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
  }, [appointments, activeTab, activeFilters]);

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
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                    !isListView ? "bg-white text-[#6F84F8]" : "text-gray-600"
                  } `}
                >
                  <IoCalendar className="text-2xl" />
                </button>

                {/* List Button */}
                <button
                  onClick={() => setIsListView(true)}
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                    isListView ? "bg-white text-[#6F84F8]" : "text-gray-600"
                  } `}
                >
                  <IoList className="text-2xl" />
                </button>
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
        <div className="flex gap-8 w-full pt-6 h-[calc(100vh-180px)] overflow-hidden">
          <div className="flex-grow overflow-y-auto px-6 tenant-visits-scrollbar">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <AppointmentCard2
                  appointment={appointment}
                  handleDetailsClick={handleDetailsClick}
                  setShowModal={setShowModal}
                  setIsEdit={setIsEdit}
                  setCurrentAppointment={setCurrentAppointment}
                  onAptCreated={fetchAppointments}
                />
                // <AppointmentCard
                //   key={appointment.id}
                //   appointment={appointment}
                //   togglePopup1={togglePopup1}
                //   handleDeleteClick1={handleDeleteClick1}
                //   handleEdit={handleEditClick}
                //   showPopup1={showPopup1}
                //   setShowModal={setShowModal}
                //   setIsEdit={setIsEdit}
                //   setCurrentAppointment={setCurrentAppointment}
                //   showDeletePopup1={showDeletePopup1}
                //   setShowDeletePopup1={setShowDeletePopup1}
                // />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600">
                No {activeTab} appointments are available.
              </div>
            )}
          </div>
          <div className="w-[280px] flex-shrink-0 border border-[#6F84F8] rounded-[20px] p-[10px] h-full overflow-y-auto tenant-visits-scrollbar">
            <AppointmentFilter onFilterUpdate={handleFilterUpdate} />
          </div>
        </div>
      )}

      <AppointmentDetailsPopup
        openPopup={openPopup}
        handleClosePopup={() => setOpenPopup(false)}
        detailsPopup={detailsPopup}
      />
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
