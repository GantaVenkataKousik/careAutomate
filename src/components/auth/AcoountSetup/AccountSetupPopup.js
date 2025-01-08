import React, { useState } from "react";
import { Modal } from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { formatFormData } from "../../../utils/accountSetupUtils/accountSetupFormFormat";
import { useDispatch, useSelector } from "react-redux";
import { API_ROUTES } from "../../../routes";
import { resetAccountState } from "../../../redux/accountSetup/accountSetupAction";
import { toast } from "react-toastify";

const AccountSetupPopup = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.accountSetup);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const steps = [
    { name: "Personal Details", substep: Step1 },
    { name: "Logins", substep: Step2 },
    { name: "Additional Details", substep: Step3 },
    { name: "Bank Details", substep: Step4 },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setComplete(true);
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    user.accountSetup = true;
    dispatch(resetAccountState()); // Dispatch the reset action
    localStorage.setItem("user", JSON.stringify(user));
    console.log("skip", user);
    onClose();
  };

  const renderSubStep = () => {
    const SubStepComponent = steps[currentStep].substep;
    return <SubStepComponent />;
  };

  const handleSubmit = async () => {
    const formattedData = formatFormData(formData);
    console.log(formattedData);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error(token);
      return; // Stop execution if no token
    }

    try {
      const response = await fetch(
        `${API_ROUTES.AUTH.BASE}/office-admin-account-setup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Account setup successful:", responseData);
      dispatch(resetAccountState()); // Dispatch the reset action
      user.accountSetup = true;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Account setup is successful!!");
      onClose();
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Error in creating account");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[66%] h-[90%] bg-white shadow-lg p-6 rounded-lg overflow-auto tenant-visits-scrollbar">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold ">Complete Your Profile</h2>
            <button
              className="text-[#6F84F8] rounded-full border-2 border-[#6F84F8] px-4 py-1 hover:text-white hover:bg-[#6F84F8]"
              onClick={handleSkip}
            >
              Skip for Now
            </button>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="h-2 bg-indigo-500 rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          {steps.map((step, i) => {
            const isActive = i === currentStep;
            return (
              <React.Fragment key={i}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center mx-auto">
                    {i < currentStep || (i === currentStep && complete) ? (
                      <i
                        className="fa-solid fa-circle-check fa-xl"
                        style={{ color: "#11ff00" }}
                      ></i>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm">{i + 1}</span>
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-sm mt-2 ${
                      isActive
                        ? "text-indigo-500"
                        : i < currentStep
                          ? "text-green-500"
                          : "text-black"
                    }`}
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
                          width: `${i < currentStep ? 100 : 0}%`,
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
            onClick={handleBack}
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

          <button
            className="flex items-center px-4 py-2 bg-[#6F84F8] text-white rounded hover:bg-[#5b6fd8]"
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
      </div>
    </Modal>
  );
};

export default AccountSetupPopup;
