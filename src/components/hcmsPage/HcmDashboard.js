import React from "react";
import { useLocation } from "react-router-dom";
import HcmProfileCard from "./HcmProfileCard";
import TenantsAssigned from "./TenantsAssigned";

const HcmDashboard = () => {
  const location = useLocation();
  const { hcms, hcmId } = location.state || {};

  const selectedHcm = hcms?.find((hcm) => hcm._id === hcmId);

  if (!selectedHcm) {
    return <div>HCM not found.</div>;
  }

  return (
    <div className="flex m-2 justify-between gap-4">
      <HcmProfileCard hcm={selectedHcm} />
      <TenantsAssigned />
    </div>
  );
};

export default HcmDashboard;
