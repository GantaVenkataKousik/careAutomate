import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubStep1 from "./SubStep1";
import Substep12 from "./Substep12";
import Substep22 from "./Substep22";
import ChecklistTenants from "./DragDropTenants";
import LoginInfo from "./LoginInfo";
import ScheduleAppointment from "./ScheduleAppointment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  createdHcm,
  createdHcmName,
  resetHcmInfo,
} from "../../redux/hcm/hcmSlice";
import { BASE_URL } from "../../config";

const steps = [
  {
    name: "Personal Info",
    subSteps: [SubStep1],
  },
  {
    name: "Login Info",
    subSteps: [LoginInfo],
  },
  {
    name: "Assign Tenants",
    subSteps: [ChecklistTenants],
  },
  {
    name: "Documentation",
    subSteps: [Substep12, Substep22],
  },
  {
    name: "Schedule",
    subSteps: [ScheduleAppointment],
  },
];

const PopupPage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [tenantID, setTenantID] = useState(null); // Store tenant ID here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hcmData = useSelector((state) => state.hcm);
  const assignedTenants = useSelector((state) => state.hcm.assignedTenants); // Access Redux state
  const hcmId = useSelector((state) => state.hcm.hcmId);
  const hcmName = useSelector((state) => state.hcm.hcmName);

  const togglePopup = () => {
    navigate("/hcms");
    dispatch(resetHcmInfo());
    setShowPopup(!showPopup);
  };

  const assignTenant = async (hcmId) => {
    console.log("Assigned Tenants in step2:", assignedTenants);
    console.log("hcmid", hcmId);
    const token = localStorage.getItem("token");
    const data = {
      hcmId: hcmId,
      tenantIds: assignedTenants.ids,
    };
    console.log("data", data);
    try {
      const response = await axios.post(
        `${BASE_URL}/hcm/assign-tenants-to-hcm`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Assigned tenants saved successfully");
      } else {
        console.error("Failed to save assigned tenants:", response.statusText);
        toast.error("Failed to save assigned tenants.");
      }
    } catch (error) {
      console.error("Error during API call to save assigned tenants:", error);
      toast.error("Error saving assigned tenants. Please try again.");
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (const [key, value] of Object.entries(hcmData)) {
      if (
        key === "hcmId" ||
        key === "assignedTenants" ||
        key === "hcmName" ||
        key === "tenantName" ||
        key === "tenantId" ||
        key === "confirmPassword"
      ) {
        continue;
      }
      formData.append(key, value);
    }

    try {
      const response = await axios.post(`${BASE_URL}/hcm/createhcm`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.hcmID) {
        const id = response.data.hcmID;
        dispatch(createdHcm(id));
        dispatch(
          createdHcmName(
            `${response.data.hcmData.firstName} ${response.data.hcmData.lastName}`
          )
        );
        toast.success("HCM is successfully created");
        return id; // Return the hcmId for use in the next step
      } else {
        console.error("HCM ID not found in the response");
      }
    } catch (error) {
      console.error("Error during API call to create HCM:", error);
      toast.error("Error saving HCM data. Please try again.");
    }
  };
  const handleNext = async () => {
    if (currentStep === 3) {
      try {
        const hcmId = await handleSave();

        await assignTenant(hcmId);
      } catch (error) {
        console.error("Error during step 2 processing:", error);
        toast.error("An error occurred. Please try again.");
        return;
      }
    }

    // Move to the next step
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setComplete(true);
    }
  };

  const renderSubStep = () => {
    const SubStepComponent = steps[currentStep].subSteps[0];
    if (SubStepComponent) {
      console.log(
        `Rendering step ${currentStep + 1}, passing tenantID: ${hcmId}`
      );
      return <SubStepComponent hcmID={hcmId} />;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {complete ? (
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl mb-4 text-green-500">Process Completed!</h2>
          <p className="text-gray-700">
            You have successfully completed the process.
          </p>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={togglePopup}
          >
            Close
          </button>
        </div>
      ) : (
        <Modal open={showPopup} onClose={togglePopup}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "66%",
              height: "90%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              overflow: "auto",
            }}
          >
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 mx-4 -mt-2">
                New HCM
              </label>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="h-2 bg-indigo-500 rounded-full"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              {steps.map((step, i) => {
                const isActive = i === currentStep;
                return (
                  <React.Fragment key={i}>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full border-2 text-white flex items-center justify-center mx-auto">
                        {i < currentStep || (i === currentStep && complete) ? (
                          <i
                            className="fa-solid fa-circle-check fa-xl"
                            style={{ color: "#11ff00" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-circle fa-xl"
                            style={{
                              color: "#d3d3d3", // Light grey for the outer circle
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: "#808080", // Darker grey for the inner circle
                              }}
                            ></span>
                          </i>
                        )}
                      </div>
                      <div>
                        <span
                          className={`text-sm ${isActive ? "text-blue-500" : "text-black"}`}
                        >
                          STEP {i + 1}
                        </span>
                      </div>
                      <span
                        className={`${
                          i < currentStep
                            ? "text-green-500"
                            : isActive && complete
                              ? "text-green-500"
                              : "text-black"
                        } text-sm`}
                      >
                        {step.name}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 mx-2 -mt-10">
                        <div className="w-full h-2 bg-gray-300 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              i < currentStep ? "bg-indigo-500" : "bg-gray-300"
                            }`}
                            style={{
                              width: `${i === currentStep ? 100 : i < currentStep ? 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-center mb-6">
                {steps[currentStep].name}
              </h2>
              {renderSubStep()}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="flex items-center px-4 py-2 bg-[#6F84F8] text-white rounded hover:bg-[#6F84F8]"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="fill-current"
                >
                  <polygon points="10,0 0,10 10,20" />
                </svg>
                <span className="ml-1">Back</span>
              </button>

              <button
                className="flex items-center px-4 py-2 bg-[#6F84F8] text-white rounded hover:bg-[#6F84F8]"
                onClick={handleNext}
              >
                <span className="flex items-center">
                  <span>
                    {currentStep === steps.length - 1 ? "Finish" : "Next Step"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="ml-2 fill-current"
                  >
                    <polygon points="0,0 10,10 0,20" />
                  </svg>
                </span>
              </button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default PopupPage;
