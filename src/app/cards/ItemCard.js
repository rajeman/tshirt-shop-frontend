import React from 'react';

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import './cards.css';

const ItemCard = () => {
  return (
    <div>
      <Card className="p-4 mb-5">
        {' '}
        <CardImg
          top
          width="60%"
          src="https://source.unsplash.com/random/302x200"
          alt="Card image cap"
        />{' '}
        <CardBody className="text-center">
          {' '}
          <CardTitle className="text-muted font-weight-bold">
            {' '}
            Holly Cat{' '}
          </CardTitle>{' '}
          <CardSubtitle className="color-primary font-weight-bold">
            {' '}
            $15.99{' '}
          </CardSubtitle>{' '}
        </CardBody>{' '}
      </Card>{' '}
    </div>
  );
};

export default ItemCard;
