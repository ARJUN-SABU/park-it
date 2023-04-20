import { configureStore } from "@reduxjs/toolkit";
import { reducer as parkingReducer } from "./parkingSlice";

const store = configureStore({
  reducer: {
    parking: parkingReducer,
  },
});

export default store;
