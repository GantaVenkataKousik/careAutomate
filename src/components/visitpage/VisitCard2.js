import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CiCalendarDate } from "react-icons/ci";
import { formatTimeFormate } from "../../utils/timeFilter";
import { GrLocation } from "react-icons/gr";
import { GiPathDistance } from "react-icons/gi";
import { API_ROUTES } from "../../routes";

const VisitCard2 = ({
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

  return (
    <div className="flex flex-col w-full mt-10">
      {visitData.map((visit, index) => (
        <div
          key={visit._id}
          className={`mb-[20px] p-[5px] px-[30px] rounded-2xl bg-white border-2 ${getColorClass(
            visit.status,
            "border"
          )} overflow-hidden`}
        >
          <div className="flex items-center mb-2">
            <h3 className="mr-[2rem] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              Service Type -{" "}
              <span className="text">
                {visit.title && visit.title.length > 40
                  ? visit.title.substring(0, 45) + "..."
                  : visit.title || "No Title"}
              </span>
            </h3>

            <div className="flex gap-10 items-center mt-1 ml-auto">
              {visit.status === "pending" && (
                <div className="flex gap-4">
                  <button
                    className="bg-[#F57070] text-white px-6 py-2.5 rounded-full border-2 border-[#F57070] transition-all duration-300 hover:bg-white hover:text-[#F57070] hover:border-[#F57070]"
                    onClick={() => handleStatusUpdate(index, false)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-[#6DD98C] text-white px-6 py-2.5 rounded-full border-2 border-[#6DD98C] transition-all duration-300 hover:bg-white hover:text-[#6DD98C] hover:border-[#6DD98C]"
                    onClick={() => handleStatusUpdate(index, true)}
                  >
                    Approve
                  </button>
                </div>
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

          <div className="flex pb-2 gap-10 w-full">
            <div className="flex flex-col gap-3 max-w-[400px]">
              <p>
                HCM -
                <span
                  className={`${getColorClass(visit.status, "text")} ml-2 font-bold`}
                >
                  {visit.hcm}
                </span>
              </p>
              <div className="flex items-center">
                <CiCalendarDate style={{ fontSize: "2rem" }} />
                <p
                  className={`${getColorClass(visit.status, "text")} text-lg pl-2 pt-1`}
                >
                  {formatTimeFormate(visit.dos?.split("T")[0])}
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

            <div className="flex-1 ml-[2px]">
              <div>
                <p className={`${getColorClass(visit.status, "text")}`}>
                  Visit Details
                </p>
                <div
                  className={`${getColorClass(visit.status, "border")} border-2 overflow-hidden h-24 leading-6 p-2 pl-4 rounded-xl text-[#505254] mt-1`}
                >
                  {visit.details && visit.details.length > 20 ? (
                    <>
                      {visit.details.substring(0, 20)}...
                      <button
                        className={`${getColorClass("visit.status", "text")} ml-2 rounded-full px-2`}
                        onClick={() => {
                          handleDetailsClick(visit.details);
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
              <div className="flex justify-end items-center">
                <span className="ml-auto mt-6">
                  Signature:{" "}
                  <span
                    className={`${getColorClass(visit.status, "text")} font-bold`}
                  >
                    {visit.signature || "N/A"}
                  </span>
                </span>
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

export default VisitCard2;
