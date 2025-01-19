import React, { useState } from "react";
import HcmImage from "../../images/tenant.jpg";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const RenderPlanData = ({ planType, data, styles }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHcm, setSelectedHcm] = useState(null);

  console.log('RenderPlanData received data:', data);

  const handleHcmClick = (hcm) => {
    console.log('HCM clicked:', hcm);
    setSelectedHcm(hcm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHcm(null);
  };

  if (!data || !data.assignedHCMs || data.assignedHCMs.length === 0) {
    return (
      <p style={styles.noServiceData}>
        No HCM is Assigned
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
        <div style={styles.HcmGrid}>
          {data.assignedHCMs.map((hcm, index) => (
            <div key={hcm.hcmId || index} style={styles.HcmCard} className="width-500px">
              <div style={styles.HcmCardUpperContainer}>
                <div style={styles.HcmDetails}>
                  <h3
                    style={styles.HcmNameUI}
                    onClick={() => handleHcmClick(hcm)}
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
              <div className="serviceDetails">

              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="HCM Service Details"
          style={modalStyles}
        >
          <h2 className=" font-bold mb-4">{selectedHcm?.hcmName}  Service Details</h2>
          {selectedHcm?.serviceDetails?.length > 0 ? (
            <table style={{ fontSize: '1em', borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date of Service</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Scheduled Units</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Worked Units</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Method of Contact</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Place of Service</th>
                </tr>
              </thead>
              <tbody>
                {selectedHcm.serviceDetails.map((detail, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(detail.dateOfService).toLocaleDateString()}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.scheduledUnits}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.workedUnits}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.methodOfContact}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.placeOfService}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No service details available.</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    textAlign: "center",
  },
};

export default RenderPlanData;
