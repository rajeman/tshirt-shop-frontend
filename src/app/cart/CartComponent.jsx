import React from 'react';
import { Table } from 'reactstrap';
import CartItem from './CartItem';
import constants from './constants';
import { Spinner } from '../loaders';
import './cart.css';

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: ''
    };
    this.updateCartItem = this.updateCartItem.bind(this);
    this.invalidateCheckout = this.invalidateCheckout.bind(this);
    this.props.updateCheckoutState(true);
  }

  componentDidMount() {
    const { fetchCart } = this.props;
    const cartId = localStorage.getItem(constants.CART_ID);
    if (cartId) {
      fetchCart(cartId);
    }
  }

  updateCartItem(item) {
    const { updateCart } = this.props;
    updateCart(item);
  }

  invalidateCheckout() {
    this.setState({
      totalPrice: ' '
    });
    this.props.updateCheckoutState(false);
  }

  render() {
    const {
      cartState: { cart, status }
    } = this.props;
    const cartItemsAvailable = status === constants.CART_FETCH_SUCCESS;
    const cartFetching =
      status === constants.CART_FETCHING || status === constants.CART_UPDATING;
    return (
      <div>
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
                return (
                  <CartItem
                    product={product}
                    key={product.item_id}
                    updateCartItem={this.updateCartItem}
                    invalidateCheckout={this.invalidateCheckout}
                  />
                );
              })}
            </tbody>
          </Table>
        )}
        {cartItemsAvailable && (
          <div className="cart-total float-right text-muted">
            <span>Total Price:</span>{' '}
            <span className="color-primary">
              $
              {this.state.totalPrice ||
                cart.reduce(
                  (total, product) => total + Number(product.subtotal),
                  0
                )}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default CartComponent;
