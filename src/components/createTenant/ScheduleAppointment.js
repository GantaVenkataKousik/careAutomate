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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../../config";

const ScheduleAppointment = ({ tenantID }) => {
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
  const [hcmList, setHcmList] = useState([]);
  const token = localStorage.getItem("token");
  const assignedHCMs = useSelector((state) => state.tenant.assignedHCMs);

  const hcmName = useSelector((state) => {
    const firstName = state.tenant.firstName || "";
    const middleName = state.tenant.middleName || "";
    const lastName = state.tenant.lastName || "";

    return `${firstName} ${middleName} ${lastName}`.trim();
  });
  const hcmId = tenantID;
  // useEffect(() => {
  //   const fetchTenants = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.error("Authorization token is missing.");
  //         return;
  //       }

  //       const response = await fetch(
  //         "https://careautomate-backend.vercel.app/tenant/all",
  //         {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({}),
  //         }
  //       );

  //       const data = await response.json();

  //       if (response.status === 200 && data.success) {
  //         const tenantData = data.tenants.map((tenant) => ({
  //           id: tenant._id,
  //           name: tenant.name,
  //         }));
  //         setAllTenants(tenantData);
  //       } else {
  //         console.error("Failed to fetch tenants:", data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tenants:", error);
  //     }
  //   };

  //   fetchTenants();
  // }, []);
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
  useEffect(() => {
    // Update local state with data from Redux
    if (assignedHCMs.names.length > 0) {
      const hcmData = assignedHCMs.names.map((name, index) => ({
        id: assignedHCMs.ids[index],
        name: name,
      }));
      setHcmList(hcmData);
    }
  }, [assignedHCMs]);

  const handleCreateAppointment = async () => {
    // Validate date, startTime, and endTime
    if (!startDate || !startTime) {
      console.error("Date, start time, or end time is missing.");
      toast.error("Please select a valid date, start time, and end time.");
      return;
    }

    if (endTime && startTime >= endTime) {
      console.error("End time must be after start time.");
      toast.error("End time must be after start time.");
      return;
    }

    console.log("Date:", startDate);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    const datePart = startDate.toISOString().split("T")[0];
    // Combine date with startTime and endTime, then create new Date objects in UTC
    const startDateTime = new Date(`${datePart}T${startTime}:00Z`);
    const endDateTime = new Date(`${datePart}T${endTime}:00Z`);

    // Convert to ISO 8601 strings
    const formattedStartTime = startDateTime.toISOString();
    const formattedEndTime = endDateTime.toISOString();

    console.log("Formatted Start Time:", formattedStartTime);
    console.log("Formatted End Time:", formattedEndTime);

    const payload = {
      tenantId: hcmId || "Unknown",
      hcmId: hcm || "N/A",
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
    <div className="p-[20px] mx-auto bg-white rounded-lg ">
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

          <div className="space-y-6  overflow-y-auto px-[5vw]">
            <div className="flex gap-4">
              <label className="text-sm font-medium flex items-center w-1/3">
                <GoPerson size={24} className="mr-2" />
                Tenant
              </label>
              <input
                type="text"
                value={hcmName}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Hcm"
                className="border border-gray-300 rounded-md p-2 w-2/3"
              />
            </div>

            <div className="flex gap-4">
              <label className="text-sm font-medium flex items-center w-1/3">
                <GoPerson size={24} className="mr-2" />
                Designated HCM
              </label>
              <select
                value={hcm}
                onChange={(e) => setHcm(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-2/3"
              >
                <option value="" disabled>
                  Select a HCM
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

            <div className="flex gap-4">
              <label className="text-sm font-medium flex items-center w-1/3">
                <BsCalendar2Date size={24} className="mr-2" />
                Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                dateFormat="MM-dd-yyyy"
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholderText="MM-DD-YYYY"
              />
            </div>

            <div className="flex gap-4">
              <label className="text-sm font-medium flex items-center w-1/3">
                <MdOutlineAccessTime size={24} className="mr-2" />
                Start Time
              </label>
              <input
                type="time"
                value={startTime || ""}
                onChange={(e) => setStartTime(e.target.value)} // Updates the startTime state
                className="border border-gray-300 rounded-md pointer p-2 w-2/3"
              />
            </div>

            <div className="flex gap-4">
              <label className="text-sm font-medium flex items-center w-1/3">
                <MdOutlineAccessTime size={24} className="mr-2" />
                End Time
              </label>
              <input
                type="time"
                value={endTime || ""}
                onChange={(e) => setEndTime(e.target.value)} // Updates the endTime state
                className="border border-gray-300 rounded-md pointer p-2 w-2/3"
              />
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

            <div className="flex gap-4">
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

          {/* <button
        onClick={handleCreateAnother}
        className=" py-2 px-4 rounded-md mt-4  transition duration-300"
      >
        Create Another Schedule
      </button> */}
        </div>
      )}
    </div>
  );
};

export default ScheduleAppointment;
