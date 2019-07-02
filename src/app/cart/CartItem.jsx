import React from 'react';
import { FormGroup, Input } from 'reactstrap';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      showUpdateButton: false
    };
  }
  render() {
    const { product, updateCartItem } = this.props;
    return (
      <tr className="cart-item-row">
        <td className="text-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/${product.image}`}
            alt="Card Cover"
            className="cart-product-image"
          />
          <div className="mt-2 color-extra">{product.name}</div>
        </td>
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center h-100">
            <span className="p-2 color-extra">{product.attributes}</span>
          </div>
        </td>
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <FormGroup className="mt-4">
              <Input
                type="number"
                name="p-quantity"
                min={1}
                className="p-quantity"
                value={this.state.quantity || product.quantity}
                onChange={e => {
                  const { value } = e.target;
                  this.setState(
                    {
                      quantity: value.replace(/[^0-9]/g, '')
                    },
                    () => {
                      updateCartItem({
                        itemId: product.item_id,
                        quantity: this.state.quantity || 1
                      });
                    }
                  );
                }}
              />
            </FormGroup>
          </div>
        </td>
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <span className="color-extra">
              {' '}
              {this.state.quantity
                ? (this.state.quantity * product.price).toFixed(2)
                : product.subtotal}
            </span>
          </div>
        </td>
        <td className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <span>
              <i className="fas fa-trash" />
            </span>
          </div>
        </td>
      </tr>
    );
  }
}

export default CartItem;
