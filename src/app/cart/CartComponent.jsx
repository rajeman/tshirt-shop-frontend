import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Button, Card, CardBody, CardText, CardImg } from 'reactstrap';
import CartItem from './CartItem';
import constants from './constants';
import orderConstants from '../order/constants';
import { Spinner } from '../loaders';
import DeleteModal from '../modal/ModalComponent';
import PaymentComponent from '../order/PaymentComponent';
import './cart.css';

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: '',
      deleteModal: false,
      itemId: 0,
      emptyCart: false,
      paymentVisible: false
    };
    this.updateCartItem = this.updateCartItem.bind(this);
    this.confirmItemDeletion = this.confirmItemDeletion.bind(this);
    this.modalCloseHandler = this.modalCloseHandler.bind(this);
  }

  componentDidMount() {
    const { fetchCart } = this.props;
    const cartId = localStorage.getItem(constants.CART_ID);
    if (cartId) {
      fetchCart(cartId);
    } else {
      this.setState({
        emptyCart: true
      });
    }
  }

  componentDidUpdate() {
    const {
      cartState: { cart },
      singleOrderState: { paymentStatus },
      paymentState
    } = this.props;
    if (paymentStatus === orderConstants.PAYMENT_PROCESS_SUCCESS) {
      setTimeout(() => {
        paymentState('');
        this.setState({
          paymentVisible: false
        });
        this.props.history.push('/orders');
      }, 5000);
    }
    if (cart && cart.length > 0 && this.state.emptyCart) {
      this.setState({
        emptyCart: false
      });
    }
  }

  updateCartItem(item) {
    const { updateCart } = this.props;
    updateCart(item);
  }

  confirmItemDeletion(itemId) {
    this.setState({
      deleteModal: true,
      itemId
    });
  }

  doDeleteItem() {
    const { deleteCartItem } = this.props;
    deleteCartItem(this.state.itemId);
  }

  modalCloseHandler() {
    const {
      singleOrderState: { singleOrderStatus, paymentStatus }
    } = this.props;
    if (
      singleOrderStatus !== orderConstants.SINGLE_ORDER_FETCHING &&
      paymentStatus !== orderConstants.PAYMENT_PROCESSING
    ) {
      this.setState({
        paymentVisible: false
      });
      this.props.history.push('/orders');
    }
  }

  render() {
    const {
      cartState: { cart, status, createOrderStatus, orderId },
      singleOrderState: { singleOrderStatus, singleOrder, paymentStatus },
      fetchSingleOrder,
      createOrder,
      makePayment,
      paymentState
    } = this.props;
    const cartItemsAvailable = status === constants.CART_FETCH_SUCCESS;
    const cartFetching =
      status === constants.CART_FETCHING || status === constants.CART_UPDATING;
    const emptyCart =
      (cartItemsAvailable && cart.length === 0) || this.state.emptyCart;
    return (
      <div className="container">
        {cartFetching ||
          (createOrderStatus === constants.CREATING_ORDER && (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          ))}
        {emptyCart && (
          <div className="d-flex justify-content-center">
            <Card className="border-0">
              <CardImg
                top
                width="100%"
                src="https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png"
                alt="Empty Cart"
              />
              <CardBody>
                <CardText className="text-center">
                  <span className="cart-empty-text">
                    There are no items in your cart.
                  </span>
                </CardText>
              </CardBody>
            </Card>
          </div>
        )}
        {cartItemsAvailable && cart.length > 0 && (
          <div>
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
                      confirmItemDeletion={this.confirmItemDeletion}
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
                      {cartItemsAvailable &&
                        createOrderStatus !== constants.CREATING_ORDER && (
                          <Button
                            type="submit"
                            className="h-100 btn-secondary-active b-checkout mr-1"
                            onClick={e => {
                              e.preventDefault();
                              this.setState({ paymentVisible: true });
                              createOrder();
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
            {this.state.paymentVisible &&
              createOrderStatus === constants.CREATE_ORDER_SUCCESS && (
                <PaymentComponent
                  fetchSingleOrder={fetchSingleOrder}
                  singleOrderStatus={singleOrderStatus}
                  singleOrder={singleOrder}
                  orderId={orderId}
                  makePayment={makePayment}
                  paymentStatus={paymentStatus}
                  paymentState={paymentState}
                  closeHandler={this.modalCloseHandler}
                />
              )}
            {this.state.deleteModal && (
              <DeleteModal
                payload={{
                  title: 'Delete',
                  body:
                    'Are you sure you want to remove this item from your cart?',
                  cancelText: 'Cancel',
                  executeText: 'Delete',
                  executeFunction: () => {
                    this.doDeleteItem();
                    this.setState({
                      deleteModal: false,
                      itemId: undefined
                    });
                  },
                  cancelFunction: () => {
                    this.setState({
                      deleteModal: false
                    });
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(CartComponent);
