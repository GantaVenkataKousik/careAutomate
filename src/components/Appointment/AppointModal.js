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
const AppointmentModal = ({ isOpen, onClose, onAptCreated }) => {
  const [startDate, setStartDate] = useState(null);
  const [planOfService, setPlanOfService] = useState("");

  const [reasonForRemote, setReasonForRemote] = useState("");
  const [title, setTitle] = useState("");
  const [scheduleCreated, setScheduleCreated] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [showCreateScheduleDialog, setShowCreateScheduleDialog] =
    useState(false);
  const [showCreateAnotherDialog, setShowCreateAnotherDialog] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [serviceType, setServiceType] = useState("Housing Sustaining");
  const [methodOfContact, setMethodOfContact] = useState("in-person");
  const [tenantID, setTenantName] = useState("");

  const [allTenants, setAllTenants] = useState([]); // List of tenants
  const [hcmList, setHcmList] = useState([]); // List of HCMs
  const [selectedTenantId, setSelectedTenantId] = useState(""); // Selected tenant ID
  const [selectedHcmId, setSelectedHcmId] = useState("");

  const tenantName = useSelector((state) => state.hcm.tenantName);
  const tenantId = useSelector((state) => state.hcm.tenantId);
  const [activity, setActivity] = useState("");
  // console.log("Hcm Name in step4:", tenantName);
  // console.log("Hcm ID in step4:", tenantId);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(
          `${BASE_URL}/tenant/all`,
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
          const tenantData = data.tenants.map((tenant) => ({
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

        const response = await fetch(
          `${BASE_URL}/hcm/all`,
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
        setShowCreateScheduleDialog(true);
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

  const activities = {
    "Housing Transition": [
      "Developing a housing transition plan",
      "Supporting the person in applying for benefits to afford their housing",
      "Assisting the person with the housing search and application process",
      "Assisting the person with tenant screening and housing assessments",
      "Providing transportation with the person receiving services present and discussing housing related issues",
      "Helping the person understand and develop a budget",
      "Helping the person understand and negotiate a lease",
      "Helping the person meet and build a relationship with a prospective landlord",
      "Promoting/supporting cultural practice needs and understandings with prospective landlords, property managers",
      "Helping the person find funding for deposits",
      "Helping the person organize their move",
      "Researching possible housing options for the person",
      "Contacting possible housing options for the person",
      "Identifying resources to pay for deposits or home goods",
      "Identifying resources to cover moving expenses",
      "Completing housing applications on behalf of the service recipient",
      "Working to expunge records or access reasonable accommodations",
      "Identifying services and benefits that will support the person with housing instability",
      "Ensuring the new living arrangement is safe for the person and ready for move-in",
      "Arranging for adaptive house related accommodations required by the person",
      "Arranging for assistive technology required by the person",
    ],
    "Housing Sustaining": [
      "Developing, updating and modifying the housing support and crisis/safety plan on a regular basis",
      "Preventing and early identification of behaviors that may jeopardize continued housing",
      "Educating and training on roles, rights, and responsibilities of the tenant and property manager",
      "Transportation with the person receiving services present and discussing housing related issues",
      "Promoting/supporting cultural practice needs and understandings with landlords, property managers and neighbors",
      "Coaching to develop and maintain key relationships with property managers and neighbors",
      "Advocating with community resources to prevent eviction when housing is at risk and maintain person’s safety",
      "Assistance with the housing recertification processes",
      "Continued training on being a good tenant, lease compliance, and household management",
      "Supporting the person to apply for benefits to retain housing",
      "Supporting the person to understand and maintain/increase income and benefits to retain housing",
      "Supporting the building of natural housing supports and resources in the community including building supports and resources related to a person’s culture and identity",
      "Working with property manager or landlord to promote housing retention",
      "Arranging for assistive technology",
      "Arranging for adaptive house related accommodations",
    ],
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
    setTitle("");
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
      <div className="relative flex flex-col pb-10 max-h-[35rem] p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg w-full">
        {/* "X" Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <p className=" mb-6">Fill in the details to add a schedule</p>

        <div className="space-y-6 max-h-[40rem] overflow-y-auto">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Appointment Title"
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

          {/* <div className="flex gap-4">
        <label className="text-sm font-medium flex items-center w-1/3">
         
          Travel
        </label>
        <select
          value={travel}
          onChange={(e) => setTravel(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-2/3"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {travel === 'Yes' && (
        <>
      
          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
             
              Travel with Tenant (miles)
            </label>
            <input
              type="number"
              value={milesWithTenant}
              onChange={(e) => setMilesWithTenant(e.target.value)}
              placeholder="Enter miles"
              className="border border-gray-300 rounded-md p-2 w-2/3"
            />
          </div>

          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
            
              Travel without Tenant (miles)
            </label>
            <input
              type="number"
              value={milesWithoutTenant}
              onChange={(e) => setMilesWithoutTenant(e.target.value)}
              placeholder="Enter miles"
              className="border border-gray-300 rounded-md p-2 w-2/3"
            />
          </div>
        </>
      )}

      
      <div className="flex gap-4">
        <label className="text-sm font-medium flex items-center w-1/3">
        
          Signature
        </label>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Enter your signature"
          className="border border-gray-300 rounded-md p-2 w-2/3"
        />
      </div> */}

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
