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
  mailingAddress: "",
  homePhone: "",
  cellPhone: "",
  workPhone: "",
  extension: "",
  employmentTitle: "",
  hireDate: "",
  terminationDate: "",
  ssn: "",
  rateOfPay: "",
  userName: "",
  password: "",
  confirmPassword: "",
  assignedTenants: {
    ids: [],
    names: [],
  },
  hcmId: null,
  hcmName: null,
  tenantId: null,
  tenantName: null,
  files: {
    "Intake Documents": [],
    "ID Proofs": [],
    "Lease Agreements": [],
  },
};

const hcmSlice = createSlice({
  name: "hcm",
  initialState,
  reducers: {
    updateAssignedTenants: (state, action) => {
      state.assignedTenants = {
        ids: action.payload.ids || [],
        names: action.payload.names || [],
      };
    },
    createdHcm: (state, action) => {
      state.hcmId = action.payload;
    },
    createdHcmName: (state, action) => {
      state.hcmName = action.payload;
    },
    updateHcmInfo: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          state[key] = action.payload[key];
        }
      });
    },
    createdTenant: (state, action) => {
      state.tenantId = action.payload;
    },
    createdTenantName: (state, action) => {
      state.tenantName = action.payload;
    },
    resetHcmInfo: () => initialState, // Resetting to the initial state

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
  updateAssignedTenants,
  createdHcm,
  createdHcmName,
  updateHcmInfo,
  createdTenant,
  createdTenantName,
  resetHcmInfo, // Exporting the reset action
  addFileToFolder, // Add file to folder
  removeFileFromFolder, // Remove file from folder
  createFolder, // Create new folder
  renameFolder,
} = hcmSlice.actions;

export default hcmSlice.reducer;
