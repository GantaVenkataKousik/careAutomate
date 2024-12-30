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
  mailingAddress: "",
  homePhone: "",
  cellPhone: "",
  workPhone: "",
  extension: "",
  employmentTitle: "",
  hireDate: "",
  terminationDate: "",
  ssn: "",
  rateOfPay: "",
  userName: "",
  password: "",
  confirmPassword: "",
  assignedTenants: {
    ids: [],
    names: [],
  },
  hcmId: null,
  hcmName: null,
  tenantId: null,
  tenantName: null,
};

const hcmSlice = createSlice({
  name: "hcm",
  initialState,
  reducers: {
    updateAssignedTenants: (state, action) => {
      state.assignedTenants = {
        ids: action.payload.ids || [],
        names: action.payload.names || [],
      };
    },
    createdHcm: (state, action) => {
      state.hcmId = action.payload;
    },
    createdHcmName: (state, action) => {
      state.hcmName = action.payload;
    },
    updateHcmInfo: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          state[key] = action.payload[key];
        }
      });
    },
    createdTenant: (state, action) => {
      state.tenantId = action.payload;
    },
    createdTenantName: (state, action) => {
      state.tenantName = action.payload;
    },
    resetHcmInfo: () => initialState, // Resetting to the initial state
  },
});

export const {
  updateAssignedTenants,
  createdHcm,
  createdHcmName,
  updateHcmInfo,
  createdTenant,
  createdTenantName,
  resetHcmInfo, // Exporting the reset action
} = hcmSlice.actions;

export default hcmSlice.reducer;
