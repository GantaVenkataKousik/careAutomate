// tenantSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    personalInfo: {
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        email: '',
      },
      addressInfo: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        mailingSameAsAbove: false,
        mailingDifferent: false,
      },
      contactInfo: {
        homePhone: '',
        cellPhone: '',
        workPhone: '',
        extension: '',
        email: '',
      },
      emergencyContactInfo: {
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        relationship: '',
      },
      caseManagerInfo: {  // Add new case manager fields here
        firstName: '',
        middleInitial: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      },
      loginInfo: {  // Updated with email
        userName: '',
        password: '',
        email: '',
      },
      responsiblePartyInfo: { // New section for SubStep7
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        relationship: '',
      },
  // Add other sub-step fields as needed
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
        
        state.personalInfo = { ...state.personalInfo, ...action.payload };
      },
      updateAddressInfo: (state, action) => {
        
        state.addressInfo = { ...state.addressInfo, ...action.payload };
      },
      updateContactInfo: (state, action) => {
        
        state.contactInfo = { ...state.contactInfo, ...action.payload };
      },
      updateEmergencyContactInfo: (state, action) => {
        console.log(action.payload);
        state.emergencyContactInfo = { ...state.emergencyContactInfo, ...action.payload };
      },
      updateCaseManagerInfo: (state, action) => {
        state.caseManagerInfo = { ...state.caseManagerInfo, ...action.payload };
      },
      updateLoginInfo: (state, action) => {
        state.loginInfo = { ...state.loginInfo, ...action.payload };
      },
      updateResponsiblePartyInfo: (state, action) => {
        state.responsiblePartyInfo = { ...state.responsiblePartyInfo, ...action.payload };
      },
      
    // Add reducers for other sub-steps
  },
});

export const { updatePersonalInfo, 
               updateAddressInfo,
               updateContactInfo, 
               updateEmergencyContactInfo, 
               updateCaseManagerInfo, 
               updateLoginInfo,
               updateResponsiblePartyInfo
                } = tenantSlice.actions;

export default tenantSlice.reducer;
