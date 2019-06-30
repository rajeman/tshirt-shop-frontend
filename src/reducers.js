import { combineReducers } from 'redux';
import homeReducer from './app/home/reducers';
import productReducer from './app/product/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  product: productReducer
});

export default rootReducer;
