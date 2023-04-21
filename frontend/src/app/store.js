import { configureStore } from "@reduxjs/toolkit";
import { reducer as parkingReducer } from "./parkingSlice";
import { reducer as userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    parking: parkingReducer,
    user: userReducer,
  },
});

export default store;
