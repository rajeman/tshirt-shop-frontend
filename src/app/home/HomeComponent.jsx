import React from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import './home.css';
import PaginationComponent from '../pagination/PaginationComponent';
import { ItemCard, FilterCard } from '../cards';
import CartContainer from '../cart/CartContainer';
import { Spinner } from '../loaders';
import constants from './constants';

let parentContext;
const defaultPage = 1;
class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    parentContext = this;
    this.state = {
      limit: constants.DEFAULT_PRODUCTS_LIMIT,
      page: defaultPage,
      filter: constants.FILTER_NONE,
      word: '',
      modal: false,
      checkoutButton: true
    };
    this.toggle = this.toggle.bind(this);
    this.updateCheckoutState = this.updateCheckoutState.bind(this);
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    const { filter } = this.state;
    const {
      productsState: { status }
    } = this.props;
    status !== constants.PRODUCTS_FETCH_SUCCESS &&
      fetchProducts(constants.DEFAULT_PRODUCTS_LIMIT, 1, filter);
  }

  setCurrentPage(page) {
    parentContext.setState({ page });
  }

  fetchNewPage(page) {
    const {
      productsState: { products }
    } = parentContext.props;
    const { filter, limit, word } = parentContext.state;
    if (!products[filter][page]) {
      parentContext.props.fetchProducts(limit, page, filter, word);
    }
    parentContext.setCurrentPage(page);
  }

  handleFilter(filter) {
    const {
      productsState: { products }
    } = parentContext.props;
    const { limit } = parentContext.state;
    if (!products[filter]) {
      parentContext.props.fetchProducts(limit, defaultPage, filter);
    }
    parentContext.setState({ filter, page: defaultPage, word: '' });
  }

  handleSearch(filter, word) {
    const { limit } = parentContext.state;
    const { fetchProducts } = parentContext.props;
    fetchProducts(limit, defaultPage, filter, word);
    parentContext.setState({ filter, page: defaultPage, word });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  updateCheckoutState(state) {
    this.setState({
      checkoutButton: state
    });
  }

  render() {
    const {
      productsState: { status, products },
      cartState
    } = this.props;
    const { filter, page, limit, checkoutButton } = this.state;
    const productsAvailable =
      status === constants.PRODUCTS_FETCH_SUCCESS &&
      products[filter] &&
      products[filter][page];
    const productsLoading = status === constants.PRODUCTS_FETCHING;
    const cartAvailable = cartState.status === 'CART_FETCH_SUCCESS';
    return (
      <div>
        <br />
        <Row className="justify-content-center">
          {productsAvailable && (
            <PaginationComponent
              fetchNewPage={this.fetchNewPage}
              page={page}
              limit={limit}
              count={products[filter][page].products.count}
            />
          )}
        </Row>
        <br />
        <div className="home-content">
          {productsLoading && (
            <Row
              sm="12"
              className="h-100 justify-content-center align-items-center"
            >
              <Spinner />
            </Row>
          )}
          <Row>
            <Col sm="3" className="text-center">
              <Col sm="12" className="filter-card-wrapper">
                <FilterCard
                  className="filter-card"
                  handleFilter={this.handleFilter}
                  handleSearch={this.handleSearch}
                  productsAvailable={productsAvailable}
                />
                <Button
                  type="submit"
                  className="h-100 btn-secondary-active b-checkout float-right mr-1"
                  onClick={e => {
                    e.preventDefault();
                    this.toggle();
                    this.setState({
                      checkoutButton: true
                    });
                  }}
                >
                  <span className="color-extra bt-checkout-text">Cart</span>
                </Button>
              </Col>
            </Col>

            <Col sm="9">
              <Col sm="12">
                <Row className="justify-content-start">
                  {productsAvailable &&
                    products[filter][page].products.rows.map(product => (
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
                page={page}
                limit={limit}
                count={products[filter][page].products.count}
                setCurrentPage={this.setCurrentPage}
              />
            )}
          </Row>
          <br />
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Cart Items</ModalHeader>
          <ModalBody>
            <CartContainer updateCheckoutState={this.updateCheckoutState} />
          </ModalBody>
          <ModalFooter>
            {cartAvailable && checkoutButton && (
              <Button
                type="submit"
                className="h-100 btn-secondary-active b-checkout float-right mr-1"
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <span className="color-extra bt-checkout-text">Checkout</span>
              </Button>
            )}
            {cartAvailable && !checkoutButton && (
              <span className="text-danger checkout-warning font-weight-light">
                {' '}
                You have unsaved changes
              </span>
            )}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HomeComponent;
