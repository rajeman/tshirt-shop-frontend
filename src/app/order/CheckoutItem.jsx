import React from 'react';

class CheckoutItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: ''
    };
  }
  render() {
    const { checkoutItem } = this.props;
    return (
      <tr className="cart-item-row">
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <span className="color-extra">{checkoutItem.product_name}</span>
          </div>
        </td>
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center h-100">
            <span className="p-2 color-extra">
              {checkoutItem.attributes.split('|')[1].replace('_', ': ')}
            </span>
            <span className="p-2 color-extra">
              {checkoutItem.attributes.split('|')[0].replace('_', ': ')}
            </span>
          </div>
        </td>
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <span className="color-extra">{checkoutItem.quantity}</span>
          </div>
        </td>
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <span className="color-extra">${checkoutItem.unit_cost}</span>
          </div>
        </td>
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <span className="color-extra">${checkoutItem.sub_total}</span>
          </div>
        </td>
      </tr>
    );
  }
}

export default CheckoutItem;
