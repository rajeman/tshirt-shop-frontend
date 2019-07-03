import constants from './constants';
const defaultState = {
  status: '',
  user: {}
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_AUTH_STATE: {
      const { status, user } = action;
      return {
        ...state,
        status,
        user
      };
    }
    default:
      return state;
  }
};

export default authReducer;
