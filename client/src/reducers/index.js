
import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import workerReducer from "./worker_reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  workers: workerReducer,
});