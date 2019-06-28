import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import constants from '../home/constants';
import './pagination.css';

const defaultLimit = constants.DEFAULT_PRODUCTS_LIMIT;
export default class PaginationComponent extends React.Component {
  render() {
    const { fetchNewPage, page, limit, count } = this.props;
    return (
      <Pagination aria-label="Page navigation" className="pagination-parent">
        <PaginationItem
          className={page === 1 ? 'invisible' : ''}
          onClick={() => {
            fetchNewPage(1);
          }}
        >
          <PaginationLink first />
        </PaginationItem>

        {page - 1 > 0 && (
          <PaginationItem
            onClick={() => {
              fetchNewPage(page - 1);
            }}
          >
            <PaginationLink previous />
          </PaginationItem>
        )}
        {page - 2 > 0 && (
          <PaginationItem
            onClick={() => {
              fetchNewPage(page - 2);
            }}
          >
            <PaginationLink>{page - 2}</PaginationLink>
          </PaginationItem>
        )}
        {page - 1 > 0 && (
          <PaginationItem
            onClick={() => {
              fetchNewPage(page - 1);
            }}
          >
            <PaginationLink>{page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink className="pagination-active">{page}</PaginationLink>
        </PaginationItem>
        {page * limit < count && (
          <PaginationItem
            onClick={() => {
              fetchNewPage(page + 1);
            }}
          >
            <PaginationLink>{page + 1}</PaginationLink>
          </PaginationItem>
        )}
        {(page + 1) * limit < count && (
          <PaginationItem
            onClick={() => {
              fetchNewPage(page + 2);
            }}
          >
            <PaginationLink>{page + 2}</PaginationLink>
          </PaginationItem>
        )}
        {page * limit < count && (
          <PaginationItem
            onClick={() => {
              fetchNewPage(page + 1);
            }}
          >
            <PaginationLink next />
          </PaginationItem>
        )}
        <PaginationItem
          className={page * limit >= count ? 'invisible' : ''}
          onClick={() => {
            const lastPage = Math.ceil(count / defaultLimit);
            fetchNewPage(lastPage);
          }}
        >
          <PaginationLink last />
        </PaginationItem>
      </Pagination>
    );
  }
}
