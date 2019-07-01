import { combineReducers } from 'redux';
import homeReducer from './app/home/reducers';
import productReducer from './app/product/reducers';
import cartReducer from './app/cart/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  product: productReducer,
  cart: cartReducer
});

export default rootReducer;
