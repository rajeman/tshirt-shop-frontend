import React from 'react';

class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: ''
    };
  }

  render() {
    const { order, showPaymentComponent } = this.props;
    return (
      <tr className="cart-item-row">
        <td className="text-center">
          <div className="color-extra">{order.order_id}</div>
        </td>
        <td className="text-center color-extra">
          {new Date(
            Date.parse(order.created_on.replace('T', ' '))
          ).toDateString()}
        </td>
        <td className="text-center color-extra">${order.total_amount}</td>
        <td className="text-center color-extra">
          {order.status === 0 ? 'Not Paid' : 'Paid'}
        </td>
        <td className="text-center color-extra">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <span>
              <i
                className={`fab fa-cc-stripe ${
                  order.status === 0 ? 'pay-button-active' : ''
                }`}
                onClick={() => {
                  showPaymentComponent(order.order_id);
                }}
              />
            </span>
          </div>
        </td>
      </tr>
    );
  }
}

export default OrderItem;
