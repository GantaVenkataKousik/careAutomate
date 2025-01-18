import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CiCalendarDate } from "react-icons/ci";
import { formatTimeFormate } from "../../utils/commonUtils/timeFilter";
import { GrLocation } from "react-icons/gr";
import { GiPathDistance } from "react-icons/gi";
import { API_ROUTES } from "../../routes";
import { RiAdminLine, RiUserLine } from "react-icons/ri";
import { PiTimer } from "react-icons/pi";

const VisitCard = ({
  visitData,
  handleDetailsClick,
  handleEditClick,
  handleStatusUpdate,
  handleClosePopup,
}) => {
  const getColorClass = (status, type) => {
    const colorMapping = {
      approved: "#6DD98C", // Blue
      rejected: "#F57070", // Red
      pending: "#6F84F8", // Blue
    };

    const color = colorMapping[status] || "#6F84F8"; // Default to blue if status is unknown

    if (type === "border") {
      return `border-[${color}]`; // Return border class
    } else if (type === "text") {
      return `text-[${color}]`; // Return text color class
    }

    return ""; // Default: Return empty if type is not provided correctly
  };

  // Local state for tracking which visit's delete popup is open
  const [deletePopups, setDeletePopups] = useState({});

  // Open the delete popup for the specific visit ID
  const handleDeleteClick = (visitId) => {
    setDeletePopups((prevState) => ({
      ...prevState,
      [visitId]: true,
    }));
  };

  // Close the delete popup for the specific visit ID
  const handleCloseDeletePopup = (visitId) => {
    setDeletePopups((prevState) => ({
      ...prevState,
      [visitId]: false,
    }));
  };

  // Confirm delete action
  const confirmDelete = async (visitId) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch(`${API_ROUTES.VISITS.BASE}/${visitId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Delete successful!");
        // Optionally refresh or update state to remove the visit from the list
      } else {
        const errorData = await response.json();
        console.error("Error deleting:", errorData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      handleCloseDeletePopup(visitId);
    }
  };
  function calculateDuration(start, end) {
    // Parse the ISO date strings into Date objects
    const startTime = new Date(start);
    const endTime = new Date(end);

    // Calculate the difference in milliseconds
    const durationMs = endTime - startTime;

    // Convert milliseconds to minutes
    const durationMinutes = durationMs / (1000 * 60);

    return durationMinutes + " mins"; // Returns the duration in minutes
  }
  return (
    <div className="flex flex-col w-full ">
      {visitData.map((visit, index) => (
        <div
          key={visit._id}
          className={`mb-[20px] p-[5px] px-[30px] rounded-2xl bg-white border-2 ${getColorClass(
            visit.status,
            "border"
          )} overflow-hidden`}
        >
          <div className="flex items-center mb-2">
            <div className="flex items-center gap-4 justify-start mb-2">
              <p className="flex items-center gap-2">
                <RiAdminLine className="w-4 h-4" />
                HCM -
                <span
                  className={`${getColorClass(visit.status, "text")} font-bold`}
                >
                  {visit.hcm}
                </span>
              </p>
              <p className="text-gray-600">with</p>
              <p className="flex items-center gap-2">
                <RiUserLine className="w-4 h-4" />
                Tenant -
                <span
                  className={`${getColorClass(visit.status, "text")} font-bold`}
                >
                  {visit.tenantName}
                </span>
              </p>
            </div>

            <div className="flex gap-10 items-center mt-1 ml-auto">
              {visit.status !== "pending" ? (
                <button
                  className={`${
                    visit.status === "approved"
                      ? "bg-[#F57070] text-white border-[#F57070] hover:bg-white hover:text-[#F57070]"
                      : "bg-[#6DD98C] text-white border-[#6DD98C] hover:bg-white hover:text-[#6DD98C]"
                  } px-6 py-2 rounded-full border-2 transition-all duration-300`}
                  onClick={() => handleStatusUpdate(visit._id, "pending")}
                >
                  {visit.status === "approved"
                    ? "Unapprove"
                    : "Withdraw Rejection"}
                </button>
              ) : (
                <>
                  <button
                    className="bg-[#F57070] text-white px-6 py-2 rounded-full border-2 border-[#F57070] transition-all duration-300 hover:bg-white hover:text-[#F57070] hover:border-[#F57070]"
                    onClick={() => handleStatusUpdate(visit._id, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-[#6DD98C] text-white px-6 py-2 rounded-full border-2 border-[#6DD98C] transition-all duration-300 hover:bg-white hover:text-[#6DD98C] hover:border-[#6DD98C]"
                    onClick={() => handleStatusUpdate(visit._id, "approved")}
                  >
                    Approve
                  </button>
                </>
              )}
              <div className="flex gap-4">
                <EditIcon
                  className="text-[#6F84F8] cursor-pointer"
                  onClick={() => handleEditClick(index, visit._id, visit)}
                />
                <DeleteIcon
                  className="text-[#F57070] cursor-pointer"
                  onClick={() => handleDeleteClick(visit._id)} // Pass visit ID for delete
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {/**kok */}

            <div className="flex pb-2 gap-10 w-full">
              <div className="flex flex-col gap-3 max-w-[400px]">
                <div className="flex items-center">
                  <CiCalendarDate style={{ fontSize: "2rem" }} />
                  <p
                    className={`${getColorClass(visit.status, "text")} text-lg pl-2 pt-1`}
                  >
                    {formatTimeFormate(visit.dos?.split("T")[0])}
                  </p>
                </div>
                <div className="flex items-center">
                  <PiTimer style={{ fontSize: "2rem" }} />
                  <p
                    className={`${getColorClass(visit.status, "text")} text-lg pl-2 pt-1`}
                  >
                    {calculateDuration(
                      visit?.duration.split(" - ")[0],
                      visit?.duration.split(" - ")[1]
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <strong>
                    <GrLocation className="text-2xl ml-1" />
                  </strong>
                  <div>
                    <p
                      className={`${getColorClass(visit.status, "text")} text-lg pl-3 pt-1 font-bold`}
                    >
                      {visit.placeOfService}
                    </p>
                    <p className="pl-3"> {visit.typeMethod}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <strong>
                    <GiPathDistance style={{ fontSize: "2rem" }} />
                  </strong>
                  <p
                    className={`${getColorClass(visit.status, "text")} text-lg pl-3 pt-1`}
                  >
                    {(visit.totalMile || "0") + " Miles"}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex-col">
                <h3 className=" flex-1 overflow-hidden text-ellipsis whitespace-nowrap mb-[2px]">
                  <span
                    className={`${getColorClass(visit.status, "text")} font-bold`}
                  >
                    {visit.serviceType}
                  </span>{" "}
                  -{" "}
                  <span className="text">
                    {visit.title && visit.title.length > 40
                      ? visit.title.substring(0, 45) + "..."
                      : visit.title || "No Title"}
                  </span>
                </h3>
                <div
                  className={`flex-1  border-2 ${getColorClass(visit.status, "border")} px-2 pt-2 rounded-xl`}
                >
                  <div>
                    <p className={`${getColorClass(visit.status, "text")}`}>
                      Visit Details
                    </p>
                    <div
                      className={`${getColorClass(visit.status, "border")} overflow-hidden h-8 leading-6 pl-4 text-[#505254] `}
                    >
                      {visit.details && visit.details.length > 20 ? (
                        <>
                          {visit.details.substring(0, 20)}...
                          <button
                            className={`${getColorClass("visit.status", "text")} ml-2 rounded-full px-2`}
                            onClick={() => {
                              handleDetailsClick(
                                visit.details,
                                "Visit Details"
                              );
                            }}
                          >
                            View More
                          </button>
                        </>
                      ) : (
                        visit.details || "No details provided."
                      )}
                    </div>
                  </div>
                  <div>
                    <p
                      className={`${getColorClass(visit.status, "text")} mt-1`}
                    >
                      Response of the Visit
                    </p>
                    <div
                      className={`${getColorClass(visit.status, "border")} overflow-hidden h-8 leading-6  pl-4 text-[#505254] `}
                    >
                      {visit.response && visit.response.length > 20 ? (
                        <>
                          {visit.response.substring(0, 30)}...
                          <button
                            className={`${getColorClass("visit.status", "text")} ml-2 rounded-full px-2`}
                            onClick={() => {
                              handleDetailsClick(
                                visit.response,
                                "Response of the Visit"
                              );
                            }}
                          >
                            View More
                          </button>
                        </>
                      ) : (
                        visit.response || "No response provided."
                      )}
                    </div>
                  </div>
                  {visit.reasonForRemote && (
                    <div>
                      <p
                        className={`${getColorClass(visit.status, "text")} mt-1`}
                      >
                        Reason for Remote
                      </p>
                      <div
                        className={`${getColorClass(visit.status, "border")} overflow-hidden h-8 leading-6  pl-4 text-[#505254] `}
                      >
                        {visit.reasonForRemote &&
                        visit.reasonForRemote.length > 20 ? (
                          <>
                            {visit.reasonForRemote.substring(0, 30)}...
                            <button
                              className={`${getColorClass("visit.status", "text")} ml-2 rounded-full px-2`}
                              onClick={() => {
                                handleDetailsClick(
                                  visit.reasonForRemote,
                                  "Reason For Remote"
                                );
                              }}
                            >
                              View More
                            </button>
                          </>
                        ) : (
                          visit.reasonForRemote ||
                          "No reasonForRemote provided."
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end items-center ml-auto">
                  <span className="ml-auto">
                    Signature:{" "}
                    <span
                      className={`${getColorClass(visit.status, "text")} font-bold`}
                    >
                      {visit.signature === "done"
                        ? visit.hcm
                        : visit.signature || "N/A"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Popup */}
          {deletePopups[visit._id] && (
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-10">
              <div className="bg-white p-6 w-fit rounded-xl shadow-lg">
                <p className="text-black font-semibold">
                  Are you sure you want to delete this visit?
                </p>
                <div className="mt-4 text-gray-500 text-sm">
                  <span className="text-black">Note:</span> The respective HCM
                  will be notified about this.
                </div>
                <div className="mt-5 flex justify-end space-x-4">
                  <button
                    className="px-3 py-1 text-sm border-2 border-red-300 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white"
                    onClick={() => handleCloseDeletePopup(visit._id)} // Close the delete popup
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-2xl hover:bg-green-600"
                    onClick={() => confirmDelete(visit._id)} // Confirm delete for the specific visit
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VisitCard;
