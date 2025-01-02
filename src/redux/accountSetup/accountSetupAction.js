// Import the slice actions
import {
  updateField,
  togglePermission,
  resetAccountSetup,
} from "./accountSetupSlice";

// Example usage of actions:

// Action to update a specific field
export const updateAccountField = (field, value) => (dispatch) => {
  dispatch(updateField({ field, value }));
};

// Action to toggle a specific permission
export const toggleAccountPermission = (permission) => (dispatch) => {
  dispatch(togglePermission(permission));
};

// Action to reset the account setup state
export const resetAccountState = () => (dispatch) => {
  dispatch(resetAccountSetup());
};
