import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { GoPerson } from "react-icons/go";
import { RiServiceLine } from "react-icons/ri";
import { SlNote } from "react-icons/sl";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { BASE_URL } from "../../config";
import { API_ROUTES } from "../../routes";
import activities from "../../utils/activities";

const AppointmentModal = ({
  isOpen,
  onClose,
  onAptCreated,
  isEdit,
  appointmentData,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [planOfService, setPlanOfService] = useState("");
  const [reasonForRemote, setReasonForRemote] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [serviceType, setServiceType] = useState("Housing Sustaining");
  const [methodOfContact, setMethodOfContact] = useState("in-person");
  const [selectedTenantId, setSelectedTenantId] = useState("");
  const [selectedHcmId, setSelectedHcmId] = useState("");
  const [activity, setActivity] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (isEdit && appointmentData) {
        // Populate state with appointmentData for editing
        setStartDate(
          new Date(
            dayjs(appointmentData.startDate.split("T")[0]).format("MM-DD-YYYY")
          )
        );
        setPlanOfService(appointmentData.location || "");
        setStartTime(dayjs(appointmentData.startTime).format("HH:mm") || "");
        setEndTime(dayjs(appointmentData.endTime).format("HH:mm") || "");
        setServiceType(appointmentData.service || "Housing Sustaining");
        setMethodOfContact(appointmentData.methodOfContact || "in-person");
        setSelectedTenantId(appointmentData.tenantId || "");
        setSelectedHcmId(appointmentData.hcmId || "");
        setActivity(appointmentData.activity || "");
      } else {
        // Reset to default values for new entries
        setStartDate(null);
        setPlanOfService("");
        setReasonForRemote("");
        setStartTime("");
        setEndTime("");
        setServiceType("Housing Sustaining");
        setMethodOfContact("in-person");
        setSelectedTenantId("");
        setSelectedHcmId("");
        setActivity("");
      }
    }
  }, [isOpen, isEdit, appointmentData]);

  const [allTenants, setAllTenants] = useState([]);
  const [hcmList, setHcmList] = useState([]);
  const [scheduleCreated, setScheduleCreated] = useState(false);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(`${BASE_URL}/tenant/all`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const tenantData = data.response.map((tenant) => ({
            id: tenant._id,
            name: tenant.name,
          }));
          setAllTenants(tenantData);
        } else {
          console.error("Failed to fetch tenants:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };

    fetchTenants();
  }, []);

  useEffect(() => {
    const fetchHcm = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(`${BASE_URL}/hcm/all`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const hcmData = data.response.map((hcm) => ({
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
  const handleSubmit = () => {
    if (isEdit) {
      handleUpdateAppointment();
    } else {
      handleCreateAppointment();
    }
  };

  const handleUpdateAppointment = async () => {
    // First create an object to store only changed fields
    const changedFields = {};

    // Compare each field with original data and only add if changed
    if (
      startDate &&
      dayjs(appointmentData.startTime).format("YYYY-MM-DD") !== startDate
    ) {
      // Format dates for comparison
      const startDateTime = new Date(`${startDate}T${startTime}:00Z`);
      changedFields.startTime = startDateTime.toISOString();
    }

    if (endTime && dayjs(appointmentData.endTime).format("HH:mm") !== endTime) {
      const endDateTime = new Date(`${startDate}T${endTime}:00Z`);
      changedFields.endTime = endDateTime.toISOString();
    }

    if (selectedTenantId !== appointmentData.tenantId) {
      changedFields.tenantId = selectedTenantId;
    }

    if (selectedHcmId !== appointmentData.hcmId) {
      changedFields.hcmId = selectedHcmId;
    }

    if (activity !== appointmentData.activity) {
      changedFields.activity = activity;
    }

    if (methodOfContact !== appointmentData.methodOfContact) {
      changedFields.methodOfContact = methodOfContact;
    }

    if (reasonForRemote !== appointmentData.reasonForRemote) {
      changedFields.reasonForRemote = reasonForRemote;
    }

    if (planOfService !== appointmentData.location) {
      changedFields.placeOfService = planOfService;
    }

    if (serviceType !== appointmentData.service) {
      changedFields.serviceType = serviceType;
    }

    // If no fields have changed, show message and return
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }

    // Add the ID to the payload
    changedFields.id = appointmentData.id;
    // console.log(changedFields);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_ROUTES.APPOINTMENTS.BASE}/${appointmentData.id}`,
        changedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Updated successfully", response);
        toast.success("Appointment updated successfully.");
        onAptCreated();
        onClose();
      } else {
        toast.error("Failed to update appointment.");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Error updating appointment. Please try again.");
    }
  };
  const handleCreateAppointment = async () => {
    // Validate date, startTime, and endTime
    if (!startDate || !startTime) {
      console.error("Date, start time, or end time is missing.");
      toast.error("Please select a valid date, start time, and end time.");
      return;
    }

    // Validate that start time is before end time if both are provided
    if (endTime && startTime >= endTime) {
      console.error("End time must be after start time.");
      toast.error("End time must be after start time.");
      return;
    }

    // Combine startDate and startTime into a single Date object
    const startDateTime = new Date(`${startDate}T${startTime}:00Z`); // Appends 'Z' for UTC
    const endDateTime = new Date(`${startDate}T${endTime}:00Z`);

    // Format the times to the desired string format
    const formattedStartTime = startDateTime.toISOString();
    const formattedEndTime = endDateTime.toISOString();
    // console.log("time", new Date(`${startDate}T${startTime}:00`), endTime);
    const payload = {
      tenantId: selectedTenantId || "Unknown",
      hcmId: selectedHcmId || "N/A",
      date: startDate, // Keep the date separately if required
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      activity: activity || "N/A",
      methodOfContact,
      reasonForRemote: reasonForRemote,
      placeOfService: planOfService || "N/A",
      serviceType,
      approved: false,
      status: "pending",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/tenant/create-appointment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Appointment created successfully.");
        setScheduleCreated(true);
        onAptCreated();
        // setShowCreateScheduleDialog(true);
        onClose();
      } else {
        console.error("Failed to create appointment:", response.statusText);
        toast.error("Failed to create appointment.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("Error creating appointment. Please try again.");
    }
  };

  const handleCancelAppointment = () => {
    resetFormState();
  };

  const resetFormState = () => {
    setSelectedTenantId("");
    setSelectedHcmId("");
    setServiceType("Housing Sustaining");
    setStartDate(null);
    setPlanOfService("");
    setMethodOfContact("in-person");
    setReasonForRemote("");
    setStartTime("");
    setActivity("");
    // setTitle("");
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return startTime;
    const time = new Date(startTime);
    const durationMinutes = parseInt(duration.split(" ")[0], 10) || 0;
    time.setMinutes(time.getMinutes() + durationMinutes);
    return time;
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex flex-col pb-10 max-h-[40rem] p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg w-full">
        {/* "X" Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <p className=" mb-6">Fill in the details to add a schedule</p>

        <div className="space-y-6 max-h-[40rem] overflow-y-auto tenant-visits-scrollbar">
          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <GoPerson size={24} className="mr-2" />
              Tenant
            </label>
            <select
              value={selectedTenantId}
              onChange={(e) => setSelectedTenantId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="" disabled>
                Select a Tenant
              </option>
              {allTenants.length > 0 ? (
                allTenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading tenants...
                </option>
              )}
            </select>
          </div>

          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <GoPerson size={24} className="mr-2" />
              Assigned HCM
            </label>
            <select
              value={selectedHcmId}
              onChange={(e) => setSelectedHcmId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="" disabled>
                Select an HCM
              </option>
              {hcmList.length > 0 ? (
                hcmList.map((hcm) => (
                  <option key={hcm.id} value={hcm.id}>
                    {hcm.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading HCMs...
                </option>
              )}
            </select>
          </div>

          {/* <div className="flex gap-4">
          <label className="text-sm font-medium flex items-center w-1/3">
            <GoPerson size={24} className="mr-2" />
            Designated Tenant
          </label>
          <input
            type="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            // placeholder="Appointment Title"
            className="border border-gray-300 rounded-md p-2 w-2/3"
          />
        </div> */}

          <div className="flex gap-4 mb-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <RiServiceLine size={24} className="mr-2" />
              Service Type
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="Housing Sustaining">Housing Sustaining</option>
              <option value="Housing Transition">Housing Transition</option>
            </select>
          </div>

          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <SlNote size={24} className="mr-2" />
              Activity
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="">Select an activity</option>
              {activities[serviceType].map((activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 justify-between">
            <label className="text-sm font-medium flex items-center mb-1 w-1/3">
              <BsCalendar2Date size={24} className="mr-2" />
              Date
            </label>
            {/* Date Input */}
            <div className="flex gap-6 w-2/3">
              <div className="flex items-center gap-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(date) =>
                      setStartDate(date?.format("YYYY-MM-DD"))
                    }
                    minDate={dayjs()} // Pass a Dayjs object for minDate
                    sx={{
                      fontFamily: "Poppins",
                      height: "40px",
                      fontSize: "15px",
                      width: "100%",
                      "& input": {
                        padding: "5px 10px", // Match padding inside the input field
                      },
                      "& .MuiInputBase-root": {
                        padding: "3px 8px",
                        border: "1px solidrgb(176, 173, 173)",
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
              </div>

              {/* Start Time Input */}
              <div className="flex gap-2">
                <label className="text-sm font-medium flex items-center mb-1">
                  {/* <MdOutlineAccessTime size={24} className="mr-2" /> */}
                  Start
                </label>
                <input
                  type="time"
                  value={startTime || ""}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              {/* End Time Input */}
              <div className="flex gap-2 ">
                <label className="text-sm font-medium flex items-center mb-1">
                  {/* <MdOutlineAccessTime size={24} className="mr-2" /> */}
                  End
                </label>
                <input
                  type="time"
                  value={endTime || ""}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <GrLocation size={24} className="mr-2" />
              Place of Service
            </label>
            <select
              value={planOfService}
              onChange={(e) => setPlanOfService(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="" disabled>
                Select a place of service
              </option>
              <option value="Office">Office</option>
              <option value="Home">Home</option>
              <option value="Institution">Institution</option>
              <option value="Community">Community</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Method of Contact */}
          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <MdOutlineAccessTime size={24} className="mr-2" />
              Method of Visit
            </label>
            <select
              value={methodOfContact}
              onChange={(e) => setMethodOfContact(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="" disabled>
                Select a method
              </option>
              <option value="in-person">Direct</option>
              <option value="remote">Indirect</option>
            </select>
          </div>
          {methodOfContact === "remote" && (
            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="indirectOption"
                    value="remote"
                    checked={reasonForRemote === "remote"}
                    onChange={() => setReasonForRemote("remote")}
                    className="mr-2"
                  />
                  Remote
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="indirectOption"
                    value="in-person"
                    checked={reasonForRemote === "in-person"}
                    onChange={() => setReasonForRemote("in-person")}
                    className="mr-2"
                  />
                  In-Person
                </label>
              </div>

              {/* Conditional rendering for Reason for Remote */}
            </div>
          )}

          {reasonForRemote === "remote" && (
            <div className="flex gap-4">
              <label className="text-sm font-medium flex items-center w-1/3">
                <RiServiceLine size={24} className="mr-2" />
                Reason for Remote
              </label>
              <input
                type="text"
                value={reasonForRemote}
                onChange={(e) => setReasonForRemote(e.target.value)}
                placeholder="Enter reason for remote"
                className="border border-gray-300 rounded-md p-2 w-2/3"
              />
            </div>
          )}

          <div className="flex gap-4 w-2/3" style={{ marginLeft: "auto" }}>
            <button
              onClick={handleSubmit}
              className="cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  py-3 px-6 w-full mt-6"
            >
              Create Appointment
            </button>
            <button
              onClick={onClose || handleCancelAppointment}
              className=" cursor-pointer transition-all bg-[#F57070] text-white 
              px-6 py-2 rounded-lg 
              border-red-700 border-b-[4px] 
              hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px] 
              py-3 px-6 w-full mt-6"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* <button
        onClick={handleCreateAnother}
        className=" py-2 px-4 rounded-md mt-4  transition duration-300"
      >
        Create Another Schedule
      </button> */}
      </div>
    </div>
  ) : null;
};

export default AppointmentModal;
