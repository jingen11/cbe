import { Actions } from "../actions/actions";
import Worker from '../models/worker';


const workerReducer = (state = { workers: [], error: null }, action) => {
  if (action.type === Actions.Workers.get) {
    const fetchedWorkers = [];

    for (const workerObj in action.payload.workers)
      fetchedWorkers.push(new Worker(workerObj));

    return {
      workers: fetchedWorkers,
      error: null,
    };
  }
  if (action.type === Actions.Workers.add) {
    console.log(action.payload);
    const fetchedWorkers = [];

    for (const workerObj in action.payload.workers)
      fetchedWorkers.push(new Worker(workerObj));

    return {
      workers: fetchedWorkers,
      error: null,
    };
  }

  return state;
};

export default workerReducer;