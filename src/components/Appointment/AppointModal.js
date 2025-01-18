import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { RiServiceLine } from "react-icons/ri";
import { SlNote } from "react-icons/sl";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import axios from "axios";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { BASE_URL } from "../../config";
import { API_ROUTES } from "../../routes";
import activities from "../../utils/commonUtils/activities";
import Select from "react-select";
import { convertToUTCString } from "../../utils/commonUtils/timeFilter";

const AppointmentModal = ({
  isOpen,
  onClose,
  onAptCreated,
  isEdit,
  appointmentData,
}) => {
  // console.log(appointmentData);
  const [startDate, setStartDate] = useState(null);
  const [planOfService, setPlanOfService] = useState("");
  const [reasonForRemote, setReasonForRemote] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [methodOfContact, setMethodOfContact] = useState("in-person");
  const [selectedTenantId, setSelectedTenantId] = useState("");
  const [selectedHcmId, setSelectedHcmId] = useState("");
  const [activity, setActivity] = useState("");
  const [tenantServices, setTenantServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && appointmentData) {
        // Populate state with appointmentData for editing
        setStartDate(new Date(appointmentData.startDate));

        setPlanOfService(appointmentData.location || "");
        setStartTime(dayjs(appointmentData.startTime).format("HH:mm") || "");
        setEndTime(dayjs(appointmentData.endTime).format("HH:mm") || "");
        setServiceType(appointmentData.service || "");
        setMethodOfContact(appointmentData.methodOfContact || "in-person");
        setSelectedTenantId(appointmentData.tenantId || "");
        setSelectedHcmId(appointmentData.hcmId || "");
        setActivity(appointmentData.activity || "");
        setReasonForRemote(appointmentData.reasonForRemote || "");
      } else {
        // Reset to default values for new entries
        setStartDate(null);
        setPlanOfService("");
        setReasonForRemote("");
        setStartTime("");
        setEndTime("");
        setServiceType("");
        setMethodOfContact("in-person");
        setSelectedTenantId("");
        setSelectedHcmId("");
        setActivity("");
      }
    }
  }, [isOpen, isEdit, appointmentData]);

  const [allTenants, setAllTenants] = useState([]);
  const [hcmList, setHcmList] = useState([]);

  useEffect(() => {
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
            value: tenant._id,
            label: tenant.name,
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

  useEffect(() => {
    const fetchTenantServices = async () => {
      if (!selectedTenantId) return;

      setLoadingServices(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_ROUTES.SERVICE_TRACKING.GET_ALL_SERVICES}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.status === 200 && data.success) {
          const services = data.response.filter(
            (service) => service.tenantId === selectedTenantId
          );
          setTenantServices(services);
        } else {
          console.error("Failed to fetch services:", data.message);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchTenantServices();
  }, [selectedTenantId]);

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

    if (startDate && startDate !== new Date(appointmentData.startDate)) {
      changedFields.date = startDate.toISOString();
    }

    if (startDate && startTime) {
      try {
        // Compare the new start time with the existing one in ISO format
        if (startTime !== dayjs(appointmentData.startTime).toISOString()) {
          changedFields.startTime = convertToUTCString(
            dayjs(startDate).format("YYYY-MM-DD"),
            startTime
          );
        }
      } catch (error) {
        console.error("Error processing startDate and startTime:", error);
      }
    }

    if (startDate && endTime) {
      try {
        // Compare the new end time with the existing one in ISO format
        if (endTime !== dayjs(appointmentData.endTime).format("HH:mm")) {
          changedFields.endTime = convertToUTCString(
            dayjs(startDate).format("YYYY-MM-DD"),
            endTime
          );
        }
      } catch (error) {
        console.error("Error processing startDate and endTime:", error);
      }
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
    // return;
    try {
      setLoading(true);
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
        setLoading(false);
      } else {
        toast.error("Failed to update appointment.");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Error updating appointment. Please try again.");
    }
  };

  const handleCreateAppointment = async () => {
    // Validate all fields
    setLoading(true);
    if (
      !selectedTenantId ||
      !selectedHcmId ||
      !serviceType ||
      !activity ||
      !methodOfContact ||
      !planOfService ||
      !startDate ||
      !startTime ||
      !endTime
    ) {
      toast.error("Please fill all the mandatory fields.");
      return;
    }

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
    const startDateTime = convertToUTCString(startDate, startTime);
    const endDateTime = convertToUTCString(startDate, endTime);

    const payload = {
      tenantId: selectedTenantId || "Unknown",
      hcmId: selectedHcmId || "N/A",
      date: startDate, // Keep the date separately if required
      startTime: startDateTime,
      endTime: endDateTime,
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
        onAptCreated();
        onClose();
        setLoading(false);
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
              Tenant <span className="text-red-500">*</span>
            </label>
            <Select
              value={
                allTenants.find(
                  (option) => option.value === selectedTenantId
                ) || null
              }
              onChange={(selectedOption) =>
                setSelectedTenantId(selectedOption ? selectedOption.value : "")
              }
              options={allTenants}
              placeholder="Select a Tenant"
              isLoading={allTenants.length === 0}
              className="w-2/3"
            />
          </div>

          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <GoPerson size={24} className="mr-2" />
              Assigned HCM's <span className="text-red-500">*</span>
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

          <div className="flex gap-4 mb-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <RiServiceLine size={24} className="mr-2" />
              Service Type <span className="text-red-500">*</span>
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="" disabled>
                {loadingServices ? "Loading services..." : "Select a service"}
              </option>
              {tenantServices.map((service) => (
                <option key={service._id} value={service.serviceType}>
                  {service.serviceType} (
                  {dayjs(service.startDate).format("MM/DD/YYYY")} -{" "}
                  {dayjs(service.endDate).format("MM/DD/YYYY")})
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              <SlNote size={24} className="mr-2" />
              Activity <span className="text-red-500">*</span>
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="">Select an activity</option>
              {activities[serviceType]?.map((activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 justify-between">
            <label className="text-sm font-medium flex items-center mb-1 w-1/3">
              <BsCalendar2Date size={24} className="mr-2" />
              Date<span className="text-red-500">*</span>
            </label>
            {/* Date Input */}
            <div className="flex gap-6 w-2/3">
              <div className="flex items-center gap-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(startDate)}
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
                  Start<span className="text-red-500">*</span>
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
                  End<span className="text-red-500">*</span>
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
              Place of Service<span className="text-red-500">*</span>
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
              Method of Visit<span className="text-red-500">*</span>
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
          {/*  */}

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
                placeholder="Enter reason for remote"
                className="border border-gray-300 rounded-md p-2 w-2/3"
              />
            </div>
          )}

          <div className="flex gap-4 w-2/3" style={{ marginLeft: "auto" }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  py-3 px-6 w-full mt-6"
            >
              {isEdit
                ? loading
                  ? "Updating Appointment"
                  : "Update Appointment"
                : loading
                  ? "Creating Appointment"
                  : "Create Appointment"}
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
