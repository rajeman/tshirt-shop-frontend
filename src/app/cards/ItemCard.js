import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import './cards.css';

const ItemCard = ({ product }) => {
  return (
    <div>
      <Link to={`/products/${product.product_id}`} className="product-link">
        <Card className="p-4 mb-5">
          <CardImg
            top
            width="60%"
            src={`${process.env.PUBLIC_URL}/images/${product.thumbnail.replace(
              '-thumbnail',
              ''
            )}`}
            alt="Card image cap"
          />
          <CardBody className="text-center">
            <CardTitle className="text-muted font-weight-bold">
              {product.name}
            </CardTitle>

            <CardSubtitle>
              <div className="p-price mb-3">
                <span className="p-price-actual color-primary font-weight-bold">
                  $
                  {product.discounted_price === '0.00'
                    ? product.price
                    : (
                        parseFloat(product.price) -
                        parseFloat(product.discounted_price)
                      ).toFixed(2)}{' '}
                </span>
                <span className="p-price-old color-extra">
                  {product.discounted_price !== '0.00' && (
                    <span>
                      $<s>{product.discounted_price}</s>
                    </span>
                  )}
                </span>
              </div>
            </CardSubtitle>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default ItemCard;
