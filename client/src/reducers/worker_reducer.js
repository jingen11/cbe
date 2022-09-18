import { Actions } from "../actions/actions";
import Worker from '../models/worker';


const workerReducer = (state = { workers: [], error: null }, action) => {
  if (action.type === Actions.Workers.get) {
    const fetchedWorkers = [];
    for (const workerId in action.payload.data) {
      for (const vehicle of action.payload.state.vehicles.vehicles) {
        if (vehicle.id === action.payload.data[workerId].vehicle.id) {
          action.payload.data[workerId]['vehicle'] = vehicle;
        }
      }

      fetchedWorkers.push(new Worker(action.payload.data[workerId]));
    }


    return {
      workers: fetchedWorkers,
      error: null,
    };
  }
  if (action.type === Actions.Workers.add) {
    const fetchedWorkers = state.workers.map((worker) => worker);

    fetchedWorkers.push(new Worker(action.payload.data));

    return {
      workers: fetchedWorkers,
      error: null,
    };
  }

  if (action.type === Actions.Workers.edit) {
    const fetchedWorkers = state.workers.map((worker) => worker);

    for (const worker of fetchedWorkers)
      if (worker.id === action.payload.data.id)
        worker.update(action.payload.data);

    return {
      workers: fetchedWorkers,
      error: null,
    };
  }

  if (action.type === Actions.Workers.remove) {
    const fetchedWorkers = [];

    for (const worker of state.workers) {
      if (worker.id !== action.payload.workerId) {
        fetchedWorkers.push(worker);
      }
    }

    return {
      workers: fetchedWorkers,
      error: null,
    };
  }

  if (action.type === Actions.Workers.error) {
    console.log(action.payload);

    return state;
  }

  if (action.type === Actions.Auths.clearMemory || action.type === Actions.Auths.logout) {
    return {
      workers: [],
      error: null,
    };
  }

  return state;
};

export default workerReducer;