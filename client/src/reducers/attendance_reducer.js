
import { Actions } from "../actions/actions";
import Attendance from '../models/attendance';


const attendanceReducer = (state = { attendances: {}, error: null }, action) => {
  if (action.type === Actions.Attendances.get) {
    const fetchedAttendances = {};
    let date;
    let dateString = '';

    for (const attendanceObj of action.payload.data) {
      date = new Date(attendanceObj.date);

      dateString = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;

      if (!fetchedAttendances[dateString]) {
        fetchedAttendances[dateString] = {};
      }

      for (const vehicle of action.payload.state.vehicles.vehicles) {
        if (vehicle.id === attendanceObj.vehicleId) {
          attendanceObj.vehicle = vehicle;
        }
      }

      for (const worker of action.payload.state.workers.workers) {
        if (worker.id === attendanceObj.workerId) {
          attendanceObj.worker = worker;
        }
      }

      fetchedAttendances[dateString][attendanceObj.worker.id] = new Attendance(attendanceObj);
    }

    return {
      attendances: fetchedAttendances,
      error: null,
    };
  }

  if (action.type === Actions.Attendances.add) {
    const fetchedAttendances = Object.assign(state.attendances);
    let date;
    let dateString = '';

    // add new attendances
    for (const key in action.payload.data) {
      date = new Date(action.payload.data[key].date);

      dateString = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;

      if (!fetchedAttendances[dateString]) {
        fetchedAttendances[dateString] = {};
      }

      for (const vehicle of action.payload.state.vehicles.vehicles) {
        if (vehicle.id === action.payload.data[key].vehicleId) {
          action.payload.data[key].vehicle = vehicle;
        }
      }

      for (const worker of action.payload.state.workers.workers) {
        if (worker.id === action.payload.data[key].workerId) {
          action.payload.data[key].worker = worker;
        }
      }

      fetchedAttendances[dateString][action.payload.data[key].worker.id] = new Attendance(action.payload.data[key]);
    }

    // remove attendances
    for (const [workerId, prevAttendance] of Object.entries(action.payload.updatedAttendances)) {
      if (!prevAttendance.present) {
        dateString = `${prevAttendance.date.getFullYear()}_${prevAttendance.date.getMonth() + 1}_${prevAttendance.date.getDate()}`;

        if (fetchedAttendances[dateString][workerId])
          delete fetchedAttendances[dateString][workerId];
      }
    }

    return {
      attendances: fetchedAttendances,
      error: null,
    }
  }

  if (action.type === Actions.Attendances.error) {
    console.log(action.payload);

    return state;
  }

  return state;
};

export default attendanceReducer;