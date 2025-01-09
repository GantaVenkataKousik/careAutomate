import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  gender: "",
  maPMINumber: "",
  phoneNumber: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  mailingSameAsAbove: false,
  mailingDifferent: false,
  mailingAddressLine1: "",
  mailingAddressLine2: "",
  mailingCity: "",
  mailingState: "",
  mailingZipCode: "",
  homePhone: "",
  cellPhone: "",
  workPhone: "",
  race: "",
  ethnicity: "",
  extension: "",
  emergencyFirstName: "",
  emergencyMiddleName: "",
  emergencyLastName: "",
  emergencyPhoneNumber: "",
  emergencyEmail: "",
  emergencyRelationship: "",
  insurance: "",
  insuranceNumber: "",
  ssn: "",
  intakeDate: "",
  letGoDate: null,
  letGoReason: "",
  diagnosisCode: "",
  caseManagerFirstName: "",
  caseManagerMiddleInitial: "",
  caseManagerLastName: "",
  caseManagerPhoneNumber: "",
  caseManagerEmail: "",
  employmentTitle: "",
  hireDate: "",
  terminationDate: "",
  rateOfPay: "",
  userName: "",
  password: "",
  responsibleFirstName: "",
  responsibleMiddleName: "",
  responsibleLastName: "",
  responsiblePhoneNumber: "",
  responsibleEmail: "",
  responsibleRelationship: "",
  hasResponsibleParty: false,
  assignedHCMs: {
    ids: [],
    names: [],
  },
  services: [],
  files: {
    "Intake Documents": [],
    "ID Proofs": [],
    "Lease Agreements": [],
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
    setServices: (state, action) => {
      state.services = action.payload; // Store the services data
    },
    addService: (state, action) => {
      state.services.push(action.payload); // Add new service
    },
    updateService: (state, action) => {
      const { index, service } = action.payload;
      state.services[index] = service; // Update service at the specific index
    },
    removeService: (state, action) => {
      state.services = state.services.filter(
        (_, index) => index !== action.payload
      );
    },
    clearServices: (state) => {
      state.services = []; // Clear all services from Redux store
    },
    // **File Management Actions**
    addFileToFolder: (state, action) => {
      const { folderName, file } = action.payload;
      if (!state.files[folderName]) {
        state.files[folderName] = []; // Create folder if it doesn't exist
      }
      state.files[folderName].push(file); // Add file to the folder
    },
    removeFileFromFolder: (state, action) => {
      const { folderName, fileName } = action.payload;
      if (state.files[folderName]) {
        state.files[folderName] = state.files[folderName].filter(
          (file) => file.name !== fileName
        );
      }
    },
    createFolder: (state, action) => {
      const { folderName } = action.payload;
      if (!state.files[folderName]) {
        state.files[folderName] = []; // Add a new folder
      }
    },
    // Add to your reducers in hcmSlice
    removeFolder: (state, action) => {
      const { folderName } = action.payload;
      delete state.files[folderName];
    },
  },
});

export const {
  updateTenantInfo,
  resetTenantInfo,
  updateAssignedHCMs,
  setServices,
  addService,
  updateService,
  removeService,
  clearServices,
  resetHcmInfo, // Exporting the reset action
  addFileToFolder, // Add file to folder
  removeFileFromFolder, // Remove file from folder
  createFolder, // Create new folder
  renameFolder,
} = tenantSlice.actions;

export default tenantSlice.reducer;
