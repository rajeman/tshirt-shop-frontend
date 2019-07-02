import React from 'react';
import { Table, Button } from 'reactstrap';
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

  render() {
    const {
      cartState: { cart, status }
    } = this.props;
    const cartItemsAvailable = status === constants.CART_FETCH_SUCCESS;
    const cartFetching =
      status === constants.CART_FETCHING || status === constants.CART_UPDATING;
    return (
      <div class="container">
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
            <tfoot>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>
                  {cartItemsAvailable && (
                    <div className="cart-total text-muted">
                      <span>Total Price:</span>{' '}
                      <span className="color-primary mr-2">
                        $
                        {cart
                          .reduce(
                            (total, product) =>
                              total + Number(product.subtotal),
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>
                  <div
                    colSpan={3}
                    className="d-flex justify-content-end flex-column"
                  >
                    {cartItemsAvailable && (
                      <Button
                        type="submit"
                        className="h-100 btn-secondary-active b-checkout mr-1"
                        onClick={e => {
                          e.preventDefault();
                        }}
                      >
                        <span className="color-extra bt-checkout-text">
                          Checkout
                        </span>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            </tfoot>
          </Table>
        )}
      </div>
    );
  }
}

export default CartComponent;
