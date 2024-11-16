import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    assignedTenants: [],
}

const hcmSlice = createSlice({
    name: 'hcm',
    initialState,
    reducers: {
        updateAssignedTenants: (state, action) => {
            return { ...state, assignedTenants: action.payload }
        }
    }
})

export const { updateAssignedTenants } = hcmSlice.actions;
export default hcmSlice.reducer;