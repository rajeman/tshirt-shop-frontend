import React from 'react';
import { Table, Button } from 'reactstrap';
import CartItem from './CartItem';
import './cart.css';

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CartComponent;
