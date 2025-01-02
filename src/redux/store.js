// store.js
import { configureStore } from "@reduxjs/toolkit";
import tenantReducer from "./tenant/tenantSlice";
import hcmReducer from "./hcm/hcmSlice";
import visitReducer from "./visit/visitSlice"; // Import the visit reducer
import accountSetupReducer from "./accountSetup/accountSetupSlice";

const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    hcm: hcmReducer,
    visit: visitReducer, // Add the visit reducer here
    accountSetup: accountSetupReducer, // Add the accountSetup reducer here
  },
});

export default store;
