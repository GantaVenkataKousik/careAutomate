import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  gender: "",
  phoneNumber: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  mailingSameAsAbove: false,
  mailingDifferent: false,
  homePhone: "",
  cellPhone: "",
  workPhone: "",
  extension: "",
  emergencyFirstName: "",
  emergencyMiddleName: "",
  emergencyLastName: "",
  emergencyPhoneNumber: "",
  emergencyEmail: "",
  emergencyRelationship: "",
  caseManagerFirstName: "",
  caseManagerMiddleInitial: "",
  caseManagerLastName: "",
  caseManagerPhoneNumber: "",
  caseManagerEmail: "",
  employmentTitle: "",
  hireDate: "",
  terminationDate: "",
  ssn: "",
  rateOfPay: "",
  userName: "",
  password: "",
  responsibleFirstName: "",
  responsibleMiddleName: "",
  responsibleLastName: "",
  responsiblePhoneNumber: "",
  responsibleEmail: "",
  responsibleRelationship: "",
  assignedHCMs: {
    ids: [],
    names: [],
  },
  services: [],
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    updateTenantInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetTenantInfo: () => initialState,
    updateAssignedHCMs: (state, action) => {
      // Update both IDs and names
      state.assignedHCMs = {
        ids: action.payload.ids || [],
        names: action.payload.names || [],
      };
    },
    setServices: (state, action) => {
      state.services = action.payload; // Store the services data
    },
    addService: (state, action) => {
      state.services.push(action.payload); // Add new service
    },
    updateService: (state, action) => {
      const { index, service } = action.payload;
      state.services[index] = service; // Update service at the specific index
    },
    removeService: (state, action) => {
      state.services = state.services.filter(
        (_, index) => index !== action.payload
      );
    },
    clearServices: (state) => {
      state.services = []; // Clear all services from Redux store
    },
  },
});

export const {
  updateTenantInfo,
  resetTenantInfo,
  updateAssignedHCMs,
  setServices,
  addService,
  updateService,
  removeService,
  clearServices,
} = tenantSlice.actions;

export default tenantSlice.reducer;
