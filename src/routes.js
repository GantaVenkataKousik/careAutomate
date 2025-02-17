import { BASE_URL } from "./config";
export const API_ROUTES = {
  AUTH: {
    BASE: `${BASE_URL}/auth`,
  },
  HCM: {
    GET_INFO: `${BASE_URL}/hcm/get-hcm-info/`,
    // Add other HCM-related routes here
  },
  COMMUNICATION: {
    BASE: `${BASE_URL}/communication/`,
    // Add other communication-related routes here
  },
  APPOINTMENTS: {
    BASE: `${BASE_URL}/appointment`,
    GET_APPOINTMENTS: `${BASE_URL}/appointment/fetchAppointments`,
    // Add other appointment-related routes here
  },
  VISITS: {
    BASE: `${BASE_URL}/visit`,
    WAITING_FOR_APPROVAL: `${BASE_URL}/visit/visitsWaitingForApproval/`,
    COMPLIANCE: `${BASE_URL}/visit/visitCompliance/`,
    // Add other visit-related routes here
  },
  DOCUMENTS: {
    GET: `${BASE_URL}/tenant/get-documents/`,
  },
  MESSAGES: {
    NEW_COUNT: `${BASE_URL}/api/newMessagesCount`,
  },
  BILLING: {
    TENANTS_RUNNING_BY_UNITS: `${BASE_URL}/bill/tenants-running-by-units/`,
    PLAN_USAGE: `${BASE_URL}/bill/plan-usage/`,
    BILLS_PENDING_BY_TENANT: `${BASE_URL}/bill/get-bills-pending-by-tenant/`,
    BILLS_PAID_BY_TENANT: `${BASE_URL}/bill/get-bills-completed-by-tenant/`,
    GET_BILLS_PENDING: `${BASE_URL}/bill/get-bills-pending/`,
    GET_BILLS_RECEIVED: `${BASE_URL}/bill/get-bills-received/`,
  },
  SERVICE_TRACKING: {
    BASE: `${BASE_URL}/service-tracking`,
    GET_ALL_SERVICES: `${BASE_URL}/serviceTracking/get-all-services/`,
  },
  TENANTS: {
    BASE: `${BASE_URL}/tenant`,
    UPDATE_TENANT: `${BASE_URL}/tenant/update-tenant/`,
    GET_INFO: `${BASE_URL}/tenant/get-tenant-info/`,
    REASSESSMENTS: `${BASE_URL}/tenant/tenant-reassessments/`,


    // Add other tenant-related routes here
  },
  REPORTS: {
    BASE: `${BASE_URL}/reports`,

    //tenant-reports
    GET_TENANT_PERSONAL_INFO_REPORTS: `${BASE_URL}/reports/tenant-personal-info-reports/`,
    GET_TENANT_SERVICE_TRACKING_PLAN_REPORTS: `${BASE_URL}/reports/service-tracking-plan-reports/`,
    GET_TENANT_VISIT_COMPLIANCE_REPORTS: `${BASE_URL}/reports/tenant-visit-compliance-reports/`,

    //hcm-reports
    GET_HCM_PERSONAL_INFO_REPORTS: `${BASE_URL}/reports/hcm-personal-info-reports/`,
  },
};

