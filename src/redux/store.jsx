import { combineReducers } from "redux";
import rootslice from "./rootslice";
import { configureStore } from "@reduxjs/toolkit";

const reducer=combineReducers({
    root:rootslice,
});

const store = configureStore({
    reducer
});

export default store;
