import { combineReducers } from 'redux';
import homeReducer from './app/home/reducers';
import productReducer from './app/product/reducers';
import cartReducer from './app/cart/reducers';
import authReducer from './app/auth/reducers';
import orderReducer from './app/order/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer
});

export default rootReducer;
