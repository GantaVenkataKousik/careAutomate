import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Menu,
  MenuItem,
  Select,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisitModal from "./VisitModal"; // Ensure VisitModal is correctly implemented and imported
import axios from "axios";
import { GrLocation } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";

const VisitList = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const [detailsPopup, setDetailsPopup] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openNewVisitPopup, setOpenNewVisitPopup] = useState(false);
  const [visitData, setVisitData] = useState([]);

  const [editVisitIndex, setEditVisitIndex] = useState(null);
  const [editVisitData, setEditVisitData] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [allTenants, setAllTenants] = useState([]);
  const [hcmList, setHcmList] = useState([]);
  const [filters, setFilters] = useState({
    tenantId: "",
    hcmId: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const fetchVisits = async () => {
    let url = "https://careautomate-backend.vercel.app/visit/fetchVisits";
    let token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.visits) {
        const mappedVisits = response.data.visits.map((visit) => ({
          _id: visit._id,
          title: visit.title,
          startDate: visit.dateOfService,
          endDate: visit.dateOfService,
          typeMethod: visit.methodOfVisit,
          hcm: visit.hcmId?.name || "N/A",
          scheduledDate: visit.scheduledDate,
          dos: visit.dateOfService,
          duration: `${visit.startTime} - ${visit.endTime}`,
          details: visit.detailsOfVisit,
          signature: visit.signature,
          status: visit.status,
          serviceType: visit.serviceType,
          placeOfService: visit.placeOfService,
          approved: visit.approved,
          rejected: visit.rejected,
        }));
        setVisitData(mappedVisits);
      } else {
        console.error("Failed to fetch visit data");
      }
    } catch (error) {
      console.error("Error fetching visit data:", error);
    }
  };
  // Fetch all visits initially
  useEffect(() => {
    fetchVisits();
  }, []);

  // Handle filter changes
  const handleInputChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const applyFilters = async () => {
    console.log("Applying filters with the following criteria:", filters);
    try {
      const response = await axios.post(
        "https://careautomate-backend.vercel.app/visit/filterVisits",
        filters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.visits) {
        const mappedVisits = response.data.visits.map((visit) => ({
          _id: visit._id,
          title: visit.title,
          startDate: visit.dateOfService,
          endDate: visit.dateOfService,
          typeMethod: visit.methodOfVisit,
          hcm: visit.hcmId?.name || "N/A",
          scheduledDate: visit.scheduledDate,
          dos: visit.dateOfService,
          duration: `${visit.startTime} - ${visit.endTime}`,
          details: visit.detailsOfVisit,
          signature: visit.signature,
          status: visit.status,
          serviceType: visit.serviceType,
          placeOfService: visit.placeOfService,
          approved: visit.approved,
          rejected: visit.rejected,
        }));
        setVisitData(mappedVisits); // Update the visit data with filtered results
      } else {
        console.error("Failed to fetch visit data");
        setVisitData([]); // Clear the visit data if no results are found
      }
    } catch (error) {
      console.error("Error fetching data:", error.response || error);
    }
  };

  const handleDetailsClick = (details) => {
    setDetailsPopup(details);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleEditClick = (index) => {
    setEditVisitIndex(index);
    setEditVisitData(visitData[index]);
    setOpenNewVisitPopup(true);
  };

  const handleFilterIconClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Fetch tenants for filter options
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

  // Fetch HCMs for filter options
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

  const handleStatusUpdate = async (index, isApproved) => {
    const visitId = visitData[index]._id;
    const url = `https://careautomate-backend.vercel.app/visit/${visitId}`;
    const response = await axios.put(
      url,
      { approved: isApproved, rejected: !isApproved },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response) {
      fetchVisits();
    } else {
      console.error("Failed to update visit status:", response.data.message);
    }

    // Code for updating status
  };

  const handleDeleteClick = async (index) => {
    // Code for deleting visits
  };

  return (
    <div style={{ margin: "2rem", fontFamily: "Poppins" }}>
      {/* Header Section */}
      <div className="">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold mb-0">Visits</h1>
          <div className="flex items-center justify-center gap-2">
            <Button
              style={{
                marginRight: "10px",
                borderRadius: "20px",
                fontFamily: "Poppins",
                background: "none",
                color: "#505254",
                border: "2px solid #6F84F8",
                padding: "5px 30px",
                fontSize: "1rem",
              }}
              onClick={{}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#6F84F8";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#505254";
              }}
            >
              Export{" "}
            </Button>
            <Button
              style={{
                marginRight: "10px",
                borderRadius: "20px",
                fontFamily: "Poppins",
                background: "none",
                color: "#505254",
                border: "2px solid #6F84F8",
                padding: "5px 30px",
                fontSize: "1rem",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
              onClick={() => setOpenNewVisitPopup(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#6F84F8";
                e.currentTarget.style.color = "white";

                const icon = e.currentTarget.querySelector("svg");
                if (icon) icon.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#505254";

                const icon = e.currentTarget.querySelector("svg");
                if (icon) icon.style.color = "#6F84F8";
              }}
            >
              <FaPlus
                style={{
                  marginRight: "0.5rem",
                  color: "#6F84F8",
                  transition: "color 0.3s ease",
                }}
              />
              New Visit
            </Button>
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "end", marginBottom: "1rem" }}
        >
          {/* Filter Section */}

          {/* Date Filters */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 style={{ color: "#505254", marginBottom: "0.5rem" }}>
              Start Date
            </h2>
            <TextField
              type="date"
              value={filters.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              InputProps={{
                style: {
                  fontFamily: "Poppins",
                  height: "40px",
                  border: "1px solid #6F84F8",
                  borderRadius: "30px",
                  padding: "5px 10px",
                  fontSize: "15px",
                  marginRight: "1rem",
                },
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 style={{ color: "#505254", marginBottom: "0.5rem" }}>
              End Date
            </h2>
            <TextField
              type="date"
              value={filters.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              InputProps={{
                style: {
                  fontFamily: "Poppins",
                  height: "40px",
                  border: "1px solid #6F84F8",
                  borderRadius: "30px",
                  padding: "5px 10px",
                  fontSize: "15px",
                  marginRight: "1rem",
                },
              }}
            />
          </div>

          {/* HCM Dropdown */}
          <Select
            value={filters.hcmId}
            onChange={(e) => handleInputChange("hcmId", e.target.value)}
            displayEmpty
            sx={{
              width: "200px",
              fontFamily: "Poppins",
              height: "40px",
              border: "1px solid #6F84F8",
              borderRadius: "30px",
              padding: "5px 10px",
              fontSize: "15px",
              marginRight: "1rem",
            }}
          >
            <MenuItem value="" sx={{ fontFamily: "Poppins" }}>
              Select HCM
            </MenuItem>
            {hcmList.map((hcm) => (
              <MenuItem
                key={hcm.id}
                value={hcm.id}
                sx={{ fontFamily: "Poppins" }}
              >
                {hcm.name}
              </MenuItem>
            ))}
          </Select>

          {/* Tenant Dropdown */}
          <Select
            value={filters.tenantId}
            onChange={(e) => handleInputChange("tenantId", e.target.value)}
            displayEmpty
            sx={{
              width: "200px",
              fontFamily: "Poppins",
              height: "40px",
              border: "1px solid #6F84F8",
              borderRadius: "30px",
              padding: "5px 10px",
              fontSize: "15px",
              marginRight: "1rem",
            }}
          >
            <MenuItem value="" sx={{ fontFamily: "Poppins" }}>
              Select Tenant
            </MenuItem>
            {allTenants.map((tenant) => (
              <MenuItem
                key={tenant.id}
                value={tenant.id}
                sx={{ fontFamily: "Poppins" }}
              >
                {tenant.name}
              </MenuItem>
            ))}
          </Select>

          {/* Status Dropdown */}
          <Select
            value={filters.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            displayEmpty
            sx={{
              width: "200px",
              fontFamily: "Poppins",
              height: "40px",
              border: "1px solid #6F84F8",
              borderRadius: "30px",
              padding: "5px 10px",
              fontSize: "15px",
              marginRight: "1rem",
            }}
          >
            <MenuItem value="" sx={{ fontFamily: "Poppins" }}>
              All Statuses
            </MenuItem>
            <MenuItem value="Pending" sx={{ fontFamily: "Poppins" }}>
              Pending
            </MenuItem>
            <MenuItem value="Approved" sx={{ fontFamily: "Poppins" }}>
              Approved
            </MenuItem>
            <MenuItem value="Rejected" sx={{ fontFamily: "Poppins" }}>
              Rejected
            </MenuItem>
          </Select>

          {/* Apply Button */}
          <button
            className="cursor-pointer transition-all bg-[#6F84F8] text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            // style={{
            //   backgroundColor: "#6F84F8",
            //   fontFamily: "Poppins",
            //   fontWeight: "bold",
            // }}
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>{" "}
      </div>

      {/* <-------Visit List--------> */}

      {visitData.length === 0 && (
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-2xl">No visits found</h1>
        </div>
      )}

      {/* Visit List */}
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
                {visit?.duration
                  ? (() => {
                      const [start, end] = visit.duration.split(" - ");
                      return `${new Date(start.trim()).toLocaleDateString("en-US")} - ${new Date(end.trim()).toLocaleDateString("en-US")}`;
                    })()
                  : "No Date"}
              </p>
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

      {/* Popup for Details */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Visit Details</DialogTitle>
        <DialogContent>
          <p>{detailsPopup}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Visit Modal */}
      <VisitModal
        isOpen={openNewVisitPopup}
        onClose={() => setOpenNewVisitPopup(false)}
        onVisitCreated={fetchVisits}
      />
    </div>
  );
};

export default VisitList;
