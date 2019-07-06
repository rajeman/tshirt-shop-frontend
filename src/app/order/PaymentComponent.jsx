import React, { Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { StripeProvider } from 'react-stripe-elements';
import StripeComponent from './StripeComponent';
import CheckoutItem from './CheckoutItem';
import { Spinner } from '../loaders';
import constants from './constants';

class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.toggleModalMethod = this.toggleModalMethod.bind(this);
    this.startPaymentProcess = this.startPaymentProcess.bind(this);
  }

  componentDidMount() {
    const { fetchSingleOrder, orderId } = this.props;
    fetchSingleOrder(orderId);
  }

  toggleModalMethod() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  startPaymentProcess(stripeToken) {
    const { makePayment } = this.props;
    const amount = this.props.singleOrder
      .reduce((total, product) => total + Number(product.sub_total), 0)
      .toFixed(2);
    makePayment(stripeToken, this.props.orderId, amount);
  }

  render() {
    const {
      singleOrder,
      singleOrderStatus,
      closeHandler,
      paymentStatus,
      paymentState
    } = this.props;
    return (
      <div>
        {
          <Modal isOpen={true} className="payment-modal">
            <ModalHeader toggle={this.toggleModalMethod} onClick={closeHandler}>
              <span className="pay-order">Pay Order</span>
            </ModalHeader>
            {
              <ModalBody>
                {paymentStatus === constants.PAYMENT_PROCESS_SUCCESS ? (
                  <div className="text-center">
                    <span className="text-success">
                      Your payment was successful. You will receive an email
                      shortly
                    </span>
                  </div>
                ) : (
                  <Fragment>
                    {singleOrderStatus === constants.SINGLE_ORDER_FETCHING ? (
                      <div className="text-center">
                        <Spinner />
                      </div>
                    ) : (
                      <div>
                        <Table className="">
                          <thead>
                            <tr>
                              <th className="text-center">Name</th>
                              <th className="text-center">Attributes</th>
                              <th className="text-center">Quantity</th>
                              <th className="text-center">Price</th>
                              <th className="text-center">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {singleOrderStatus ===
                              constants.SINGLE_ORDER_FETCH_SUCCESS &&
                              singleOrder.map(checkoutItem => (
                                <CheckoutItem
                                  checkoutItem={checkoutItem}
                                  key={checkoutItem.item_id}
                                />
                              ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="2">
                                {singleOrderStatus ===
                                  constants.SINGLE_ORDER_FETCH_SUCCESS && (
                                  <div className="cart-total text-muted">
                                    <span>Total Price:</span>{' '}
                                    <span className="color-primary mr-2">
                                      $
                                      {singleOrder
                                        .reduce(
                                          (total, product) =>
                                            total + Number(product.sub_total),
                                          0
                                        )
                                        .toFixed(2)}
                                    </span>
                                  </div>
                                )}
                              </td>
                            </tr>
                          </tfoot>
                        </Table>
                        <div
                          colSpan="5"
                          className="d-flex justify-content-end flex-column"
                        >
                          {singleOrderStatus ===
                            constants.SINGLE_ORDER_FETCH_SUCCESS && (
                            <StripeProvider
                              apiKey={process.env.REACT_APP_STRIPE_API_KEY}
                            >
                              <StripeComponent
                                paymentStatus={paymentStatus}
                                paymentState={paymentState}
                                startPaymentProcess={this.startPaymentProcess}
                              />
                            </StripeProvider>
                          )}
                        </div>
                      </div>
                    )}
                  </Fragment>
                )}
              </ModalBody>
            }
          </Modal>
        }
      </div>
    );
  }
}

export default PaymentComponent;
