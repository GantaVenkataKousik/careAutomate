import { BASE_URL } from "./config";

export const API_ROUTES = {
  HCM_UNITS_STATS: `${BASE_URL}/hcm/hcmUnitsStats/`,
  // Add other routes here
  COMMUNICATION: `${BASE_URL}/communication/`,
  APPOINTMENTS: `${BASE_URL}/appointment`,
  VISITS: `${BASE_URL}/visit`,
  DOCUMENTS: `${BASE_URL}/tenant/get-documents/`,
};
