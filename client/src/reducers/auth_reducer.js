import { Actions } from "../actions/actions";



const authReducer = (state = { user: {}, error: null }, action) => {
  if (action.type === Actions.Auths.login) {
    return {
      user: {
        ...action.payload,
      },
      error: null,
    };
  }
  if (action.type === Actions.Auths.logout) {
    if (action.payload) return { user: {}, error: null };
    else return state;
  }
  if (action.type === Actions.Auths.error) {
    return { user: {}, error: action.payload };
  }
  if (action.type === Actions.Auths.removeError) {
    return { user: {}, error: null };
  }
  return state;
};

export default authReducer;