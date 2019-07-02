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
    case constants.SET_CART_ADD_STATE: {
      const { status } = action;
      return {
        ...state,
        status
      };
    }

    case constants.SET_CART_UPDATE_STATE: {
      const { status } = action;
      return {
        ...state,
        status
      };
    }

    case constants.SET_CART_ITEM_STATE: {
      const { status, cartItem } = action;
      const { cart } = state;
      const newItems = cart.filter(item => item.item_id !== cartItem.item_id);
      return {
        ...state,
        status,
        cart: newItems.concat(cartItem).sort((a, b) => {
          return parseInt(a.item_id - parseInt(b.item_id));
        })
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
