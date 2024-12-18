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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { IoMdTime } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const VisitModal = ({ isOpen, onClose, onVisitCreated }) => {
  const [hcm, setHcm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [planOfService, setPlanOfService] = useState("");
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
  const [tenantID, setTenantName] = useState("");

  const [travel, setTravel] = useState("No");
  const [milesWithTenant, setMilesWithTenant] = useState("");
  const [milesWithoutTenant, setMilesWithoutTenant] = useState("");
  const [signature, setSignature] = useState("");
  const [hcmList, setHcmList] = useState([]); // List of HCMs
  const [selectedTenantId, setSelectedTenantId] = useState(""); // Selected tenant ID
  const [selectedHcmId, setSelectedHcmId] = useState("");
  const [detailsOfVisit, setDetailsOfVisit] = useState("");
  const [responseOfVisit, setResponseOfVisit] = useState("");
  const tenantName = useSelector((state) => state.hcm.tenantName);
  const tenantId = useSelector((state) => state.hcm.tenantId);
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;

  console.log("Hcm Name in step4:", tenantName);
  console.log("Hcm ID in step4:", tenantId);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(
          "https://careautomate-backend.vercel.app/tenant/all",
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
      hcmId: selectedHcmId || "N/A",
      serviceType,
      title: activity || "N/A",
      dateOfService: startDate,
      startTime,
      endTime,
      placeOfService: planOfService || "N/A",
      methodOfVisit:
        methodOfContact === "indirect"
          ? reasonForRemote === "remote"
            ? "remote"
            : "in-person"
          : "in-person",
      reasonForRemote: reasonForRemote || null,
      detailsOfVisit: detailsOfVisit || "N/A",
      responseOfVisit: responseOfVisit || "N/A",
      travel: travel.toLowerCase(),
      totalMiles: travel === "Yes" ? totalMiles : null,
      travelWithTenant: milesWithTenant || null,
      travelWithoutTenant: milesWithoutTenant || null,
      signature: signature === "done" ? "done" : "not done",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://careautomate-backend.vercel.app/visit/createVisit",
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
        onVisitCreated();
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
    setTitle("");
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
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="Enter Title"
              className="border border-gray-300 rounded-md p-2 w-2/3"
            />
          </div>

          <div className="flex gap-4 justify-between">
            <label className="text-sm font-medium flex items-center mb-1 w-1/3">
              <BsCalendar2Date size={24} className="mr-2" />
              Date
            </label>
            {/* Date Input */}
            <div className="flex gap-6 w-2/3">
              <div className="flex items-center gap-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  maxDate={new Date()}
                  dateFormat="MM-dd-yyyy"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholderText="(MM-DD-YYYY)"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
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

          {travel === "Yes" && (
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
              onClick={handleCreateAppointment}
              className="cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  py-3 px-6 w-full mt-6  mb-9 "
            >
              Create Visit
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
