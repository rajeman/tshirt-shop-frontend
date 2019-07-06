import React from 'react';
import { Row, Col } from 'reactstrap';
import ProductAttributes from './ProductAttributes';
import { Spinner } from '../loaders';
import './product.css';
import constants from './constants';

class ProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage: ''
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const {
      fetchProduct,
      match: {
        params: { productId }
      },
      productState: { product }
    } = this.props;
    if (!product[productId]) {
      fetchProduct(productId);
    }
    this.forceUpdate();
  }

  addToCart(attributes) {
    const {
      match: {
        params: { productId }
      },
      addToCart
    } = this.props;
    addToCart({ attributes, productId });
  }

  render() {
    const {
      productState: { product, status },
      match: {
        params: { productId }
      },
      cartState
    } = this.props;
    const { productImage } = this.state;
    const productAvailable =
      status === constants.PRODUCT_FETCH_SUCCESS && product[productId];
    const productLoading = status === constants.PRODUCT_FETCHING;
    const cartAdding = cartState.status === 'CART_ADDING';
    return (
      <div>
        <div className="product-content m-0">
          {productLoading && (
            <Row
              sm="12"
              className="h-100 justify-content-center align-items-center"
            >
              <Spinner />
            </Row>
          )}
          {productAvailable && (
            <Row className="m-2 border p-4 bg-white">
              <Col sm="4" className="text-center">
                <img
                  className="px-4 py-3 border p-img mb-3"
                  src={`${process.env.PUBLIC_URL}/images/${productImage ||
                    product[productId].image}`}
                  alt="Product"
                />
                <div className="d-flex flex-wrap row-hl mb-5 thumbnail-cont">
                  <img
                    className="border thumbnail-image mr-4"
                    src={`${process.env.PUBLIC_URL}/images/${
                      product[productId].image
                    }`}
                    alt="Product"
                    onClick={() => {
                      this.setState({
                        productImage: product[productId].image
                      });
                    }}
                  />
                  <img
                    className="border thumbnail-image"
                    src={`${process.env.PUBLIC_URL}/images/${
                      product[productId].image_2
                    }`}
                    alt="Product"
                    onClick={() => {
                      this.setState({
                        productImage: product[productId].image_2
                      });
                    }}
                  />
                </div>
              </Col>
              <Col sm="8" className="justify-content-start">
                <div className="p-header font-weight-light color-extra mb-3">
                  Home &#x2F; {product[productId].name}
                </div>
                <div className="p-name font-weight-bold">
                  {product[productId].name}
                </div>
                <p />
                <div className="p-price mb-3">
                  <span className="p-price-actual color-primary font-weight-bold">
                    $
                    {product[productId].discounted_price === '0.00'
                      ? product[productId].price
                      : product[productId].discounted_price}{' '}
                  </span>
                  <span className="p-price-old color-extra">
                    {product[productId].discounted_price !== '0.00' && (
                      <span>
                        $<s>{product[productId].price}</s>
                      </span>
                    )}
                  </span>
                </div>
                <div className="p-description color-extra">
                  {product[productId].description}
                </div>
                <br />
                <ProductAttributes
                  addToCart={this.addToCart}
                  cartAdding={cartAdding}
                />
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

export default ProductComponent;
