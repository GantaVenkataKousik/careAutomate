import React, { useState } from 'react';
import SubStep1 from './SubStep1';
import SubStep2 from './SubStep2';
import SubStep3 from './SubStep3';
import SubStep4 from './SubStep4';
import Substep12 from './Substep12';
import Substep22 from './Substep22';
import Step4 from './Step4';
import AssignServicesSubStep from './AssignServicesSubStep';
import { useNavigate } from 'react-router-dom';
const steps = [
  {
    name: "Personal Information",
    subSteps: [SubStep1, SubStep2, SubStep3],
  },
  {
    name: "Documentation",
    subSteps: [Substep12, Substep22],
  },
  {
    name: "Assign Services",
    subSteps: [AssignServicesSubStep],
  },
  {
    name: "Schedule",
    subSteps: [Step4],
  },
];

const PopupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [subStepProgress, setSubStepProgress] = useState(0);


  const handleNext = () => {
    const currentStepSubSteps = steps[currentStep].subSteps.length;
    if (currentSubStep < currentStepSubSteps - 1) {
      setCurrentSubStep((prev) => prev + 1);
      setSubStepProgress((prev) => prev + 1);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setCurrentSubStep(0);
      setSubStepProgress((prev) => prev + 1);
    } else {
      setComplete(true);
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep((prev) => prev - 1);
      setSubStepProgress((prev) => prev - 1);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setCurrentSubStep(steps[currentStep - 1].subSteps.length - 1);
      setSubStepProgress((prev) => prev - 1);
    }
  };

  const handleCancel = () => {
    navigate('/tenants')
  };
  const handleComplete = () => {
    navigate('/tenants')
  };


  const totalSubSteps = steps.reduce((total, step) => total + step.subSteps.length, 0);
  const totalSubStepProgress = (subStepProgress / totalSubSteps) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="container bg-white rounded-lg shadow-lg p-6" style={{ width: "40%" }}>
          <div className="mb-6 -mx-6">
            <label className="block text-gray-700 mb-2 mx-4 -mt-2">New Tenant</label>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${totalSubStepProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            {steps.map((step, i) => {
              const isActive = i === currentStep;
              const completedSubSteps = isActive ? currentSubStep : step.subSteps.length;
              const widthPercentage = (completedSubSteps / step.subSteps.length) * 100;

              return (
                <React.Fragment key={i}>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-2 text-white flex items-center justify-center mx-auto">
                      {i < currentStep || (i === currentStep && complete) ? (
                        <i className="fa-solid fa-circle-check fa-xl" style={{ color: "#11ff00" }}></i>
                      ) : (
                        <i className="fa-solid fa-circle-xmark fa-xl" style={{ color: "#ff0000" }}></i>
                      )}
                    </div>
                    <div>
                      <span className={`text-sm ${isActive ? "text-blue-500" : "text-black"}`}>
                        STEP {i + 1}
                      </span>
                    </div>
                    <span
                      className={`${i < currentStep
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
                          className={`h-2 rounded-full ${i < currentStep ? "bg-indigo-500" : "bg-gray-300"}`}
                          style={{ width: `${i === currentStep ? widthPercentage : i < currentStep ? 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="text-center">
            {steps[currentStep].subSteps[currentSubStep] && React.createElement(steps[currentStep].subSteps[currentSubStep])}
          </div>

          <div className="flex justify-center mt-6 space-x-6">
            {/* Back Button */}
            <div
              className="flex items-center cursor-pointer text-gray-400 hover:text-blue-500 hover:fill-blue-500"
              onClick={handleBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="fill-gray-400 hover:fill-blue-500" // Change fill on hover
              >
                <polygon points="10,0 0,10 10,20" />
              </svg>
              <span className="ml-1">Back</span>
            </div>

            {/* Next Button */}
            <div
              className="flex items-center cursor-pointer text-gray-400 hover:text-blue-500 hover:fill-blue-500"
              onClick={handleNext}
            >
              <span className="flex items-center">
                <span>
                  {currentSubStep === steps[currentStep].subSteps.length - 1 ? "Next Step" : "Next Sub-Step"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="ml-2 fill-gray-400 hover:fill-blue-500" // Change fill on hover
                >
                  <polygon points="0,0 10,10 0,20" />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {!complete && (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={handleComplete}
              >
                Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupPage;





