import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  block: "B",
  slot: 7,
};

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    setParkingDetails: (state, action) => {
      state.block = action.payload.block;
      state.slot = action.payload.slot;
    },
  },
});

export const reducer = parkingSlice.reducer;
export const actions = parkingSlice.actions;
