import React from 'react';
import { Row, Col } from 'reactstrap';
import './home.css';
import NavbarComponent from '../navbar/NavbarComponent';
import PaginationComponent from '../pagination/PaginationComponent';
import { ItemCard, FilterCard } from '../cards';
import { Spinner } from '../loaders';
import constants from './constants';

let parentContext;
class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    parentContext = this;
    this.state = {
      limit: constants.DEFAULT_PRODUCTS_LIMIT,
      page: 1
    };
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts(constants.DEFAULT_PRODUCTS_LIMIT, 1);
  }

  setCurrentPage(page) {
    parentContext.setState({ page });
  }

  fetchNewPage(page) {
    const {
      productsState: { products }
    } = parentContext.props;
    if (products[page]) {
      parentContext.setCurrentPage(page);
    } else {
      parentContext.props.fetchProducts(parentContext.state.limit, page);
      parentContext.setCurrentPage(page);
    }
  }

  render() {
    const {
      productsState: { status, products }
    } = this.props;
    const productsAvailable = status === constants.PRODUCTS_FETCH_SUCCESS;
    const productsLoading = status === constants.PRODUCTS_FETCHING;
    return (
      <div>
        <NavbarComponent />
        <br />
        <Row className="justify-content-center">
          {productsAvailable && (
            <PaginationComponent
              fetchNewPage={this.fetchNewPage}
              page={this.state.page}
              limit={this.state.limit}
              count={products[this.state.page].products.count}
            />
          )}
        </Row>
        <br />
        <div className="home-content">
          <Row>
            <Col sm="3" className="text-center">
              <Col sm="12" className="filter-card-wrapper">
                <FilterCard className="filter-card" />
              </Col>
            </Col>
            <Col sm="9">
              {productsLoading && (
                <Row
                  sm="12"
                  className="h-100 justify-content-center align-items-center"
                >
                  <Spinner />
                </Row>
              )}
              <Col sm="12">
                <Row className="justify-content-start">
                  {productsAvailable &&
                    products[this.state.page].products.rows.map(product => (
                      <Col
                        md="4"
                        sm="6"
                        className="justify-content-center"
                        key={product.product_id}
                      >
                        <ItemCard product={product} />
                      </Col>
                    ))}
                </Row>
              </Col>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-center">
            {productsAvailable && (
              <PaginationComponent
                fetchNewPage={this.fetchNewPage}
                page={this.state.page}
                limit={this.state.limit}
                count={products[this.state.page].products.count}
                setCurrentPage={this.setCurrentPage}
              />
            )}
          </Row>
          <br />
        </div>
      </div>
    );
  }
}

export default HomeComponent;
