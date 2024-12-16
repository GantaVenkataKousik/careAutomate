import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VisitModal from "./VisitModal"; // Ensure VisitModal is correctly implemented and imported
import axios from "axios";
import VisitCard from "./VisitCard";
import VisitCalendarView from "./VisitCalendarView";
import VisitHeader from "./VisitHeader";

const VisitList = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const [detailsPopup, setDetailsPopup] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openNewVisitPopup, setOpenNewVisitPopup] = useState(false);
  const [visitData, setVisitData] = useState([]);
  const [isListView, setIsListView] = useState(true);
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
        // Sorting the visits by the createdAt date (most recent first)
        const sortedVisits = response.data.visits.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Mapping the sorted visits
        const mappedVisits = sortedVisits.map((visit) => ({
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

  // // Fetch tenants for filter options
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

  // // Fetch HCMs for filter options
  // useEffect(() => {
  //   const fetchHcm = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.error("Authorization token is missing.");
  //         return;
  //       }

  //       const response = await fetch(
  //         "https://careautomate-backend.vercel.app/hcm/all",
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
  //         const hcmData = data.hcms.map((hcm) => ({
  //           id: hcm._id,
  //           name: hcm.name,
  //         }));
  //         setHcmList(hcmData);
  //       } else {
  //         console.error("Failed to fetch HCMs:", data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching HCMs:", error);
  //     }
  //   };

  //   fetchHcm();
  // }, []);

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

      <VisitHeader
        isListView={isListView}
        filters={filters}
        hcmList={hcmList}
        allTenants={allTenants}
        setIsListView={setIsListView}
        setOpenNewVisitPopup={setOpenNewVisitPopup}
        handleInputChange={handleInputChange}
        applyFilters={applyFilters}
        visitCount={visitData.length} // Pass visit count here
      />
      {/* <-------Visit List--------> */}

      {visitData.length === 0 && (
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-2xl">No visits found</h1>
        </div>
      )}

      {/* Visit List */}
      {!isListView ? (
        <VisitCalendarView visits={visitData} />
      ) : (
        <VisitCard
          visitData={visitData}
          handleDeleteClick={handleDeleteClick}
          handleClosePopup={handleClosePopup}
          handleDetailsClick={handleDetailsClick}
          handleEditClick={handleEditClick}
          handleStatusUpdate={handleStatusUpdate}
        />
      )}

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
