import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Parent account fields
  firstName: "",
  lastName: "",
  companyName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  officePhoneNumber: "",
  cellPhoneNumber: "",
  primaryEmail: "",
  alternateEmail: "",
  federalTaxId: "",
  npiUmpi: "",
  Taxonomy: "",
  mnitsUserName: "",
  mnitsPassword: "",
  WaystarUserName: "",
  WaystarPassword: "",
  nameOnCard: "",
  cardNumber: "",
  expiryDate: "",
  billingAddressCheckBox: false,
  billingAddress: "",
  billingCity: "",
  billingState: "",
  billingZipCode: "",
  // Child account fields
  childAccount: false,
  childFirstName: "",
  childLastName: "",
  childAddressLine1: "",
  childAddressLine2: "",
  childCity: "",
  childState: "",
  childZipCode: "",
  childOfficePhoneNumber: "",
  childCellPhoneNumber: "",
  childUsername: "",
  childPassword: "",
  // Permissions
  billing: false,
  tenant: false,
  hcm: false,
  appointments: false,
  visit: false,
  communication: false,
};

const accountSetupSlice = createSlice({
  name: "accountSetup",
  initialState,
  reducers: {
    // Update a single field
    updateField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      }
    },
    // Toggle a permission
    togglePermission: (state, action) => {
      const permission = action.payload;
      if (state.hasOwnProperty(permission)) {
        state[permission] = !state[permission];
      }
    },
    // Reset to initial state
    resetAccountSetup: () => initialState,
  },
});

export const { updateField, togglePermission, resetAccountSetup } =
  accountSetupSlice.actions;

export default accountSetupSlice.reducer;
