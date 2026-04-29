import { configureStore } from "@reduxjs/toolkit";
import apiDataReducer from "./apiDataSlice";

const store = configureStore({
  reducer:{
    apiData: apiDataReducer
  }
})

export default store;