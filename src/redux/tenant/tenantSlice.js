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
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    updateTenantInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetTenantInfo: () => initialState,
  },
});

export const { updateTenantInfo, resetTenantInfo } = tenantSlice.actions;

export default tenantSlice.reducer;
