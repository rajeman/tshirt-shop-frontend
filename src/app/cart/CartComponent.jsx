import React from 'react';
import { Table } from 'reactstrap';
import CartItem from './CartItem';
import constants from './constants';
import { Spinner } from '../loaders';
import './cart.css';

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.totalPrice = 0;
    const { fetchCart } = this.props;
    fetchCart('5kzj31xgujxkfimpo');
  }

  render() {
    const {
      cartState: { cart, status }
    } = this.props;
    const cartItemsAvailable = status === constants.CART_FETCH_SUCCESS;
    const cartFetching = status === constants.CART_FETCHING;
    return (
      <div cla>
        {cartFetching && (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        )}
        {cartItemsAvailable && (
          <Table className="">
            <thead>
              <tr>
                <th className="text-center">Item</th>
                <th className="text-center">Options</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(product => {
                this.totalPrice =
                  this.totalPrice + parseFloat(product.subtotal);
                return <CartItem product={product} key={product.product_id} />;
              })}
            </tbody>
          </Table>
        )}
        {cartItemsAvailable && (
          <div className="cart-total float-right text-muted">
            <span>Total Price:</span>{' '}
            <span className="color-primary">${this.totalPrice.toFixed(2)}</span>
          </div>
        )}
      </div>
    );
  }
}

export default CartComponent;
