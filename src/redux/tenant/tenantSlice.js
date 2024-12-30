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
  },
});

export const { updateTenantInfo, resetTenantInfo, updateAssignedHCMs } =
  tenantSlice.actions;

export default tenantSlice.reducer;
