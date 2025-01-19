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
import { BASE_URL } from "../../config";
import activities from "../../utils/commonUtils/activities";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { convertToUTCString } from "../../utils/commonUtils/timeFilter";

const ScheduleAppointment = ({ assignTenantLater }) => {
  const [hcm, setHcm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [planOfService, setPlanOfService] = useState("");
  const [visitMethod, setVisitMethod] = useState("");
  const [reasonForRemote, setReasonForRemote] = useState("");
  const [title, setTitle] = useState("");
  const [scheduleCreated, setScheduleCreated] = useState(false);
  const [activity, setActivity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [showCreateScheduleDialog, setShowCreateScheduleDialog] =
    useState(false);
  const [showCreateAnotherDialog, setShowCreateAnotherDialog] = useState(false);
  const [allTenants, setAllTenants] = useState([]); // Store tenant data
  const [endTime, setEndTime] = useState("");
  const [serviceType, setServiceType] = useState("Housing Sustaining"); // Default value for service type
  const [methodOfContact, setMethodOfContact] = useState("in-person"); // Default value for method of contact
  const assignedTenants = useSelector((state) => state.hcm.assignedTenants);
  const hcmName = useSelector((state) => state.hcm.hcmName);
  const hcmId = useSelector((state) => state.hcm.hcmId);

  // console.log("Hcm Name in step4:", hcmName);
  // console.log("Hcm ID in step4:", hcmId);

  useEffect(() => {
    console.log(assignTenantLater);
    if (assignedTenants.names.length > 0 && !assignTenantLater) {
      const tenantData = assignedTenants.names.map((name, index) => ({
        id: assignedTenants.ids[index],
        name: name,
      }));
      setAllTenants(tenantData);
    } else {
      fetchTenants();
    }
  }, [assignedTenants]);
  // useEffect(() => {
  const fetchTenants = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authorization token is missing.");
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

  //   fetchTenants();
  // }, []);

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

    // console.log("Date:", startDate);
    // console.log("Start Time:", startTime);
    // console.log("End Time:", endTime);
    // const startDateTime = new Date(`${startDate}T${startTime}:00Z`); // Appends 'Z' for UTC
    // const endDateTime = new Date(`${startDate}T${endTime}:00Z`);
    const formattedStartTime = convertToUTCString(startDate, startTime);
    const formattedEndTime = convertToUTCString(startDate, endTime);
    const payload = {
      tenantId: hcm || "Unknown",
      hcmId: hcmId || "N/A",
      date: startDate, // Send date separately
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

      if (response) {
        toast.success("Appointment created successfully.");
        setScheduleCreated(true);
        setShowCreateScheduleDialog(true);
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

  const handleCreateAnother = () => {
    setShowCreateAnotherDialog(false);
    resetFormState();
  };

  const resetFormState = () => {
    setHcm("");
    setServiceType("");
    setStartDate(null);
    setEndDate(null);
    setTimeSlot("");
    setTimePeriod("");
    setTimeDuration("");
    setPlanOfService("");
    setVisitMethod("");
    setMethodOfContact("");
    setReasonForRemote("");
    setStartTime("");
    setActivity("");
    setTitle("");
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return startTime;
    const time = new Date(startTime);
    const durationMinutes = parseInt(duration.split(" ")[0], 10) || 0;
    time.setMinutes(time.getMinutes() + durationMinutes);
    return time;
  };

  return (
    <div className="p-[20px]  mx-auto bg-white rounded-lg ">
      {scheduleCreated ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-500">
            Appointment Created Successfully!
          </h2>
          <p className="mt-4 text-gray-600">
            Your appointment has been successfully scheduled.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <h5 className="text-2xl font-semibold mb-4">New Appointment</h5>
          <p className=" mb-6">Fill in the details to add a schedule</p>

          <div className="space-y-6 overflow-y-auto px-[5vw]">
            <div className="flex gap-4">
              <label className="text-sm font-medium flex items-center w-1/3">
                <GoPerson size={24} className="mr-2" />
                HCM
              </label>
              <input
                type="text"
                value={hcmName}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="HCM"
                disabled={true}
                className="border border-gray-300 rounded-md p-2 w-2/3"
              />
            </div>

            <div className="flex gap-4">
              <label className="text-sm font-medium flex items-center w-1/3">
                <GoPerson size={24} className="mr-2" />
                Designated Tenant
              </label>
              <select
                value={hcm}
                onChange={(e) => setHcm(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-2/3"
              >
                <option value="" disabled>
                  Select a tenant
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
              <label className="text-sm font-medium flex items-center w-1/3">
                <BsCalendar2Date size={24} className="mr-2" />
                Date
              </label>

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

                {/**start time */}
                <div className="flex gap-2">
                  <label className="text-sm font-medium flex items-center w-1/3">
                    {/* <MdOutlineAccessTime size={24} className="mr-2" /> */}
                    Start
                  </label>
                  <input
                    type="time"
                    value={startTime || ""}
                    onChange={(e) => setStartTime(e.target.value)} // Updates the startTime state
                    className="border border-gray-300 rounded-md pointer p-2 w-2/3"
                  />
                </div>

                <div className="flex gap-2">
                  <label className="text-sm font-medium flex items-center w-1/3">
                    {/* <MdOutlineAccessTime size={24} className="mr-2" /> */}
                    End
                  </label>
                  <input
                    type="time"
                    value={endTime || ""}
                    onChange={(e) => setEndTime(e.target.value)} // Updates the endTime state
                    className="border border-gray-300 rounded-md pointer p-2 w-2/3"
                  />
                </div>
              </div>
            </div>

            {/* Place of Service */}
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
                Contact Method
              </label>
              <select
                value={methodOfContact}
                onChange={(e) => setMethodOfContact(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-2/3"
              >
                <option value="in-person">in-person</option>
                <option value="remote">remote</option>
              </select>
            </div>

            {/* Display input field for Reason for Remote if selected */}
            {methodOfContact === "remote" && (
              <div className="flex gap-4">
                <label className="text-sm font-medium flex items-center w-1/3">
                  <RiServiceLine size={24} className="mr-2" />
                  Reason for Remote
                </label>
                <input
                  type="text"
                  value={reasonForRemote}
                  onChange={(e) => setReasonForRemote(e.target.value)}
                  placeholder="Reason for Remote"
                  className="border border-gray-300 rounded-md p-2 w-2/3"
                />
              </div>
            )}

            <div className="flex gap-4 w-2/3" style={{ marginLeft: "auto" }}>
              <button
                onClick={handleCreateAppointment}
                className="cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  py-3 px-6 w-full mt-6"
              >
                Create Appointment
              </button>
              <button
                onClick={handleCancelAppointment}
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
        </div>
      )}
    </div>
  );
};

export default ScheduleAppointment;
