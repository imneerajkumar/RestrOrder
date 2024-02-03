import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { menuReducer } from "./reducer";
import { thunk } from "redux-thunk";

const store = configureStore({ reducer: menuReducer }, applyMiddleware(thunk));
export default store;
