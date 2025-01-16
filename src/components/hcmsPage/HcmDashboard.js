import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HcmProfileCard from "./HcmProfileCard";
import TenantsAssigned from "./TenantsAssigned";
import AppoinmentVisits from "./AppoinmentVisits";
import CommunicationsCard from "./CommunicationsCard";
import AssignTenantsPopup from "./AssignTenantsPopup";

const HcmDashboard = () => {
  const location = useLocation();
  const { hcms, hcmId } = location.state || {};
  const [openAssignTenantModal, setOpenAssignTenantModal] = useState(false);
  const [shouldRefreshAssignedTenants, setShouldRefreshAssignedTenants] =
    useState(false);
  // Find the selected HCM

  // console.log(hcms, hcms);
  // Handle missing data
  if (!hcms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-bold text-gray-700">
          HCM not found. Please go back and select a valid HCM.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col m-3 gap-5">
      <div className="flex justify-between gap-4">
        {/* Profile Card for the selected HCM */}
        <HcmProfileCard hcm={hcms} />

        {/* Tenants Assigned Component */}
        <TenantsAssigned
          hcmId={hcmId}
          setOpenAssignTenantModal={setOpenAssignTenantModal}
          shouldRefreshAssignedTenants={shouldRefreshAssignedTenants}
        />
      </div>
      <div className="flex gap-5">
        {/* Appointments and Communications */}
        <AppoinmentVisits hcmId={hcmId} />
        <CommunicationsCard />
      </div>

      {openAssignTenantModal && (
        <AssignTenantsPopup
          hcm={hcms}
          setShouldRefreshAssignedTenants={setShouldRefreshAssignedTenants}
          open={openAssignTenantModal}
          onClose={() => setOpenAssignTenantModal(false)}
        />
      )}
    </div>
  );
};

export default HcmDashboard;
