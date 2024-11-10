
// store.js
import { configureStore } from '@reduxjs/toolkit';
import tenantReducer from './tenant/tenantSlice';

const store = configureStore({
  reducer: {
    tenant: tenantReducer,
  },
});

export default store;
