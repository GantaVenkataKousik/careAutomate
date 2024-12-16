import React from "react";
import { Button, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GrLocation } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";

const VisitCard = ({
  visitData,
  handleDeleteClick,
  handleDetailsClick,
  handleEditClick,
  handleStatusUpdate,
  handleClosePopup,
}) => {
  return (
    <div className="flex flex-col w-full">
      {visitData.map((visit, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: "20px",
            padding: "20px",
            paddingX: "30px",
            borderRadius: "1.5rem",
            backgroundColor: "white",
            // visit.approved && !visit.rejected
            //   ? "#AAFFC2"
            //   : !visit.approved && visit.rejected
            //     ? "#F57070"
            //     : "white",
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
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ marginRight: "2rem" }}>
              {visit?.serviceType ? visit.serviceType : "no service"}
            </h3>
            {/* <p
                style={{
                  color:
                    visit.approved && !visit.rejected
                      ? "#6DD98C"
                      : !visit.approved && visit.rejected
                        ? "#F57070"
                        : "#6F84F8",
                }}
              >
                {visit?.duration
                  ? (() => {
                    const [start, end] = visit.duration.split(" - ");
                    return `${new Date(start.trim()).toLocaleDateString("en-US")} - ${new Date(end.trim()).toLocaleDateString("en-US")}`;
                  })()
                  : "No Date"}
              </p> */}
            <span style={{ marginLeft: "auto" }}>
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

          {/* HCM and DOS Row */}

          <div style={{ display: "flex" }}>
            <div
              className="flex flex-col gap-3"
              style={{ marginBottom: "10px" }}
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
                  {visit.dos.split("T")[0]}
                </p>
              </div>
              <div style={{ display: "flex" }}>
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
            </div>

            {/* Visit Details */}
            <div style={{ marginLeft: "3rem", width: "55vw" }}>
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
                      <Button onClick={() => handleDetailsClick(visit.details)}>
                        View More
                      </Button>
                    </>
                  ) : (
                    visit.details || "No details provided."
                  )}
                </div>
              </p>
            </div>
          </div>
          {/* Signature and Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div className="flex gap-10 mt-5">
              {!visit.approved && !visit.rejected && (
                <div className="flex gap-4">
                  <button
                    style={{
                      backgroundColor: "#F57070",
                      color: "white",
                      padding: "10px 30px",
                      borderRadius: "2rem",
                      border: "2px solid #F57070",
                      transition: "background-color 0.3s ease, color 0.3s ease",
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
                      transition: "background-color 0.3s ease, color 0.3s ease",
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
                <IconButton onClick={() => handleEditClick(index)}>
                  <EditIcon style={{ color: "#6F84F8" }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(index)}>
                  <DeleteIcon style={{ color: "#F57070" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default VisitCard;
