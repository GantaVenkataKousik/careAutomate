import { BASE_URL, LOCAL_URL } from "./config";

export const API_ROUTES = {
  HCM: {
    UNITS_STATS: `${BASE_URL}/hcm/hcmUnitsStats/`,
    GET_INFO: `${LOCAL_URL}/hcm/get-hcm-info/`,
    // Add other HCM-related routes here
  },
  COMMUNICATION: {
    BASE: `${BASE_URL}/communication/`,
    // Add other communication-related routes here
  },
  APPOINTMENTS: {
    BASE: `${BASE_URL}/appointment`,
    // Add other appointment-related routes here
  },
  VISITS: {
    BASE: `${BASE_URL}/visit`,
    WAITING_FOR_APPROVAL: `${LOCAL_URL}/visit/visitsWaitingForApproval/`,
    COMPLIANCE: `${LOCAL_URL}/visit/visitCompliance/`,
    // Add other visit-related routes here
  },
  DOCUMENTS: {
    GET: `${BASE_URL}/tenant/get-documents/`,
    // Add other document-related routes here
  },
  MESSAGES: {
    NEW_COUNT: `${LOCAL_URL}/api/newMessagesCount`,
    // Add other message-related routes here
  },
  BILLING: {
    TENANTS_RUNNING_BY_UNITS: `${LOCAL_URL}/bill/tenants-running-by-units/`,
    // Add other billing-related routes here
  },
  TENANTS: {
    GET_INFO: `${LOCAL_URL}/tenant/get-tenant-info/`,
    REASSESSMENTS: `${LOCAL_URL}/tenant/tenant-reassessments/`,
    // Add other tenant-related routes here
  },

  // Add other general routes here
};