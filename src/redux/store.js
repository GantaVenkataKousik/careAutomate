// store.js
import { configureStore } from "@reduxjs/toolkit";
import tenantReducer from "./tenant/tenantSlice";
import hcmReducer from "./hcm/hcmSlice";
import visitReducer from "./visit/visitSlice"; // Import the visit reducer

const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    hcm: hcmReducer,
    visit: visitReducer, // Add the visit reducer here
  },
});

export default store;
