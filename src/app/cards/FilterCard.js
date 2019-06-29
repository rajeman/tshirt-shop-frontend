import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import constants from '../home/constants';

let parentContext;
export default class FilterCard extends React.Component {
  constructor(props) {
    super(props);
    parentContext = this;
    this.state = {
      filter: constants.FILTER_NONE,
      subFilter: constants.FILTER_NONE,
      word: ''
    };
  }

  updateFilterData(filter) {
    const {
      props: { handleFilter }
    } = parentContext;
    handleFilter(filter);
    parentContext.setState({
      filter,
      word: ''
    });
  }

  updateSubFilterData(subFilter) {
    const {
      props: { handleFilter },
      state: { filter }
    } = parentContext;
    if (subFilter === constants.FILTER_NONE) {
      handleFilter(filter);
    } else {
      handleFilter(subFilter);
    }
    parentContext.setState({
      subFilter,
      word: ''
    });
  }

  render() {
    const { filter, subFilter } = this.state;
    const { handleSearch } = this.props;
    return (
      <Form>
        <FormGroup>
          <Input
            type="search"
            name="search"
            placeholder="Search"
            value={this.state.word}
            onChange={e => {
              const { value } = e.target;
              this.setState(
                {
                  filter: constants.FILTER_NONE,
                  subFilter: constants.FILTER_NONE,
                  word: value
                },
                () => {
                  handleSearch(constants.FILTER_SEARCH, this.state.word);
                }
              );
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Department">
            <span className="color-extra font-weight-bold">Department</span>
          </Label>
        </FormGroup>
        <FormGroup>
          <Button
            className={`w-100 ${
              filter === constants.FILTER_DEPARTMENT_REGIONAL
                ? 'btn-secondary-active'
                : ''
            }`}
            onClick={e => {
              e.preventDefault();
              const currentFilter =
                filter === constants.FILTER_DEPARTMENT_REGIONAL
                  ? constants.FILTER_NONE
                  : constants.FILTER_DEPARTMENT_REGIONAL;
              this.updateFilterData(currentFilter);
            }}
          >
            <span className="color-extra">REGIONAL</span>
          </Button>
        </FormGroup>
        <FormGroup>
          <Button
            className={`w-100 ${
              filter === constants.FILTER_DEPARTMENT_NATURE
                ? 'btn-secondary-active'
                : ''
            }`}
            onClick={e => {
              e.preventDefault();
              const currentFilter =
                filter === constants.FILTER_DEPARTMENT_NATURE
                  ? constants.FILTER_NONE
                  : constants.FILTER_DEPARTMENT_NATURE;
              this.updateFilterData(currentFilter);
            }}
          >
            <span className="color-extra">NATURE</span>
          </Button>
        </FormGroup>

        <FormGroup>
          <Button
            className={`w-100 ${
              filter === constants.FILTER_DEPARTMENT_SEASONAL
                ? 'btn-secondary-active'
                : ''
            }`}
            onClick={e => {
              e.preventDefault();
              const currentFilter =
                filter === constants.FILTER_DEPARTMENT_SEASONAL
                  ? constants.FILTER_NONE
                  : constants.FILTER_DEPARTMENT_SEASONAL;
              this.updateFilterData(currentFilter);
            }}
          >
            <span className="color-extra">SEASONAL</span>
          </Button>
        </FormGroup>

        {filter.includes(constants.DEPARTMENT) && (
          <FormGroup className="mt-5">
            <Label for="Category">
              <span className="color-extra font-weight-bold">Category</span>
            </Label>
          </FormGroup>
        )}
        {filter === constants.FILTER_DEPARTMENT_REGIONAL && (
          <Fragment>
            <FormGroup>
              <Button
                className={`w-100 ${
                  subFilter === constants.FILTER_CATEGORY_FRENCH
                    ? 'btn-secondary-active'
                    : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  const currentSubFilter =
                    subFilter === constants.FILTER_CATEGORY_FRENCH
                      ? constants.FILTER_NONE
                      : constants.FILTER_CATEGORY_FRENCH;
                  this.updateSubFilterData(currentSubFilter);
                }}
              >
                <span className="color-extra">FRENCH</span>
              </Button>
            </FormGroup>
            <FormGroup>
              <Button
                className={`w-100 ${
                  subFilter === constants.FILTER_CATEGORY_ITALIAN
                    ? 'btn-secondary-active'
                    : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  const currentSubFilter =
                    subFilter === constants.FILTER_CATEGORY_ITALIAN
                      ? constants.FILTER_NONE
                      : constants.FILTER_CATEGORY_ITALIAN;
                  this.updateSubFilterData(currentSubFilter);
                }}
              >
                <span className="color-extra">ITALIAN</span>
              </Button>
            </FormGroup>
            <FormGroup>
              <Button
                className={`w-100 ${
                  subFilter === constants.FILTER_CATEGORY_IRISH
                    ? 'btn-secondary-active'
                    : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  const currentSubFilter =
                    subFilter === constants.FILTER_CATEGORY_IRISH
                      ? constants.FILTER_NONE
                      : constants.FILTER_CATEGORY_IRISH;
                  this.updateSubFilterData(currentSubFilter);
                }}
              >
                <span className="color-extra">IRISH</span>
              </Button>
            </FormGroup>
          </Fragment>
        )}

        {filter === constants.FILTER_DEPARTMENT_NATURE && (
          <Fragment>
            <FormGroup>
              <Button
                className={`w-100 ${
                  subFilter === constants.FILTER_CATEGORY_ANIMAL
                    ? 'btn-secondary-active'
                    : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  const currentSubFilter =
                    subFilter === constants.FILTER_CATEGORY_ANIMAL
                      ? constants.FILTER_NONE
                      : constants.FILTER_CATEGORY_ANIMAL;
                  this.updateSubFilterData(currentSubFilter);
                }}
              >
                <span className="color-extra">ANIMAL</span>
              </Button>
            </FormGroup>
            <FormGroup>
              <Button
                className={`w-100 ${
                  subFilter === constants.FILTER_CATEGORY_FLOWER
                    ? 'btn-secondary-active'
                    : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  const currentSubFilter =
                    subFilter === constants.FILTER_CATEGORY_FLOWER
                      ? constants.FILTER_NONE
                      : constants.FILTER_CATEGORY_FLOWER;
                  this.updateSubFilterData(currentSubFilter);
                }}
              >
                <span className="color-extra">FLOWER</span>
              </Button>
            </FormGroup>
          </Fragment>
        )}

        {filter === constants.FILTER_DEPARTMENT_SEASONAL && (
          <Fragment>
            <FormGroup>
              <Button
                className={`w-100 ${
                  subFilter === constants.FILTER_CATEGORY_CHRISTMAS
                    ? 'btn-secondary-active'
                    : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  const currentSubFilter =
                    subFilter === constants.FILTER_CATEGORY_CHRISTMAS
                      ? constants.FILTER_NONE
                      : constants.FILTER_CATEGORY_CHRISTMAS;
                  this.updateSubFilterData(currentSubFilter);
                }}
              >
                <span className="color-extra">CHRISTMAS</span>
              </Button>
            </FormGroup>
            <FormGroup>
              <Button
                className={`w-100 ${
                  subFilter === constants.FILTER_CATEGORY_VALENTINE
                    ? 'btn-secondary-active'
                    : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  const currentSubFilter =
                    subFilter === constants.FILTER_CATEGORY_VALENTINE
                      ? constants.FILTER_NONE
                      : constants.FILTER_CATEGORY_VALENTINE;
                  this.updateSubFilterData(currentSubFilter);
                }}
              >
                <span className="color-extra">VALENTINE</span>
              </Button>
            </FormGroup>
          </Fragment>
        )}
      </Form>
    );
  }
}
