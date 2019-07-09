import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import constants from './constants';

class ProductAttributes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: constants.SIZE_M,
      color: constants.COLOR_RED,
      quantity: 1
    };
  }

  render() {
    const { size, color } = this.state;
    const { addToCart, cartAdding } = this.props;
    return (
      <Form>
        <FormGroup>
          <Label for="Quantity">
            <span className="color-extra font-weight-bold">Quantity</span>
          </Label>
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            min={1}
            max={1000000}
            value={this.state.quantity}
            onChange={e => {
              const { value } = e.target;
              this.setState({
                quantity: value.replace(/[^0-9]/g, '') || 1
              });
            }}
            name="p-quantity"
            className="p-quantity"
          />
        </FormGroup>

        <FormGroup className="mt-3">
          <Label for="Size">
            <span className="color-extra font-weight-bold">Size</span>
          </Label>
        </FormGroup>
        <div className="d-flex flex-wrap row-hl justify-content-between">
          <FormGroup check inline className="p-size item-hl mb-3">
            <Button
              className={`w-100 ${
                size === constants.SIZE_S ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ size: constants.SIZE_S });
              }}
            >
              <span className="color-extra">S</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="p-size item-hl mb-3">
            <Button
              className={`w-100 ${
                size === constants.SIZE_M ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ size: constants.SIZE_M });
              }}
            >
              <span className="color-extra">M</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="p-size item-hl mb-3">
            <Button
              className={`w-100 ${
                size === constants.SIZE_L ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ size: constants.SIZE_L });
              }}
            >
              <span className="color-extra">L</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="p-size item-hl mb-3">
            <Button
              className={`w-100 ${
                size === constants.SIZE_XL ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ size: constants.SIZE_XL });
              }}
            >
              <span className="color-extra">XL</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="p-size item-hl mb-3">
            <Button
              className={`w-100 ${
                size === constants.SIZE_XXL ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ size: constants.SIZE_XXL });
              }}
            >
              <span className="color-extra">XXL</span>
            </Button>
          </FormGroup>
        </div>

        <FormGroup className="mt-2">
          <Label for="Size">
            <span className="color-extra font-weight-bold">Color</span>
          </Label>
        </FormGroup>
        <div className="d-flex flex-wrap row-hl justify-content-between">
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_WHITE ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_WHITE });
              }}
            >
              <span className="color-extra">WHITE</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_BLACK ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_BLACK });
              }}
            >
              <span className="color-extra">BLACK</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_RED ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_RED });
              }}
            >
              <span className="color-extra">RED</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_ORANGE ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_ORANGE });
              }}
            >
              <span className="color-extra">ORANGE</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_YELLOW ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_YELLOW });
              }}
            >
              <span className="color-extra">YELLOW</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_GREEN ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_GREEN });
              }}
            >
              <span className="color-extra">GREEN</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_BLUE ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_BLUE });
              }}
            >
              <span className="color-extra">BLUE</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_INDIGO ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_INDIGO });
              }}
            >
              <span className="color-extra">INDIGO</span>
            </Button>
          </FormGroup>
          <FormGroup check inline className="item-hl mb-3">
            <Button
              className={`w-100 ${
                color === constants.COLOR_PURPLE ? 'btn-secondary-active' : ''
              }`}
              onClick={e => {
                e.preventDefault();
                this.setState({ color: constants.COLOR_PURPLE });
              }}
            >
              <span className="color-extra">PURPLE</span>
            </Button>
          </FormGroup>
        </div>
        <br />
        <div>
          <FormGroup check inline className="f-button-checkout">
            <Button
              disabled={cartAdding}
              type="submit"
              className="h-100 btn-secondary-active b-checkout"
              onClick={e => {
                e.preventDefault();
                const { color, size } = this.state;
                const attributes = `${color}|${size}`;
                addToCart(attributes, this.state.quantity);
              }}
            >
              <span className="color-extra bt-checkout-text">Add to cart</span>
            </Button>
          </FormGroup>
        </div>
      </Form>
    );
  }
}

export default ProductAttributes;
