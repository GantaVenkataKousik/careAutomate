import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubStep1 from "./SubStep1";
import Substep12 from "./Substep12";
import Substep22 from "./Substep22";
import ServiceSelection from "./ServiceSelection";
import ScheduleAppointment from "./ScheduleAppointment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { resetTenantInfo } from "../../redux/tenant/tenantSlice";
import { createdTenant, createdTenantName } from "../../redux/hcm/hcmSlice";
import { BASE_URL } from "../../config";
import ChecklistHCMs from "./AssignHCMs";
import { setServices } from "../../redux/tenant/tenantSlice";
import { current } from "@reduxjs/toolkit";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const steps = [
  {
    name: "Personal Info",
    subSteps: [SubStep1],
  },

  {
    name: "Assign Services",
    subSteps: [ServiceSelection],
  },
  {
    name: "Assign HCMs",
    subSteps: [ChecklistHCMs],
  },
  {
    name: "Documentation",
    subSteps: [Substep12, Substep22],
  },
];

const PopupPage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [tenantID, setTenantID] = useState(null);
  const [tenantName, setTenantName] = useState(null);
  const assignedTenants = useSelector((state) => state.hcm.assignedTenants);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tenantData = useSelector((state) => state.tenant);
  const hcmId = useSelector((state) => state.hcm.hcmId);
  const assignedHCMs = useSelector((state) => state.tenant.assignedHCMs);
  const services = useSelector((state) => state.tenant.services);
  const togglePopup = () => {
    navigate("/tenants");
    dispatch(resetTenantInfo());
    setShowPopup(!showPopup);
  };
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

  const handleNext = async () => {
    const requiredFields = [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "dob", label: "Date of Birth" },
      { key: "gender", label: "Gender" },
      { key: "maPMINumber", label: "Mapmi" },
      { key: "addressLine1", label: "Address Line 1" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "zipCode", label: "Zipcode" },
      { key: "phoneNumber", label: "Phone Number" },
      { key: "email", label: "Email" },
      { key: "insurance", label: "Insurance Type" },
      { key: "insuranceNumber", label: "Insurance Number" },
      { key: "diagnosisCode", label: "Diagnosis Code" },
      // { key: "race", label: "Race" },
      // { key: "ethnicity", label: "Ethnicity" },
    ];
    console.log(tenantData);
    for (let field of requiredFields) {
      if (!tenantData[field.key]) {
        toast.error(`Please fill in the ${field.label}`);
        return;
      }
    }
    // if (currentStep === 0) {
    //   await handleSave();
    // }

    const areAllServicesValid = services.every(
      (service) =>
        service.serviceType !== "" &&
        service.startDate !== "" &&
        service.endDate !== "" &&
        service.units !== "" &&
        service.billRate !== "" &&
        service.isSaved === true
    );

    const areAnyServicesNotSaved = services.some(
      (service) => service.isSaved !== true
    );

    if (services.length === 0 && currentStep === 1) {
      toast.error(`Please select at least one service`);
      return;
    }

    if (areAnyServicesNotSaved && currentStep === 1) {
      toast.error("Please save all services before proceeding.");
      return;
    }

    if (!areAllServicesValid && currentStep === 1) {
      toast.error("Please fill in all required fields for each service.");
      return;
    }

    if (currentStep === steps.length - 1) {
      const confirmProceed = window.confirm(
        "Are you sure you want to proceed to create the tenant?"
      );
      if (!confirmProceed) {
        return; // Stop if user cancels
      }
    }

    if (currentStep === steps.length - 2 && assignedHCMs.ids.length === 0) {
      toast.error("Please select atleast one HCM.");
      return;
    }

    const assignHCMToTenant = async (tenantID) => {
      const token = localStorage.getItem("token");
      // console.log("Assigned HCMs", assignedTenants);
      const data = {
        tenantId: tenantID,
        hcmIds: assignedHCMs.ids,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/tenant/assign-hcms-to-tenant/`,
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
          console.error(
            "Failed to save assigned tenants:",
            response.statusText
          );
          toast.error("Failed to save assigned tenants.");
        }
      } catch (error) {
        console.error("Error during API call to save assigned tenants:", error);
        toast.error("Error saving assigned tenants. Please try again.");
      }
    };

    const handleAssignService = async (tenantID) => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token is missing!");
        return;
      }

      try {
        // console.log(services);
        for (const service of services) {
          const formData = new FormData();
          formData.append("tenantId", tenantID);
          // console.log(service.serviceType);
          formData.append("serviceType", service.serviceType);
          formData.append(
            "startDate",
            new Date(service.startDate).toISOString()
          ); // Format date
          formData.append("endDate", new Date(service.endDate).toISOString()); // Format date
          formData.append("unitsRemaining", service.units);
          formData.append("totalUnits", service.units);
          formData.append("billRate", service.billRate);
          // for (let pair of formData.entries()) {
          //   console.log(pair[0] + ": " + pair[1]);
          // }
          // Make the POST request for each service
          const response = await axios.post(
            `${BASE_URL}/tenant/assign-services-documents`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.data.success) {
            toast.success(
              `Service ${service.serviceType} assigned successfully.`
            );

            const updatedServices = [...services];
            const index = updatedServices.findIndex(
              (s) => s.serviceType === service.serviceType
            );
            if (index !== -1) {
              updatedServices[index] = { ...service, isSaved: true };
            }
            dispatch(setServices(updatedServices)); // Update Redux state
          } else {
            toast.error(`Failed to assign service ${service.serviceType}.`);
          }
        }
      } catch (error) {
        console.error("Error posting assigned services:", error);
        toast.error("Error posting assigned services.");
      }
    };

    // Save data when completing Step 1
    if (currentStep === 3) {
      try {
        const tenantID = await handleSave(); // Wait for handleSave to complete and return tenantID
        if (!tenantID) {
          throw new Error(
            "Failed to save tenant data. Tenant ID is null or undefined."
          );
        }

        await handleAssignService(tenantID); // Pass tenantID if needed here
        await assignHCMToTenant(tenantID); // Pass tenantID explicitly

        // If all promises resolve successfully
        setComplete(true);
      } catch (error) {
        console.error("Error in step 3 operations:", error);
        toast.error("Please try again!");
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // setComplete(true);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    const transformedData = {
      personalInfo: {
        firstName: tenantData.firstName || "",
        middleName: tenantData.middleName || "",
        lastName: tenantData.lastName || "",
        dob: tenantData.dob || "",
        gender: tenantData.gender || "",
        maPMINumber: tenantData.maPMINumber || "",
        email: tenantData.email || "",
      },
      address: {
        addressLine1: tenantData.addressLine1 || "",
        addressLine2: tenantData.addressLine2 || "",
        city: tenantData.city || "",
        state: tenantData.state || "",
        zipCode: tenantData.zipCode || "",
        mailingSameAsAbove: tenantData.mailingSameAsAbove || false,
        mailingDifferent: !tenantData.mailingSameAsAbove || false,
      },
      contactInfo: {
        phoneNumber: tenantData.phoneNumber || "",
        email: tenantData.email || "",
        homePhone: tenantData.homePhone || "",
        cellPhone: tenantData.cellPhone || "",
        race: tenantData.race || "",
        ethnicity: tenantData.ethnicity || "",
      },
      emergencyContact: {
        firstName: tenantData.emergencyFirstName || "",
        middleName: tenantData.emergencyMiddleName || "",
        lastName: tenantData.emergencyLastName || "",
        phoneNumber: tenantData.emergencyPhoneNumber || "",
        email: tenantData.emergencyEmail || "",
        relationship: tenantData.emergencyRelationship || "",
      },
      admissionInfo: {
        insurance: tenantData.insurance || "",
        insuranceNumber: tenantData.insuranceNumber || "",
        ssn: tenantData.ssn || "",
        intakeDate: tenantData.intakeDate || "",
        letGoDate: tenantData.letGoDate || null,
        letGoReason: tenantData.letGoReason || "",
        diagnosisCode: tenantData.diagnosisCode || "",
      },
      caseManager: {
        firstName: tenantData.caseManagerFirstName || "",
        middleInitial: tenantData.caseManagerMiddleInitial || "",
        lastName: tenantData.caseManagerLastName || "",
        phoneNumber: tenantData.caseManagerPhoneNumber || "",
        email: tenantData.caseManagerEmail || "",
      },
      loginInfo: {
        userName: tenantData.userName || "",
        password: tenantData.password || "",
      },
      responsibleParty: {
        firstName: tenantData.responsibleFirstName || "",
        middleName: tenantData.responsibleMiddleName || "",
        lastName: tenantData.responsibleLastName || "",
        phoneNumber: tenantData.responsiblePhoneNumber || "",
        email: tenantData.responsibleEmail || "",
        relationship: tenantData.responsibleRelationship || "",
      },
      mailingAddress: {
        line1: tenantData.mailingAddressLine1 || "",
        line2: tenantData.mailingAddressLine2 || "",
        city: tenantData.mailingCity || "",
        state: tenantData.mailingState || "",
        zipcode: tenantData.mailingZipCode || "",
      },
      notes: tenantData.notes || [], // Assuming tenantData.notes is an array of note objects
    };
    // console.log(transformedData);
    for (const [key, value] of Object.entries(transformedData)) {
      formData.append(key, value);
    }

    // console.log(formData);

    try {
      const response = await axios.post(
        `${BASE_URL}/tenant/create`,
        transformedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // console.log("result", response);
        const id = response.data?.response.tenantID;
        const first = response.data?.tenantData?.firstName;
        const last = response.data?.tenantData?.lastName;
        const name = `${first + last}`;

        dispatch(createdTenantName(name));
        setTenantName(name);
        // console.log(`Tenant ID saved: ${id}`);
        if (id) {
          setTenantID(id); // Store tenant ID in state
          dispatch(createdTenant(id));
          toast.success("Tenant data saved successfully");
          return id;
        } else {
          console.error("Tenant ID not found in the response");
          return null;
        }
      } else {
        console.error("Failed to save data:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error during API call:", error);

      // Check if the error response contains specific information
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data?.message; // Adjust based on your API's error format
        console.log("pp", errorMessage);
        if (errorMessage && errorMessage.includes("email")) {
          toast.error("User already exists with that email.");
        } else {
          toast.error("Error saving tenant data. Please try again.");
        }
      } else {
        // Fallback for other errors
        toast.error("An unexpected error occurred. Please try again later.");
      }

      return null;
    }
  };

  const renderSubStep = () => {
    const SubStepComponent = steps[currentStep].subSteps[0];
    if (SubStepComponent) {
      // console.log(
      //   `Rendering step ${currentStep + 1}, passing tenantID: ${tenantID}`
      // );
      return <SubStepComponent tenantID={tenantID} tenantName={tenantName} />;
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
              <div className="flex items-center justify-between">
                <h2 className="text-lg text-gray-700">New Tenant</h2>
                {/* "X" Close Button */}
                <button
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              <Dialog open={open} onClose={handleCancelClose}>
                <DialogTitle>Confirm Close</DialogTitle>
                <DialogContent>
                  <p>
                    All the existing form data will be lost. Are you sure you
                    want to close?
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
              <div className="relative mb-6">
                {/* Container with relative positioning */}

                {/* Centered Text */}
                <h2 className="text-xl font-semibold text-center w-full">
                  {steps[currentStep].name}
                </h2>

                {/* Absolutely positioned button */}
                {steps[currentStep].name === "Assign HCMs" && (
                  <button
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg 
          bg-[#6F84F8] text-white border-[#6F84F8] hover:bg-[#4B63D6]
      }`}
                  >
                    Assign Later
                  </button>
                )}
              </div>
              {renderSubStep()}
            </div>

            <div className="flex justify-between mt-6">
              <div className="flex w-full justify-between">
                <button
                  className={`flex items-center px-4 py-2 rounded ${
                    currentStep === 0
                      ? "bg-white text-white "
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                  onClick={() =>
                    currentStep !== 0
                      ? setCurrentStep((prev) => Math.max(prev - 1, 0))
                      : null
                  }
                  disabled={currentStep === 0}
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
                {currentStep != steps.length - 1 && (
                  <button
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleNext}
                  >
                    <span className="flex items-center">
                      <span>
                        {currentStep == steps.length - 1
                          ? "Create Tenant"
                          : "Next"}
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
                )}
                {currentStep === steps.length - 1 && (
                  <button
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleNext}
                  >
                    <span className="flex items-center">
                      <span>Finish</span>
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
                )}
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default PopupPage;
