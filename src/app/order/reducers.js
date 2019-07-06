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

    case constants.SET_PAYMENT_STATE: {
      const { paymentStatus } = action;
      return {
        ...state,
        paymentStatus
      };
    }

    case constants.UPDATE_PAID_ORDER: {
      const { orderId } = action;
      const previousOrders = state.order;
      let updatedOrders;
      if (previousOrders) {
        updatedOrders = previousOrders.map(order => {
          if (order.order_id === orderId) {
            return { ...order, status: 1 };
          }
          return order;
        });
      }

      return {
        ...state,
        order: updatedOrders
      };
    }

    default:
      return state;
  }
};

export default orderReducer;
