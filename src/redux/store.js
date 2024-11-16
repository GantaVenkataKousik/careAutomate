
// store.js
import { configureStore } from '@reduxjs/toolkit';
import tenantReducer from './tenant/tenantSlice';
import hcmReducer from './hcm/hcmSlice';

const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    hcm : hcmReducer
  },
});

export default store;
