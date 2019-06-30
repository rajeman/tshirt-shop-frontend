import axios from 'axios';
import constants from './constants';

const productsUrl = `${process.env.REACT_APP_API_URL}/products`;

const CancelToken = axios.CancelToken;
let cancel;

const productState = (status, product) => ({
  type: constants.SET_PRODUCT_STATE,
  status,
  product
});

const fetchProduct = productId => async dispatch => {
  dispatch(
    productState(constants.PRODUCT_FETCHING, {
      product: undefined
    })
  );
  cancel && cancel();
  try {
    const response = await axios.get(`${productsUrl}/${productId}`, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    });
    dispatch(
      productState(constants.PRODUCT_FETCH_SUCCESS, {
        product: response.data,
        productId
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export default { productState, fetchProduct };
