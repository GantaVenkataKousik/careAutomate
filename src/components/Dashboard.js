import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import tenant from "../images/tenant.jpg";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import {
  FaBars,
  FaCheck,
  FaDownload,
  FaFileAlt,
  FaMicrophone,
  FaTimes,
  FaUser,
  FaUserTie,
  FaCalendarAlt,
  FaEnvelope,
  FaUserEdit,
  FaWalking,
  FaRegFolder,
  FaRegFilePdf,
} from "react-icons/fa";
import { Document, Page } from "react-pdf";
import samplePDF from "../assets/sample_document.pdf";
import { pdfjs } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ROUTES } from "../routes";
import { formatTime, monthNames, today } from "../utils/timeFilter";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tenantId, tenantData } = location.state || {};
  const [appointments, setAppointments] = useState([]);
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(tenantData);
  // console.log("visits", visits.visits[0]?.hcmId?.name);

  const fetchVisits = async (tenantData) => {
    try {
      const token = localStorage.getItem("token");
      const id = tenantData._id;
      console.log("user", id);
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await fetch(`${API_ROUTES.VISITS}/filtervisits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tenantId: id }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setVisits(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setIsLoading(false); // Handle loading state in case of error
    }
  };
  useEffect(() => {
    const fetchAppointments = async (tenantId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const response = await fetch(
          `${API_ROUTES.APPOINTMENTS}/filterAppointments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              tenantId: tenantId, // Send tenantId in the body
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data); // Assume `data` contains the list of appointments

        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
        setIsLoading(false); // Handle loading state in case of error
      }
    };

    fetchAppointments();
    fetchVisits(tenantData);
  }, []);

  const handlePlanUsageClick = () => {
    navigate("/tenants/planUsage", { state: { tenantId } });
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const openDocument = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const sampleRecords = [
    {
      id: 1,
      name: "Robert John",
      date: "08-09-2024, 2:00 PM",
      description:
        "We'll meet tomorrow, also bring some additional documents...",
    },
    {
      id: 2,
      name: "Alice Smith",
      date: "08-09-2024, 3:00 PM",
      description:
        "Discussion about project updates. Make sure to prepare the latest stats.",
    },
    {
      id: 3,
      name: "Mark Brown",
      date: "08-10-2024, 1:00 PM",
      description:
        "Review meeting for the last quarter's performance and next steps.",
    },
    {
      id: 4,
      name: "Sarah",
      date: "08-11-2024, 4:00 PM",
      description:
        "Catch-up on the progress of ongoing tasks, please bring your reports.",
    },
    {
      id: 4,
      name: "Saraheu",
      date: "08-11-2024, 4:00 PM",
      description:
        "Catch-up on the progress of ongoing tasks, please bring your reports.",
    },
  ];

  const togglePopup = (description) => {
    setSelectedDescription(description);
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div
      className=" flex flex-col  m-2 overflow-y-auto gap-10"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="flex gap-6">
        {/* 70% Column */}
        <div className=" bg-white p-6 rounded-[20px] shadow-lg w-[60rem]">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-1 ">
            <div className="flex justify-center items-center gap-3">
              <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
              <h2 className="text-2xl font-semibold text-[#6F84F8]  ">
                Profile Details
              </h2>
            </div>

            <div className="flex space-x-4">
              <button className="  text-[#6F84F8] py-2 px-4 rounded-[20px] border border-[#6F84F8] border-2">
                Notes
              </button>
              <button className="  text-[#6F84F8] py-2 px-4 rounded-[20px] border border-[#6F84F8] border-2">
                Eligibility
              </button>
              <button
                className="  text-[#6F84F8] py-2 px-4 rounded-[20px] border border-[#6F84F8] border-2"
                onClick={handlePlanUsageClick}
              >
                Plan Usage
              </button>
              <button className="bg-[#6F84F8] hover:bg-[#6F84F8] text-white py-2 px-4 rounded-[20px] flex items-center">
                <FaDownload className="mr-2" /> Download Info
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex flex-row items-center justify-evenly p-1 gap-9">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-6">
                <img
                  src={tenant}
                  alt="John Doe"
                  className="w-36 h-36 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-2xl font-extrabold text-[#505254]">
                    {tenantData.name || "Unknown Tenant"}
                  </h1>
                  <p className="text-lg text-[#505254]">
                    {tenantData.tenantData.gender || "Male"},{" "}
                    {new Date().getFullYear() -
                      new Date(tenantData.tenantData.dob).getFullYear()}{" "}
                    years old
                  </p>
                </div>
              </div>

              {/* <div className="flex space-x-4">
                <FaCalendarAlt
                  className="text-2xl text-[#6F84F8] cursor-pointer"
                  title="Appointments"
                />
                <FaEnvelope
                  className="text-2xl text-[#6F84F8] cursor-pointer"
                  title="Messages"
                />
                <FaWalking
                  className="text-2xl text-[#6F84F8] cursor-pointer"
                  title="Visits"
                />
                <FaUserEdit
                  className="text-2xl text-[#6F84F8] cursor-pointer"
                  title="Edit Profile"
                />
              </div> */}

              {/* Contact Info */}
              <div className="w-full space-y-2 text-gray-700">
                <div className="flex justify-between flex-col">
                  <p className="text-[#6F84F8] text-xl">
                    <strong>Phone Number:</strong>
                  </p>
                  <p className="text-xl font-semibold">{tenantData?.phoneNo}</p>
                </div>
                <div className="flex justify-between flex-col">
                  <p className="text-[#6F84F8] text-xl">
                    <strong>Email:</strong>
                  </p>
                  <p className="text-xl font-semibold">{tenantData?.email}</p>
                </div>
              </div>
            </div>
            {/* Documents */}
            <div class="bg-white p-6 rounded-lg shadow-md w-96">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold text-blue-500">Documents</h2>
                <a href="/assign-hcm" class="text-blue-500 hover:underline">
                  View More
                </a>
              </div>
              <p class="text-sm text-blue-500">27 Oct 2024</p>
              <ul class="mt-4 space-y-2">
                <li class="relative pl-4">
                  <div class="absolute left-0 top-0 h-full border-l-2 border-gray-300"></div>
                  <div class="absolute left-0 top-5 w-4 border-t-2 border-gray-300"></div>
                  <button class="flex items-center text-gray-800 font-semibold hover:underline">
                    <FaRegFolder class="mr-2" />
                    tenant_street_group
                  </button>
                  <ul class="mt-2 space-y-2 pl-6">
                    <li class="relative pl-6">
                      <div class="absolute left-0 top-0 h-full border-l-2 border-gray-300"></div>
                      <div class="absolute left-0 top-5 w-4 border-t-2 border-gray-300"></div>
                      <button class="flex items-center text-gray-600 hover:underline">
                        <FaRegFilePdf class="mr-2" />
                        tenant_krishna.pdf
                      </button>
                    </li>
                    <li class="relative pl-6">
                      <div class="absolute left-0 top-0 h-full border-l-2 border-gray-300"></div>
                      <div class="absolute left-0 top-5 w-4 border-t-2 border-gray-300"></div>
                      <button class="flex items-center text-gray-600 hover:underline">
                        <FaRegFilePdf class="mr-2" />
                        tenant_krishna.pdf
                      </button>
                    </li>
                  </ul>
                </li>
                <li class="relative pl-4">
                  <div class="absolute left-0 top-0 h-full border-l-2 border-gray-300"></div>
                  <div class="absolute left-0 top-5 w-4 border-t-2 border-gray-300"></div>
                  <button class="flex items-center text-gray-600 hover:underline">
                    <FaRegFilePdf class="mr-2" />
                    tenant_krishna.pdf
                  </button>
                </li>
                <li class="relative pl-4">
                  <div class="absolute left-0 top-0 h-full border-l-2 border-gray-300"></div>
                  <div class="absolute left-0 top-5 w-4 border-t-2 border-gray-300"></div>
                  <button class="flex items-center text-gray-600 hover:underline">
                    <FaRegFilePdf class="mr-2" />
                    tenant_krishna.pdf
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 30% Column */}
        <div className="bg-white p-5 rounded-[20px] shadow-lg w-[22rem]">
          {/* Assigned HCMs Header */}
          <div className="flex flex-col mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
              <h2 className="text-2xl font-semibold text-[#6F84F8]">
                Assigned HCM's
              </h2>
            </div>
            <a
              href="/assign-hcm"
              className="text-[#5970F4] hover:underline text-sm ml-auto mt-2"
            >
              View More
            </a>
          </div>

          {/* List of Assigned HCMs */}
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div
                className="bg-[#e3e7f8] flex items-center justify-between p-3 rounded-lg shadow-sm"
                key={index}
              >
                <FaUserTie className="text-xl text-black" />
                <p className="text-[#435DED] font-medium text-sm">
                  Robert Roos
                </p>
                <PhoneInTalkIcon className="text-black" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Four columns layout */}
      <div className="w-full flex gap-1 gap-3  pb-10 ">
        {/* Appointments */}
        <div className="flex w-[43rem] bg-white p-4 shadow-lg rounded-[20px] gap-5">
          <div className="w-[19rem] p-1">
            <div className="flex gap-2 items-center pb-3">
              <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
              <h2 className="text-2xl font-semibold text-[#6F84F8]">
                Appointments
              </h2>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F84F8] mb-4 text-md">Today</span>
              <a
                href="/appointments"
                className="text-[#6F84F8] hover:underline text-md"
              >
                View More
              </a>
            </div>

            <div className="space-y-2">
              {/* Loop through upcoming appointments */}
              {appointments?.["appointments"]?.["upcoming"]?.[
                today.getFullYear()
              ]?.[monthNames[today.getMonth()]]?.[
                today.getDate() < 9 ? "0" + today.getDate() : today.getDate
              ] ? (
                appointments["appointments"]["upcoming"][today.getFullYear()][
                  monthNames[today.getMonth()]
                ][
                  today.getDate() < 9 ? "0" + today.getDate() : today.getDate
                ].map((appointment) => (
                  <div key={appointment._id}>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-700">
                        {appointment.startTime.length > 6
                          ? formatTime(appointment.startTime)
                          : appointment.startTime}{" "}
                        -{" "}
                        {appointment.endTime.length > 6
                          ? formatTime(appointment.endTime)
                          : appointment.endTime}
                      </p>
                    </div>
                    <div className="hover:bg-green-100 p-3 rounded-[20px]">
                      <div className="flex justify-between items-center mt-3">
                        {/* Display tenant's name */}
                        <p className="text-[#6F84F8]">
                          {appointment.hcmDetails.name}
                        </p>
                        <div className="flex space-x-3 text-gray-500">
                          <FaMicrophone />
                          <FaUser />
                          <PhoneInTalkIcon />
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        {/* Display service type */}
                        <p className="text-sm text-gray-600">
                          {appointment.serviceType}
                        </p>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-green-200 flex items-center justify-center rounded-full">
                            <FaCheck className="text-green-600" />
                          </div>
                          <div className="w-6 h-6 bg-red-200 flex items-center justify-center rounded-full">
                            <FaTimes className="text-red-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No upcoming appointments for this day.</p>
              )}
            </div>
          </div>

          <div className="border-dotted border-2 border-[#6F84F8]"></div>

          {/* Visits */}
          <div className="w-[21rem] p-1">
            <div className="flex gap-3 items-center pb-3">
              <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
              <h2 className="text-2xl font-semibold text-[#6F84F8]">Visits</h2>
            </div>
            <div className="flex justify-between">
              <span className="block text-[#6F84F8] text-md">Today</span>
              <a
                href="/calendar"
                className="text-[#6F84F8] hover:underline text-md"
              >
                View More
              </a>
            </div>

            <div className="space-y-2">
              {visits?.visits?.length > 0 ? (
                visits.visits.map((visit) => (
                  <div key={visit.id} className="p-2">
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-medium text-[#6F84F8]">
                        {visit?.hcmId?.name || "Unknown Name"}
                      </p>

                      <div className="flex space-x-3 text-gray-500">
                        <FaMicrophone />
                        <FaUser />
                        <FaFileAlt />
                        <FaBars />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-gray-800">
                          {visit.startTime.length > 6
                            ? formatTime(visit.startTime)
                            : visit.startTime}{" "}
                          -{" "}
                          {visit.endTime.length > 6
                            ? formatTime(visit.endTime)
                            : visit.endTime}
                          {/* {visit.startTime || "N/A"} - {visit.endTime || "N/A"} */}
                        </p>
                        <p className="text-sm text-gray-600">
                          {visit.serviceType || "No Purpose"}
                        </p>
                      </div>
                      <a
                        href="/sign-send"
                        className="text-[#6F84F8] hover:underline text-[15px]"
                      >
                        Sign & Send
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No visits available</p>
              )}
            </div>
          </div>
        </div>

        {/* Communication */}
        <div className="w-[21rem] bg-white p-6 shadow-lg rounded-[20px]">
          <div className="flex   items-center  pb-1">
            <div className="flex justify-center items-center gap-2">
              <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
              <h2 className="text-2xl font-semibold text-[#6F84F8]">
                Communication
              </h2>
            </div>
          </div>
          <div className="flex justify-end p-2">
            <a
              href="/messages"
              className="text-[#6F84F8] hover:underline text-md"
            >
              View More
            </a>
          </div>
          <div className="space-y-2">
            {sampleRecords.map((record) => (
              <div
                key={record.id}
                className=" bg-blue-50 px-6 p-2 rounded-[20px]"
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-800">{record.name}</p>
                  <span className="text-sm text-gray-500">{record.date}</span>
                </div>
                <p
                  className="text-gray-600 mt-2 cursor-pointer hover:text-blue-600"
                  onClick={() => togglePopup(record.description)}
                >
                  {record.description.length > 50
                    ? `${record.description.substring(0, 50)}...`
                    : record.description}
                </p>
              </div>
            ))}
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem]">
                <h3 className="text-lg font-semibold mb-4">Details</h3>
                <p className="text-gray-700">{selectedDescription}</p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={togglePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bills & Payments */}
        <div className="w-[18rem]  bg-white p-6 shadow-lg rounded-[20px]">
          <div className="flex justify-between items-center  pb-3 ">
            <div className="flex justify-center items-center gap-2">
              <div className="bg-[#6F84F8] w-3 rounded-[20px] h-10"></div>
              <h2 className="text-2xl font-semibold text-[#6F84F8]">
                Bills & Payments
              </h2>
            </div>
          </div>
          <div className="flex justify-end">
            <a
              href="/BillingPayments"
              className="text-[#6F84F8] hover:underline"
            >
              View More
            </a>
          </div>
          <p className="text-[#6F84F8] mb-4 text-xl font-bold">This Month</p>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-[#6F84F8]">Robert John</p>
                  <p className="text-green-600">$20</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">10:00 AM</p>
                <p>Hourly Pay</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
