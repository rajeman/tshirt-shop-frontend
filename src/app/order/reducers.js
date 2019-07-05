import constants from './constants';
const defaultState = {
  status: '',
  order: undefined
};

const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_ORDER_STATE: {
      const { status, order } = action;
      return {
        ...state,
        status,
        order
      };
    }
    case constants.SET_SINGLE_ORDER_STATE: {
      const { singleOrderStatus, singleOrder } = action;
      return {
        ...state,
        singleOrderStatus,
        singleOrder
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
