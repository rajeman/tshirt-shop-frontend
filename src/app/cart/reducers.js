import constants from './constants';
const defaultState = {
  status: '',
  cart: {}
};

const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_CART_FETCH_STATE: {
      const { status, cartItems } = action;
      return {
        ...state,
        status,
        ...cartItems
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
