import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { RiServiceLine } from "react-icons/ri";
import { SlNote } from "react-icons/sl";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API_ROUTES } from "../../routes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BASE_URL } from "../../config";
import activities from "../../utils/activities";

const VisitModal = ({ isOpen, onClose, onVisitCreated, isEdit }) => {
  // console.log(onVisitCreated);
  const [hcm, setHcm] = useState(isEdit ? onVisitCreated.hcmId : "");
  const [startDate, setStartDate] = useState(
    isEdit ? new Date(onVisitCreated.startDate) : null
  );
  const [planOfService, setPlanOfService] = useState(
    isEdit ? onVisitCreated.placeOfService : ""
  );
  const [reasonForRemote, setReasonForRemote] = useState(
    isEdit ? onVisitCreated?.reasonForRemote : ""
  );
  const [title, setTitle] = useState(isEdit ? onVisitCreated.title : "");
  const [scheduleCreated, setScheduleCreated] = useState(false);
  const [activity, setActivity] = useState(isEdit ? onVisitCreated.title : "");
  const [startTime, setStartTime] = useState(
    isEdit ? onVisitCreated.startDate.substring(11, 16) : ""
  );
  const [showCreateScheduleDialog, setShowCreateScheduleDialog] =
    useState(false);
  const [allTenants, setAllTenants] = useState([]); // Store tenant data
  const [endTime, setEndTime] = useState(
    isEdit ? onVisitCreated.endDate.substring(11, 16) : ""
  );
  const [serviceType, setServiceType] = useState(
    isEdit ? onVisitCreated.serviceType : "Housing Sustaining"
  ); // Default value for service type
  const [methodOfContact, setMethodOfContact] = useState(
    isEdit ? onVisitCreated.typeMethod : "in-person"
  ); // Default value for method of contact

  const [travel, setTravel] = useState(
    isEdit
      ? onVisitCreated.travel.toLowerCase() == "yes"
        ? "Yes"
        : "NO"
      : "No"
  );
  const [milesWithTenant, setMilesWithTenant] = useState(
    isEdit ? onVisitCreated.travelWithTenant : ""
  );
  const [milesWithoutTenant, setMilesWithoutTenant] = useState(
    isEdit ? onVisitCreated.travelWithoutTenant : ""
  );
  const [signature, setSignature] = useState(
    isEdit ? onVisitCreated.signature : ""
  );
  const [hcmList, setHcmList] = useState([]); // List of HCMs
  const [selectedTenantId, setSelectedTenantId] = useState(
    isEdit ? onVisitCreated.tenantId : ""
  ); // Selected tenant ID
  const [detailsOfVisit, setDetailsOfVisit] = useState(
    isEdit ? onVisitCreated.details : ""
  );
  //prettier-ignore
  const [responseOfVisit, setResponseOfVisit] = useState(
    isEdit ? onVisitCreated.response : ""
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;

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
  useEffect(() => {
    if (isOpen && isEdit) {
      // Reset the state to the visit data when the modal is opened for editing
      setHcm(onVisitCreated.hcmId);
      setStartDate(new Date(onVisitCreated.startDate));
      setPlanOfService(onVisitCreated.placeOfService);
      setReasonForRemote(onVisitCreated?.reasonForRemote);
      setTitle(onVisitCreated.title);
      setActivity(onVisitCreated.title);
      setEndTime(new Date(onVisitCreated.endDate));
      setServiceType(onVisitCreated.serviceType || "Housing Sustaining");
      setMethodOfContact(onVisitCreated.typeMethod || "in-person");
      setTravel(onVisitCreated.travel.toLowerCase() === "yes" ? "Yes" : "No");
      setMilesWithTenant(onVisitCreated.travelWithTenant);
      setMilesWithoutTenant(onVisitCreated.travelWithoutTenant);
      setSignature(onVisitCreated.signature);
      setSelectedTenantId(onVisitCreated.tenantId);
      setDetailsOfVisit(onVisitCreated.details);
      setResponseOfVisit(onVisitCreated.response);
    } else {
      // Reset state when the modal is closed or not in edit mode
      setHcm("");
      setStartDate(null);
      setPlanOfService("");
      setReasonForRemote("");
      setTitle("");
      setActivity("");
      setStartTime("");
      setEndTime("");
      setServiceType("Housing Sustaining");
      setMethodOfContact("in-person");
      setTravel("No");
      setMilesWithTenant("");
      setMilesWithoutTenant("");
      setSignature("");
      setSelectedTenantId("");
      setDetailsOfVisit("");
      setResponseOfVisit("");
    }
  }, [isOpen, isEdit, onVisitCreated]);
  useEffect(() => {
    fetchTenants();
    fetchHcm();
  }, []);
  const handleEditVisit = async () => {
    console.log("Editing Visit:");

    let changedFields = {};

    // Compare each field with its initial value and add to `changedFields` if it's different
    if (hcm !== onVisitCreated.hcm) changedFields.hcm = hcm;
    if (startDate && startDate !== new Date(onVisitCreated.startDate))
      changedFields.date = startDate;
    if (planOfService !== onVisitCreated.placeOfService)
      changedFields.planOfService = planOfService;
    if (reasonForRemote !== onVisitCreated.reasonForRemote)
      changedFields.reasonForRemote = reasonForRemote;
    if (activity !== onVisitCreated.title) changedFields.title = activity;
    if (startTime && startTime !== new Date(onVisitCreated.endDate))
      changedFields.startTime = startTime;
    if (endTime && endTime !== new Date(onVisitCreated.endDate))
      changedFields.endTime = endTime;
    if (serviceType !== onVisitCreated.serviceType)
      changedFields.serviceType = serviceType;
    if (methodOfContact !== onVisitCreated.typeMethod)
      changedFields.methodOfContact = methodOfContact;
    if (milesWithTenant !== onVisitCreated.milesWithTenant)
      changedFields.milesWithTenant = milesWithTenant;
    if (signature !== onVisitCreated.signature)
      changedFields.signature = signature;
    if (selectedTenantId !== onVisitCreated.tenantName)
      changedFields.selectedTenantId = selectedTenantId;
    if (detailsOfVisit !== onVisitCreated.notes)
      changedFields.notes = detailsOfVisit;
    if (responseOfVisit !== onVisitCreated.response)
      changedFields.response = responseOfVisit;
    // console.log(changedFields);

    if (Object.keys(changedFields).length > 0) {
      // Make the API call to update the visit
      const response = await fetch(
        `${API_ROUTES.VISITS.BASE}/${onVisitCreated._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(changedFields),
        }
      );

      if (response.ok) {
        console.log("Visit updated successfully!");
        toast.success("Visit updated successfully!");
        // Handle success (e.g., show toast or close modal)
      } else {
        console.error("Failed to update visit:", await response.json());
      }
    } else {
      console.log("No changes made.");
    }
  };

  const handleCreateAppointment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const creatorId = user?._id;
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

    // Validate reasonForRemote if methodOfVisit is "remote"
    if (
      methodOfContact === "indirect" &&
      reasonForRemote === "remote" &&
      !reasonForRemote
    ) {
      console.error(
        "Reason for remote is required for remote method of visit."
      );
      toast.error("Please provide a reason for remote visit.");
      return;
    }

    // Validate travel miles if travel is "yes"
    const totalMiles =
      travel === "Yes"
        ? parseFloat(milesWithTenant || 0) + parseFloat(milesWithoutTenant || 0)
        : 0;

    if (travel === "Yes" && totalMiles <= 0) {
      console.error("Total miles is required if travel is yes.");
      toast.error("Please provide valid miles if travel is enabled.");
      return;
    }

    console.log("Date:", startDate);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    // Prepare payload
    const payload = {
      creatorId: creatorId,
      tenantId: selectedTenantId || "Unknown",
      hcmId: hcm || "N/A",
      serviceType,
      activity: activity || "N/A",
      date: new Date(startDate).toISOString(),
      startTime,
      endTime,
      place: planOfService || "N/A",
      methodOfVisit:
        methodOfContact === "indirect"
          ? reasonForRemote === "remote"
            ? "remote"
            : "in-person"
          : "in-person",
      reasonForRemote: reasonForRemote || null,
      notes: detailsOfVisit || "N/A",
      response: responseOfVisit || "N/A",
      travel: travel.toLowerCase(),
      totalMiles: travel.toLowerCase() === "yes" ? totalMiles : null,
      travelWithTenant: milesWithTenant || null,
      travelWithoutTenant: milesWithoutTenant || null,
      signature: signature === "done" ? "done" : "not done",
    };
    // console.log("payyyui", payload);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_ROUTES.VISITS.BASE}/createVisit`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Visit created successfully.");
        // onVisitCreated();
        setScheduleCreated(true);
        setShowCreateScheduleDialog(true);
      } else {
        console.error("Failed to create Visit:", response.statusText);
        toast.error("Failed to create Visit.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("Error creating Visit. Please try again.");
    }
  };

  const handleCancelAppointment = () => {
    resetFormState();
  };

  const resetFormState = () => {
    setSelectedTenantId("");
    setHcm("");
    setServiceType("Housing Sustaining");
    setStartDate(null);
    setPlanOfService("");
    setMethodOfContact("in-person");
    setReasonForRemote("");
    setStartTime("");
    setActivity("");
    setTitle("");
    setActivity("");
    setResponseOfVisit("");
    setDetailsOfVisit("");
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
        <p className=" mb-6">Fill in the details to add a visit</p>

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
              value={hcm}
              onChange={(e) => setHcm(e.target.value)}
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
              Title
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)} // Use setActivity here to set selected activity
              className="border border-gray-300 rounded-md p-2 w-2/3"
            >
              <option value="" disabled>
                Select an activity
              </option>
              {activities[serviceType]?.length > 0 ? (
                activities[serviceType].map((service, index) => (
                  <option key={index} value={service}>
                    {service} {/* Displaying the activity name */}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading activities...
                </option>
              )}
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
                    // value={filters.startDate} // Bind value to filters.startDate
                    onChange={(date) =>
                      setStartDate(date?.format("YYYY-MM-DD"))
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
              <option value="direct">Direct</option>
              <option value="indirect">Indirect</option>
            </select>
          </div>

          {/* Conditional rendering for radio buttons */}
          {methodOfContact === "indirect" && (
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

          <div className="flex gap-4 mb-6">
            <label className="text-sm font-medium flex w-1/3">
              Details of Visit
            </label>
            <ReactQuill
              value={detailsOfVisit}
              onChange={setDetailsOfVisit}
              placeholder="Enter details of visit"
              className="w-2/3 mb-7"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <label className="text-sm font-medium flex w-1/3">
              Response of Visit
            </label>
            <ReactQuill
              value={responseOfVisit}
              onChange={setResponseOfVisit}
              placeholder="Enter response of visit"
              className="w-2/3 mb-7"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium flex items-center w-1/3">
              Travel
            </label>
            <div className="flex gap-4 w-2/3">
              <select
                value={travel}
                onChange={(e) => setTravel(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              {/* Total Miles */}
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium">Total Miles:</label>
                <input
                  type="number"
                  value={
                    travel === "Yes"
                      ? parseFloat(milesWithTenant || 0) +
                        parseFloat(milesWithoutTenant || 0)
                      : 0
                  }
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-20 bg-gray-100"
                />
              </div>
            </div>
          </div>

          {travel.toLowerCase() === "yes" && (
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
                  className="border border-gray-300 rounded-md p-2 w-2/3 appearance-none"
                  style={{
                    appearance: "none",
                    MozAppearance: "textfield",
                    WebkitAppearance: "none",
                  }}
                />
              </div>
            </>
          )}

          <div className="flex gap-4">
            <label className="text-sm font-medium flex items-center w-1/3">
              Signature
            </label>
            <div className="border border-gray-300 rounded-md p-2 w-2/3 bg-gray-100 text-gray-700">
              {user?.name || "No name available"}
            </div>
          </div>

          <div className="flex gap-4 w-2/3 " style={{ marginLeft: "auto" }}>
            <button
              onClick={isEdit ? handleEditVisit : handleCreateAppointment}
              className="cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  py-3 px-6 w-full mt-6  mb-9 "
            >
              {isEdit ? "Update Visit" : "Create Visit"}
            </button>
            <button
              onClick={onClose || handleCancelAppointment}
              className=" cursor-pointer transition-all bg-[#F57070] text-white 
              px-6 py-2 rounded-lg 
              border-red-700 border-b-[4px] 
              hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px] 
              py-3 px-6 w-full mt-6 mb-9 "
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

export default VisitModal;
