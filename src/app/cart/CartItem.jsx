import React from 'react';
import { FormGroup, Input } from 'reactstrap';

export default () => {
  return (
    <tr className="cart-item-row">
      <td className="text-center">
        <img
          top
          src={`${process.env.PUBLIC_URL}/images/alsace-2.gif`}
          alt="Card Cover"
          className="cart-product-image"
        />
        <div className="mt-2 color-extra">Gallic Cock</div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column justify-content-center h-100">
          <span className="p-2 color-extra">Size: S</span>
          <span className="p-2 color-extra">Color: White</span>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <FormGroup className="mt-4">
            <Input type="number" name="p-quantity" className="p-quantity" />
          </FormGroup>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <span className="color-extra"> $18</span>
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
