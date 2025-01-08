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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  createdHcm,
  createdHcmName,
  resetHcmInfo,
} from "../../redux/hcm/hcmSlice";
import { BASE_URL } from "../../config";
import { mapHcmDataToSchema } from "../../utils/hcm/createHcmUtils/hcmCreateFormat";

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
  const [assignTenantLater, setAssignTenantLater] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hcmData = useSelector((state) => state.hcm);
  const assignedTenants = useSelector((state) => state.hcm.assignedTenants); // Access Redux state
  const hcmId = useSelector((state) => state.hcm.hcmId);
  const hcmName = useSelector((state) => state.hcm.hcmName);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(true);
  };

  // Function to confirm and close the modal
  const handleConfirmClose = () => {
    setOpen(false);
    togglePopup(); // Proceed with closing
  };

  // Function to cancel the dialog
  const handleCancelClose = () => {
    setOpen(false); // Just close the modal without doing anything
  };
  const togglePopup = () => {
    navigate("/hcms");
    dispatch(resetHcmInfo());
    setShowPopup(!showPopup);
  };

  const handleAssignLater = () => {
    setAssignTenantLater(!assignTenantLater);
    if (!assignTenantLater) {
      setCurrentStep((prev) => prev + 1);
    }
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
    const formattedData = mapHcmDataToSchema(hcmData);
    console.log(formattedData);

    try {
      const response = await axios.post(
        `${BASE_URL}/hcm/createhcm`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.hcmID) {
        const id = response.data.hcmID;
        console.log(response);
        dispatch(createdHcm(id));
        dispatch(
          createdHcmName(
            `${response.data.hcmData.personalInfo.firstName} ${response.data.hcmData.personalInfo.lastName}`
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

        // Only call assignTenant if assignTenantLater is false
        if (!assignTenantLater) {
          await assignTenant(hcmId);
        }
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
      // console.log(
      //   `Rendering step ${currentStep + 1}, passing tenantID: ${hcmId}`
      // );
      return (
        <SubStepComponent
          hcmID={hcmId}
          assignTenantLater={assignTenantLater} // Pass assignTenantLater as a prop
          setAssignTenantLater={setAssignTenantLater} // Allow ChecklistTenants to update this state if needed
        />
      );
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
        <Modal open={showPopup} onClose={() => {}}>
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
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg text-gray-700">New HCM</h2>
                {/* "X" Close Button */}
                <button
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              {/* Material UI Dialog Confirmation */}
              <Dialog open={open} onClose={handleCancelClose}>
                <DialogTitle>Confirm Close</DialogTitle>
                <DialogContent>
                  <p>
                    All existing HCM data will be lost. Are you sure you want to
                    close?
                  </p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCancelClose} color="primary">
                    No
                  </Button>
                  <Button onClick={handleConfirmClose} color="secondary">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
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
              <div className="flex items-center justify-between mb-6">
                {/* Step Name in the Center */}
                <h2 className="text-xl font-semibold text-center flex-grow">
                  {steps[currentStep].name}
                </h2>

                {/* Conditional Button in the Right Corner */}
                {steps[currentStep].name === "Assign Tenants" && (
                  <button
                    onClick={() => {
                      handleAssignLater();
                    }}
                    className={`px-3 py-2 rounded-lg ${
                      assignTenantLater
                        ? "bg-[#F57070] text-white border-[#F57070] hover:bg-[#F57070]"
                        : "bg-[#6F84F8] text-white border-[#6F84F8] hover:bg-[#4B63D6]"
                    }`}
                  >
                    {assignTenantLater ? "Assign Now" : "Assign Later"}
                  </button>
                )}
              </div>
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
