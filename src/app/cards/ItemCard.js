import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import './cards.css';

const ItemCard = ({ product }) => {
  return (
    <div>
      <Link to={`/${product.product_id}`} className="product-link">
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

            <CardSubtitle className="color-primary font-weight-bold">
              ${product.price}
            </CardSubtitle>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default ItemCard;
