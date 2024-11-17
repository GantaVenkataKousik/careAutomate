import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    assignedTenants: [],
    hcmId:null,
    hcmName:null
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
        },
        createdHcmName:(state,action) => {
            return { ...state, hcmName: action.payload }
        }
    }
})

export const { updateAssignedTenants,createdHcm,createdHcmName } = hcmSlice.actions;
export default hcmSlice.reducer;