import constants from './constants';

const homeReducer = (state = { status: constants.DEFAULT_STATE }, action) => {
  switch (action.type) {
    case constants.SET_PRODUCTS_STATE: {
      const { status, products } = action;
      const oldProducts = state.products;
      const page = products.page || 1;
      return {
        ...state,
        status,
        products: { ...oldProducts, [page]: products }
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
