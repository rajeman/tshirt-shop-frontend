import React from 'react';
import { Modal, ModalHeader, ModalBody, Table, Button } from 'reactstrap';
import CheckoutItem from './CheckoutItem';
import { Spinner } from '../loaders';
import constants from './constants';

class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.toggleModalMethod = this.toggleModalMethod.bind(this);
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

  render() {
    const { singleOrder, singleOrderStatus, closeHandler } = this.props;
    return (
      <div>
        <Modal isOpen={true} className="payment-modal">
          <ModalHeader toggle={this.toggleModalMethod} onClick={closeHandler}>
            <span className="pay-order">Pay Order</span>
          </ModalHeader>
          <ModalBody>
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
                      <td />
                      <td />
                      <td />
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
                          {singleOrderStatus ===
                            constants.SINGLE_ORDER_FETCH_SUCCESS && (
                            <Button
                              type="submit"
                              className="h-100 btn-secondary-active b-checkout mr-1"
                              onClick={e => {
                                e.preventDefault();
                              }}
                            >
                              <span className="color-extra bt-checkout-text">
                                Pay
                              </span>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PaymentComponent;
