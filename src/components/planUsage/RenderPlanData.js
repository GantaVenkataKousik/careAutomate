import React from "react";
import HcmImage from "../../images/tenant.jpg";
import { useNavigate } from "react-router-dom";

const RenderPlanData = ({ planType, data, styles }) => {
  const navigate = useNavigate();
  const handleHcmClick = (hcmId, hcm) => {
    console.log(hcmId, hcm.hcmInfo);
    navigate("/hcms/hcmProfile", {
      state: { hcms: hcm.hcmInfo, hcmId: hcmId },
    });
  };
  if (!data) {
    return (
      <p style={styles.noServiceData}>
        No services have been done for this tenant.
      </p>
    );
  }

  return (
    <div>
      <div id={`${planType}Grid`} style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Units</h3>
          <p className="text-xl">
            Units:{" "}
            <span style={styles.valueGreen}>
              {Number(data.totalUnits.toFixed(2))}
            </span>
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Worked</h3>
          <p className="text-xl">
            Units{" "}
            <span style={styles.valueGreen}>
              {Number(data.workedUnits.toFixed(2))}
            </span>
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Remaining</h3>
          <p className="text-xl">
            Units{" "}
            <span style={styles.valueYellow}>
              {Number(data.unitsRemaining.toFixed(2))}
            </span>
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Scheduled</h3>
          <p className="text-xl"  >
            Units{" "}
            <span style={styles.valueOrange}>
              {Number(data.scheduledUnits.toFixed(2))}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="flex items-center justify-center text-[#6F84F8] text-xl font-bold">
          Assigned HCM's
        </h2>
        {data.hcmDetails && data.hcmDetails.length > 0 ? (
          <div style={styles.HcmGrid}>
            {data.hcmDetails.map((hcm, index) => (
              <div key={hcm.hcmId || index} style={styles.HcmCard}>
                <div style={styles.HcmCardUpperContainer}>
                  <div style={styles.HcmDetails}>
                    <h3
                      style={styles.HcmNameUI}
                      onClick={() => handleHcmClick(hcm.hcmId, hcm)}
                    >
                      {`${hcm.hcmInfo?.personalInfo?.firstName} ${hcm.hcmInfo?.personalInfo?.lastName}`}
                    </h3>
                    <p style={styles.HcmSubNameUI}>
                      {hcm.hcmInfo?.contactInfo?.phoneNumber}
                    </p>
                    <p style={styles.HcmSubNameUI}>
                      {hcm.hcmInfo?.contactInfo?.email}
                    </p>
                  </div>
                  <div>
                    <img src={HcmImage} alt="Hcm" style={styles.HcmImg} />
                  </div>
                </div>
                <div style={styles.HcmWorkInfo}>
                  <p style={styles.valueGreen}>
                    <span className="font-bold text-gray-600 mr-1">
                      Worked Hours:
                    </span>{" "}
                    {Number(hcm.workedHours.toFixed(2))} hrs
                  </p>
                  <p style={styles.valueOrange}>
                    <span className="font-bold text-gray-600 mr-1">
                      Worked Units:
                    </span>{" "}
                    {Number(hcm.workedUnits.toFixed(3))} units
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No HCM is Assigned</p>
        )}
      </div>
    </div>
  );
};

export default RenderPlanData;
