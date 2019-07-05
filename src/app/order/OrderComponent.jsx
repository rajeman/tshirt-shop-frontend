import React from 'react';
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

  showPaymentComponent(orderId) {
    this.setState({
      showPayment: true,
      orderId
    });
  }

  modalCloseHandler() {
    this.setState({
      showPayment: false
    });
  }

  render() {
    const {
      order: { status, order, singleOrderStatus, singleOrder },
      fetchSingleOrder
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
          </div>
        )}
        {this.state.showPayment && (
          <PaymentComponent
            fetchSingleOrder={fetchSingleOrder}
            singleOrderStatus={singleOrderStatus}
            singleOrder={singleOrder}
            orderId={this.state.orderId}
            closeHandler={this.modalCloseHandler}
          />
        )}
      </div>
    );
  }
}

export default OrderComponent;