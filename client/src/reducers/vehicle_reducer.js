import { Actions } from "../actions/actions";
import Vehicle from '../models/vehicle';


const vehicleReducer = (state = { vehicles: [], error: null }, action) => {
  console.log(state.vehicles);
  if (action.type === Actions.Vehicles.get) {
    const fetchedVehicles = [];

    for (const vehicleObj in action.payload.data)
      fetchedVehicles.push(new Vehicle(action.payload.data[vehicleObj]));

    return {
      vehicles: fetchedVehicles,
      error: null,
    };
  }
  if (action.type === Actions.Vehicles.add) {
    const fetchedVehicles = state.vehicles.map((vehicle) => vehicle);

    fetchedVehicles.push(new Vehicle(action.payload.data));

    return {
      vehicles: fetchedVehicles,
      error: null,
    };
  }

  if (action.type === Actions.Vehicles.edit) {
    const fetchedVehicles = state.vehicles.map((vehicle) => vehicle);

    for (const vehicle of fetchedVehicles)
      if (vehicle.id === action.payload.data.id)
        vehicle.update(action.payload.data);

    return {
      vehicles: fetchedVehicles,
      error: null,
    };
  }

  if (action.type === Actions.Vehicles.remove) {
    const fetchedVehicles = [];

    for (const vehicle of state.vehicles) {
      if (vehicle.id !== action.payload.vehicleId) {
        fetchedVehicles.push(vehicle);
      }
    }

    return {
      vehicles: fetchedVehicles,
      error: null,
    };
  }

  if (action.type === Actions.Vehicles.error) {
    console.log(action.payload);

    return state;
  }

  if (action.type === Actions.Auths.clearMemory || action.type === Actions.Auths.logout) {
    return {
      vehicles: [],
      error: null,
    };
  }

  return state;
};

export default vehicleReducer;