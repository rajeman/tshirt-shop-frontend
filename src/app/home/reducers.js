import constants from './constants';
const defaultState = {
  status: constants.DEFAULT_STATE,
  products: { [constants.FILTER_NONE]: { 1: {} } }
};

const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_PRODUCTS_STATE: {
      const { status, products } = action;
      const oldProducts = state.products;
      const { filter } = products;
      const page = products.page || 1;
      return {
        ...state,
        status,
        products: {
          ...oldProducts,
          [filter]: { ...oldProducts[filter], [page]: products }
        }
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
