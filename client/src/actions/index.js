
import { Actions } from "./actions";
import { CbeApi } from "../services/network/api";

export const loginUser = (userCredential) => {
  return async (dispatch) => {
    try {
      const result = await CbeApi.login(userCredential);
      if (result.user)
        dispatch({ type: Actions.Auths.login, payload: result.user });
      else if (result.error)
        dispatch({ type: Actions.Auths.error, payload: result.error });
    } catch (error) {
      dispatch({ type: Actions.Auths.error, payload: error.message });
    }
  };
};

export const checkSession = () => {
  return async (dispatch) => {
    try {
      const result = await CbeApi.checkSession();
      dispatch({ type: Actions.Auths.checkSession, payload: result.user });
    } catch (error) {
      dispatch({ type: Actions.Auths.error, payload: error.message });
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      const result = await CbeApi.logout();
      dispatch({ type: Actions.Auths.logout, payload: result });
    } catch (error) {
      dispatch({ type: Actions.Auths.error, payload: error.message });

    }
  }
}

export const getWorkers = () => {
  return async (dispatch) => {
    try {
      const result = await CbeApi.getWorkers();
      
        dispatch({ type: Actions.Workers.get, payload: result });
    } catch (error) {
      dispatch({ type: Actions.Workers.error, payload: error.message });

    }
  }
}

export const addWorker = (workerDetails) => {
  return async (dispatch) => {
    try {
      const result = await CbeApi.addWorker(workerDetails);

      if(!result.error)
        dispatch({ type: Actions.Workers.add, payload: result });

      else
        dispatch({ type: Actions.Workers.error, payload: result.error });  
    } catch (error) {
      dispatch({ type: Actions.Workers.error, payload: error.message });

    }
  }
}

export const editWorker = (workerDetails) => {
  return async (dispatch) => {
    try {
      const result = await CbeApi.editWorker(workerDetails);

      if(!result.error)
        dispatch({ type: Actions.Workers.edit, payload: result });
      else
        dispatch({ type: Actions.Workers.error, payload: result.error });
    } catch (error) {
      dispatch({ type: Actions.Workers.error, payload: error.message });
    }
  }
}