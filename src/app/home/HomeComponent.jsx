import React from 'react';
import { Row, Col } from 'reactstrap';
import './home.css';
import NavbarComponent from '../navbar/NavbarComponent';
import PaginationComponent from '../pagination/PaginationComponent';
import { ItemCard, FilterCard } from '../cards';

function HomeComponent() {
  return (
    <div>
      <NavbarComponent />
      <br />
      <Row className="justify-content-center">
        <PaginationComponent />
      </Row>
      <br />
      <div className="home-content">
        <Row>
          <Col sm="3" className="text-center">
            <Col sm="12" className="filter-card-wrapper">
              <FilterCard className="filter-card" />
            </Col>
          </Col>
          <Col sm="9" className="d-inline">
            <Col sm="12">
              <Row className="justify-content-center">
                <Col md="4" sm="6" className="justify-content-center">
                  <ItemCard />
                </Col>
                <Col md="4" sm="6" className="justify-content-center">
                  <ItemCard />
                </Col>
                <Col md="4" sm="6" className="justify-content-center">
                  <ItemCard />
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
        <br />
        <Row className="justify-content-center">
          <PaginationComponent />
        </Row>
        <br />
      </div>
    </div>
  );
}

export default HomeComponent;
