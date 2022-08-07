import { Actions } from "../actions/actions";
import User from '../models/user';

const authReducer = (state = { user: new User(), error: null }, action) => {
  if (action.type === Actions.Auths.login) {
    return {
      user: new User(action.payload),
      error: null,
    };
  }
  if (action.type === Actions.Auths.logout) {
    if (action.payload) return { user: new User(), error: null };
    else return state;
  }
  if (action.type === Actions.Auths.checkSession) {
    if (action.payload) return { user: new User(action.payload), error: null };
    else return state;
  }
  if (action.type === Actions.Auths.error) {
    return { user: new User(), error: action.payload };
  }
  if (action.type === Actions.Auths.removeError) {
    return { user: new User(), error: null };
  }
  return state;
};

export default authReducer;