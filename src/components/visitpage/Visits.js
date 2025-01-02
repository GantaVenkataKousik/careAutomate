import React, { useState, useEffect } from "react";
import VisitModal from "./VisitModal"; // Ensure VisitModal is correctly implemented and imported
import axios from "axios";
// import VisitCard from "./VisitCard";
import VisitCalendarView from "./VisitCalendarView";
import VisitHeader from "./VisitHeader";
import { visitsFilter } from "../../utils/visitsFilter";
import { useDispatch } from "react-redux";
import { setSelectedVisit } from "../../redux/visit/visitSlice";
import { BASE_URL } from "../../config";
import VisitCard2 from "./VisitCard2";
import VisitDetailsPopup from "./VisitDetailsPopup";

const VisitList = () => {
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
  const [isEdit, setIsEdit] = useState(false);
  const [filters, setFilters] = useState({
    tenantId: "",
    hcmId: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const fetchVisits = async () => {
    let url = `${BASE_URL}/visit/fetchVisits`;
    let token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.response);
      if (response.data.response) {
        // Sorting the visits by the createdAt date (most recent first)
        // console.log("raw", response.data.visits);
        // Mapping the sorted visits
        console.log(response);
        const mappedVisits = response.data.response.map((visit) => ({
          _id: visit._id,
          title: visit.activity,
          startDate: visit.dateOfService || visit.date,
          endDate: visit.dateOfService || visit.date,
          typeMethod: visit.methodOfVisit,
          hcm: visit.hcmId?.name || "N/A",
          hcmId: visit.hcmId?._id || "N/A",
          scheduledDate: visit.scheduledDate ?? "",
          dos: visit.dateOfService || visit.date,
          duration: `${visit.startTime} - ${visit.endTime}`,
          details: visit.detailsOfVisit || visit.notes,
          signature: visit.signature,
          status: visit.status,
          serviceType: visit.serviceType,
          placeOfService: visit.placeOfService || visit.place,
          approved: visit.approved,
          rejected: visit.rejected,
          totalMile: visit.totalMiles,
          createdAt: visit.createdAt,
          tenantName: visit.tenantId?.name,
          tenantId: visit.tenantId?._id,
          travel: visit.travel,
          travelWithTenant: visit.travelWithTenant,
          travelWithoutTenant: visit.travelWithoutTenant,
          response: visit.response ?? "",
        }));
        const sortedVisits = mappedVisits.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setVisitData(sortedVisits);
        // console.log(sortedVisits);
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
        `${BASE_URL}/visit/filterVisits`,
        filters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.response) {
        const mappedVisits = response.data.response.map((visit) => ({
          _id: visit._id,
          title: visit.activity,
          startDate: visit.dateOfService || visit.date,
          endDate: visit.dateOfService || visit.date,
          typeMethod: visit.methodOfVisit,
          hcm: visit.hcmId?.name || "N/A",
          hcmId: visit.hcmId?._id || "N/A",
          scheduledDate: visit.scheduledDate ?? "",
          dos: visit.dateOfService || visit.date,
          duration: `${visit.startTime} - ${visit.endTime}`,
          details: visit.notes,
          signature: visit.signature,
          status: visit.status,
          serviceType: visit.serviceType,
          placeOfService: visit.placeOfService || visit.place,
          approved: visit.approved,
          rejected: visit.rejected,
          totalMile: visit.totalMiles,
          createdAt: visit.createdAt,
          tenantName: visit.tenantId?.name,
          tenantId: visit.tenantId?._id,
          travel: visit.travel,
          travelWithTenant: visit.travelWithTenant,
          travelWithoutTenant: visit.travelWithoutTenant,
          response: visit.response ?? "",
        }));
        // console.log(mappedVisits);
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

  const dispatch = useDispatch();

  const handleEditClick = (index, id, visit) => {
    // dispatch(setSelectedVisit(visit));
    setEditVisitData(visit);
    setIsEdit(true);
    setOpenNewVisitPopup(true);
  };

  const handleFilterIconClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusUpdate = async (index, isApproved) => {
    const visitId = visitData[index]._id;
    const url = `${BASE_URL}/visit/${visitId}`;
    const response = await axios.put(
      url,
      { status: isApproved ? "approved" : "rejected" },
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

  // const handleDeleteClick = async (index) => {
  //   // Code for deleting visits
  // };

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
        <VisitCard2
          visitData={visitData}
          // handleDeleteClick={handleDeleteClick}
          handleClosePopup={handleClosePopup}
          handleDetailsClick={handleDetailsClick}
          handleEditClick={handleEditClick}
          handleStatusUpdate={handleStatusUpdate}
        />
      )}

      <VisitDetailsPopup
        openPopup={openPopup}
        handleClosePopup={handleClosePopup}
        detailsPopup={detailsPopup}
      />

      {/* Visit Modal */}
      <VisitModal
        isOpen={openNewVisitPopup}
        onClose={() => setOpenNewVisitPopup(false)}
        onVisitCreated={editVisitData}
        isEdit={isEdit}
      />
    </div>
  );
};

export default VisitList;
