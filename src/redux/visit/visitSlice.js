import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitData: [],
  selectedVisit: null, // It should start as null or an empty object
};

const visitsSlice = createSlice({
  name: "visits",
  initialState,
  reducers: {
    setSelectedVisit: (state, action) => {
      state.selectedVisit = action.payload; // Update selectedVisit with payload
      console.log(state.selectedVisit);
    },
    // Other reducers can go here...
  },
});

export const { setSelectedVisit } = visitsSlice.actions;
export default visitsSlice.reducer;
