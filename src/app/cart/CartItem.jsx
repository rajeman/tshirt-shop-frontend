import React from 'react';
import { FormGroup, Input } from 'reactstrap';

export default ({ product }) => {
  console.log(`${process.env.PUBLIC_URL}/images/${product.image}`);
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
              className="p-quantity"
              value={product.quantity}
              readOnly
            />
          </FormGroup>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <span className="color-extra"> {product.subtotal}</span>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <i className="fas fa-times" />
        </div>
      </td>
    </tr>
  );
};
