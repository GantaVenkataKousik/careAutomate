
import React, { useState } from 'react';

const AddTenantPopup = ({ isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    isVisible && (
      <div className="popup">
        <h2>Add New Tenant</h2>
        <div className="progress-bar">
          <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>STEP 1: Personal Information</div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>STEP 2: Documentation</div>
          <div className="step">STEP 3: Assign Services</div>
          <div className="step">STEP 4: Schedule</div>
        </div>

        {currentStep === 1 && (
          <div className="step-content">
            <p>Enter personal information here.</p>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Mobile" />
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-content">
            <p>Documentation required.</p>
            <div className="documentation-list">
              <div>Checklist*</div>
              <div>InTake*</div>
              <div>Training*</div>
              <div>Performance*</div>
              <div>Resignation*</div>
            </div>
            <p>Housing focused person-centered plan below:</p>
            <button className="fill-submit-btn">Fill & Submit</button>
            <button className="delete-btn">Delete</button>
          </div>
        )}

        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          {currentStep < 2 ? (
            <button className="next-btn" onClick={() => setCurrentStep(2)}>Next</button>
          ) : (
            <button className="next-btn" onClick={onClose}>Finish</button>
          )}
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    )
  );
};

export default AddTenantPopup;

