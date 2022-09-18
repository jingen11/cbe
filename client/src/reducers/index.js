
import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import workerReducer from "./worker_reducer";
import vehicleReducer from "./vehicle_reducer";
import attendanceReducer from "./attendance_reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  workers: workerReducer,
  vehicles: vehicleReducer,
  attendances: attendanceReducer,
});