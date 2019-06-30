import constants from './constants';
const defaultState = {
  status: '',
  product: {}
};

const productReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_PRODUCT_STATE: {
      const { status, product } = action;
      const oldProducts = state.product;
      console.log(oldProducts, 'old products');
      return {
        ...state,
        status,
        product: { ...oldProducts, [product.productId]: product.product }
      };
    }
    default:
      return state;
  }
};

export default productReducer;
