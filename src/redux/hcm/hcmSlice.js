import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    assignedTenants: [],
    hcmId:null,
}

const hcmSlice = createSlice({
    name: 'hcm',
    initialState,
    reducers: {
        updateAssignedTenants: (state, action) => {
            return { ...state, assignedTenants: action.payload }
        },
        createdHcm:(state,action) => {
            return { ...state, hcmId: action.payload }
        }
    }
})

export const { updateAssignedTenants,createdHcm } = hcmSlice.actions;
export default hcmSlice.reducer;