import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Spinner } from '../loaders';
import OrderItem from './OrderItem';
import PaymentComponent from './PaymentComponent';
import constants from './constants';
import './order.css';

class OrderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPayment: false
    };
    this.showPaymentComponent = this.showPaymentComponent.bind(this);
    this.modalCloseHandler = this.modalCloseHandler.bind(this);
  }

  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders();
  }

  componentDidUpdate() {
    const {
      order: { paymentStatus },
      paymentState
    } = this.props;
    if (paymentStatus === constants.PAYMENT_PROCESS_SUCCESS) {
      setTimeout(() => {
        paymentState('');
        this.setState({
          showPayment: false
        });
      }, 5000);
    }
  }

  showPaymentComponent(orderId) {
    this.setState({
      showPayment: true,
      orderId
    });
  }

  modalCloseHandler() {
    const {
      order: { singleOrderStatus, paymentStatus }
    } = this.props;
    if (
      singleOrderStatus !== constants.SINGLE_ORDER_FETCHING &&
      paymentStatus !== constants.PAYMENT_PROCESSING
    ) {
      this.setState({
        showPayment: false
      });
    }
  }

  render() {
    const {
      order: { status, order, singleOrderStatus, singleOrder, paymentStatus },
      fetchSingleOrder,
      makePayment,
      paymentState
    } = this.props;
    return (
      <div className="container">
        {status === constants.ORDERS_FETCHING && (
          <div className="text-center">
            <Spinner />
          </div>
        )}
        {status === constants.ORDERS_FETCH_SUCCESS && (
          <div>
            {order && order.length === 0 ? (
              <div className="text-center">
                <img
                  className="empty-order-image mt-5"
                  src={`${
                    process.env.PUBLIC_URL
                  }/images/undraw_empty_order.svg`}
                  alt="empty orders"
                />
                <div className="mt-2">
                  <span>You have not made any order.</span>
                  <Link to="/">
                    <span> Click to start shopping</span>
                  </Link>
                </div>
              </div>
            ) : (
              <Table className="">
                <thead>
                  <tr>
                    <th className="text-center">Order Id</th>
                    <th className="text-center">Created On</th>
                    <th className="text-center">Total Amount</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {status === constants.ORDERS_FETCH_SUCCESS &&
                    order.map(item => {
                      return (
                        <OrderItem
                          key={item.order_id}
                          order={item}
                          showPaymentComponent={this.showPaymentComponent}
                        />
                      );
                    })}
                </tbody>
              </Table>
            )}
          </div>
        )}
        {this.state.showPayment && (
          <PaymentComponent
            fetchSingleOrder={fetchSingleOrder}
            singleOrderStatus={singleOrderStatus}
            singleOrder={singleOrder}
            orderId={this.state.orderId}
            makePayment={makePayment}
            paymentStatus={paymentStatus}
            paymentState={paymentState}
            closeHandler={this.modalCloseHandler}
          />
        )}
      </div>
    );
  }
}

export default OrderComponent;
