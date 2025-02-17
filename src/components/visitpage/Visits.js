import React, { useState, useEffect, useMemo } from "react";
import VisitModal from "./VisitModal"; // Ensure VisitModal is correctly implemented and imported
import axios from "axios";
import VisitCalendarView from "./VisitCalendarView";
import VisitHeader from "./VisitHeader";
import { BASE_URL } from "../../config";
import VisitCard from "./VisitCard";
import VisitDetailsPopup from "./VisitDetailsPopup";
import VisitFilter from "./VisitFilter";
import { applyVisitsFilters } from "../../utils/visitsUtils/VisitsListFilterUtils/VisitFetchFilter";
import { toast } from "react-toastify";

const VisitList = () => {
  const [detailsPopup, setDetailsPopup] = useState("");
  const [detailTitle, setDetailTitle] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");
  const [openPopup, setOpenPopup] = useState(false);
  const [openNewVisitPopup, setOpenNewVisitPopup] = useState(false);
  const [visitData, setVisitData] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const [editVisitData, setEditVisitData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    tenant: [],
    hcm: [],
    status: [],
    startDate: null,
    endDate: null,
  });
  const [shouldRefreshVisit, setShouldRefreshVisit] = useState(false);

  const fetchVisits = async () => {
    let url = `${BASE_URL}/visit/fetchVisits`;
    let token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.response) {
        // Sorting the visits by the createdAt date (most recent first)
        // console.log("raw", response.data.response);
        // Mapping the sorted visits
        // console.log(response);
        const mappedVisits = response.data.response.map((visit) => ({
          _id: visit._id,
          title: visit.activity,
          startDate: visit.dateOfService || visit.date,
          endDate: visit.dateOfService || visit.date,
          startTime: visit.startTime,
          endTime: visit.endTime,
          typeMethod: visit.methodOfContact,
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
          totalMile: visit.totalMiles,
          createdAt: visit.createdAt,
          tenantName: visit.tenantId?.name,
          tenantId: visit.tenantId?._id,
          travel: visit.travel,
          travelWithTenant: visit.travelWithTenant,
          travelWithoutTenant: visit.travelWithoutTenant,
          response: visit.response ?? "",
          reasonForRemote: visit.reasonForRemote,
        }));
        // console.log("mapped", mappedVisits);
        const sortedVisits = mappedVisits.sort((a, b) => {
          return new Date(b.startDate) - new Date(a.startDate);
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
  }, [shouldRefreshVisit]);

  const handleDetailsClick = (details, title) => {
    setDetailsPopup(details);
    setDetailTitle(title);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const handleFilterUpdate = (newFilters) => {
    setActiveFilters(newFilters);
  };
  const filteredVisits = useMemo(() => {
    // Filter visits based on the activeTab and any other filters
    const tabFilteredVisits = visitData.filter((visit) => {
      if (activeTab === "Approved") return visit.status === "approved";
      if (activeTab === "Rejected") return visit.status === "rejected";
      if (activeTab === "Pending") return visit.status === "pending";
      return true; // Default, show all if no matching tab
    });

    // Apply additional filters (like tenant, HCM, etc.)
    return applyVisitsFilters(tabFilteredVisits, activeFilters);
  }, [visitData, activeFilters, activeTab]);

  const handleEditClick = (index, id, visit) => {
    // dispatch(setSelectedVisit(visit));
    setEditVisitData(visit);
    setIsEdit(true);
    setOpenNewVisitPopup(true);
  };

  const handleStatusUpdate = async (index, status) => {
    const visitId = index;
    const url = `${BASE_URL}/visit/${visitId}`;
    const response = await axios.put(
      url,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response);
    if (response) {
      toast.success(
        `Visit is successfully ${status === "pending" ? "Withdraw" : status}`
      );
      fetchVisits();
    } else {
      console.error("Failed to update visit status:", response.data.message);
    }

    // Code for updating status
  };

  return (
    <div style={{ margin: "2rem", fontFamily: "Poppins" }}>
      {/* Header Section */}

      <VisitHeader
        isListView={isListView}
        setIsListView={setIsListView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setOpenNewVisitPopup={setOpenNewVisitPopup}
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
        <VisitCalendarView visits={filteredVisits} />
      ) : (
        <div className="flex gap-8 w-full pt-6 h-[calc(100vh-180px)] overflow-hidden">
          <div className="flex-grow overflow-y-auto px-4 tenant-visits-scrollbar">
            <VisitCard
              // visitData={visitData}
              visitData={
                filteredVisits.length > 0 || activeFilters.status.length > 0
                  ? filteredVisits
                  : visitData
              }
              handleClosePopup={handleClosePopup}
              handleDetailsClick={handleDetailsClick}
              handleEditClick={handleEditClick}
              handleStatusUpdate={handleStatusUpdate}
            />
          </div>
          <div className="w-[280px] flex-shrink-0 border border-[#6F84F8] rounded-[20px] p-[10px] h-full overflow-y-auto tenant-visits-scrollbar">
            <VisitFilter onFilterUpdate={handleFilterUpdate} />
          </div>
        </div>
      )}

      <VisitDetailsPopup
        openPopup={openPopup}
        handleClosePopup={handleClosePopup}
        detailsPopup={detailsPopup}
        title={detailTitle}
      />

      {/* Visit Modal */}
      <VisitModal
        isOpen={openNewVisitPopup}
        onClose={() => setOpenNewVisitPopup(false)}
        editVisitData={editVisitData}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setShouldRefreshVisit={setShouldRefreshVisit}
      />
    </div>
  );
};

export default VisitList;
