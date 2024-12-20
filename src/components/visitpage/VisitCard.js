import React, { useState } from "react";
import { Button, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GrLocation } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { formatTimeFormate } from "../../utils/timeFilter";
import { GiPathDistance } from "react-icons/gi";
import { API_ROUTES } from "../../routes";
const VisitCard = ({
  visitData,
  handleDetailsClick,
  handleEditClick,
  handleStatusUpdate,
  handleClosePopup,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handleDeleteClick = async (index, visit) => {
    console.log(index, visit);

    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      // Make the DELETE request
      const response = await fetch(`${API_ROUTES.VISITS.BASE}/${index}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });

      // Handle the response
      if (response.ok) {
        console.log("Delete successful!");
        // Optionally refresh the data or notify the user
      } else {
        const errorData = await response.json();
        console.error("Error deleting:", errorData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    setShowDeletePopup(false);
  };

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  console.log(visitData);
  return (
    <div className="flex flex-col w-full mt-10">
      {visitData
        // .filter((visit) => {
        //   const visitDate = new Date(visit.dos?.split("T")[0]); // Parse the visit date
        //   return visitDate >= twoWeeksAgo; // Keep only visits from the last two weeks
        // })
        .map((visit, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: "20px",
              padding: "5px",
              paddingX: "30px",
              borderRadius: "1.5rem",
              backgroundColor: "white",
              border:
                visit.approved && !visit.rejected
                  ? "2px solid #6DD98C"
                  : !visit.approved && visit.rejected
                    ? "2px solid #F57070"
                    : "2px solid #6F84F8",
            }}
          >
            {/* Title and Date/Duration Row */}
            <div
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   marginBottom: "1rem",
              // }}
              className="flex items-center mb-1"
            >
              <h3 style={{ marginRight: "2rem" }}>
                {visit?.serviceType ? visit.serviceType : "no service"} {" - "}
                <span className="text truncate">
                  {visit?.title ? visit.title : " No Title"}
                </span>
              </h3>

              <div className="flex gap-10 mt-1" style={{ marginLeft: "auto" }}>
                {!visit.approved && !visit.rejected && (
                  <div className="flex gap-4">
                    <button
                      style={{
                        backgroundColor: "#F57070",
                        color: "white",
                        padding: "10px 30px",
                        borderRadius: "2rem",
                        border: "2px solid #F57070",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.color = "#F57070";
                        e.currentTarget.style.borderColor = "#F57070";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#F57070";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.borderColor = "#F57070";
                      }}
                      onClick={() => handleStatusUpdate(index, false)}
                    >
                      Reject
                    </button>
                    <button
                      style={{
                        backgroundColor: "#6DD98C",
                        color: "white",
                        padding: "10px 30px",
                        borderRadius: "2rem",
                        border: "2px solid #6DD98C",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.color = "#6DD98C";
                        e.currentTarget.style.borderColor = "#6DD98C";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#6DD98C";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.borderColor = "#6DD98C";
                      }}
                      onClick={() => handleStatusUpdate(index, true)}
                    >
                      Approve
                    </button>
                  </div>
                )}

                {/* Edit and Delete Icons */}
                <div>
                  <IconButton
                    onClick={() => handleEditClick(index, visit._id, visit)}
                  >
                    <EditIcon style={{ color: "#6F84F8" }} />
                  </IconButton>
                  <IconButton onClick={() => setShowDeletePopup(true)}>
                    <DeleteIcon style={{ color: "#F57070" }} />
                  </IconButton>
                </div>
              </div>
            </div>

            {/* HCM and DOS Row */}

            <div style={{ display: "flex", paddingBottom: "5px" }}>
              <div
                className="flex flex-col gap-3 w-1/3"
                //   style={{ marginBottom: "10px" }}
              >
                <p>
                  HCM -
                  <span
                    style={{
                      color:
                        visit.approved && !visit.rejected
                          ? "#6DD98C"
                          : !visit.approved && visit.rejected
                            ? "#F57070"
                            : "#6F84F8",
                      marginLeft: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {visit.hcm}
                  </span>
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CiCalendarDate style={{ fontSize: "2rem" }} />

                  <p
                    style={{
                      fontSize: "1.1rem",
                      paddingLeft: "0.5rem",
                      paddingTop: "0.2rem",
                      color:
                        visit.approved && !visit.rejected
                          ? "#6DD98C"
                          : !visit.approved && visit.rejected
                            ? "#F57070"
                            : "#6F84F8",
                    }}
                  >
                    {formatTimeFormate(visit.dos?.split("T")[0])}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <strong>
                    <GrLocation
                      style={{ fontSize: "1.5rem", marginLeft: "0.2rem" }}
                    />
                  </strong>{" "}
                  <div>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        paddingLeft: "0.7rem",
                        color:
                          visit.approved && !visit.rejected
                            ? "#6DD98C"
                            : !visit.approved && visit.rejected
                              ? "#F57070"
                              : "#6F84F8",
                        fontWeight: "bold",
                      }}
                    >
                      {visit.placeOfService}
                    </p>
                    <p
                      style={{
                        paddingLeft: "0.7rem",
                      }}
                    >
                      {visit.typeMethod}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <GiPathDistance style={{ fontSize: "2rem" }} />

                  <p
                    style={{
                      fontSize: "1.1rem",
                      paddingLeft: "0.5rem",
                      paddingTop: "0.2rem",
                      color:
                        visit.approved && !visit.rejected
                          ? "#6DD98C"
                          : !visit.approved && visit.rejected
                            ? "#F57070"
                            : "#6F84F8",
                    }}
                  >
                    {(visit.totalMile || "0") + " Miles"}
                  </p>
                </div>
              </div>

              {/* Visit Details */}
              <div>
                <div style={{ marginLeft: "2px", width: "55vw" }}>
                  <p>
                    <p
                      style={{
                        color:
                          visit.approved && !visit.rejected
                            ? "#6DD98C"
                            : !visit.approved && visit.rejected
                              ? "#F57070"
                              : "#6F84F8",
                      }}
                    >
                      Visit Details:
                    </p>{" "}
                    <div
                      style={{
                        border:
                          visit.approved && !visit.rejected
                            ? "1px solid #6DD98C"
                            : !visit.approved && visit.rejected
                              ? "1px solid #F57070"
                              : "1px solid #6F84F8",
                        overflow: "hidden",
                        height: "6em",
                        lineHeight: "1.5em",
                        padding: "0.5em",
                        paddingLeft: "1rem",
                        borderRadius: "1rem",
                        color: "#505254",
                        marginTop: "0.2rem",
                      }}
                    >
                      {visit.details && visit.details.length > 100 ? (
                        <>
                          {visit.details.substring(0, 100)}...
                          <Button
                            onClick={() => handleDetailsClick(visit.details)}
                          >
                            View More
                          </Button>
                        </>
                      ) : (
                        visit.details || "No details provided."
                      )}
                    </div>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      marginLeft: "auto",
                      //   marginTop: "-20px",
                      marginTop: "20px",
                    }}
                  >
                    Signature:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color:
                          visit.approved && !visit.rejected
                            ? "#6DD98C"
                            : !visit.approved && visit.rejected
                              ? "#F57070"
                              : "#6F84F8",
                      }}
                    >
                      {visit.signature || "N/A"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {/* Signature and Actions */}

            {/* Delete Popup */}
            {showDeletePopup && (
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
                      onClick={() => setShowDeletePopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded-2xl hover:bg-green-600"
                      onClick={() => handleDeleteClick(visit._id, visit)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Box>
        ))}
    </div>
  );
};

export default VisitCard;
