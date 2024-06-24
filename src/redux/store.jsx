import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./rootslice";

const store = configureStore({
  reducer: {
    root: rootSlice,
    // Add other slices if you have more reducers
  },
});

export default store;
