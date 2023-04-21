import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  block: "B",
  slot: 7,
  showParkingBooking: false,
  showBookedSlotDetails: false,
  date: "",
  arrival: "",
  departure: "",
};

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    setParkingDetails: (state, action) => {
      state.block = action.payload.block;
      state.slot = action.payload.slot;
      state.showParkingBooking = action.payload.showParkingBooking;
      state.date = action.payload.date;
      state.arrival = action.payload.arrival;
      state.departure = action.payload.departure;
    },
  },
});

export const reducer = parkingSlice.reducer;
export const actions = parkingSlice.actions;
