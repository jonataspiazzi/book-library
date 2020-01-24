import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gridPageSize, gridMaxPaginationControl } from '../../../config';
import { nc } from '../nullConditional';

export default class CmsDataListPagination extends Component {
  static propTypes = {
    pagination: PropTypes.shape({
      skip: PropTypes.number,
      limit: PropTypes.number,
      count: PropTypes.number
    }),
    onPageChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      pageCount: 0,
      pages: []
    };
  }

  static getDerivedStateFromProps(props) {
    return CmsDataListPagination.getPaginationData(props, gridMaxPaginationControl);
  }

  static getPaginationData(props, maxDisplayLength) {
    const { skip: pSkip, limit: pLimit, count: pCount } = props.pagination;
    const skip = Number(pSkip);
    const limit = Number(pLimit);
    const count = Number(pCount);

    const pageCount = Math.ceil(count / limit);
    const currentPage = Math.trunc(skip / limit);

    if (pageCount <= maxDisplayLength) {
      return { currentPage, pageCount, pages: CmsDataListPagination.getPages(0, pageCount) };
    }

    const center = maxDisplayLength % 2 ? Math.trunc(maxDisplayLength / 2) : (maxDisplayLength / 2 - 1);
    const displayLength = maxDisplayLength;

    if (currentPage <= center) {
      return { currentPage, pageCount, pages: CmsDataListPagination.getPages(0, displayLength) };
    }

    const rightSideCount = Math.trunc(maxDisplayLength / 2) + 1;
    let firstPage = 0;

    if (currentPage >= pageCount - rightSideCount) {
      firstPage = pageCount - maxDisplayLength;
      return { currentPage, pageCount, pages: CmsDataListPagination.getPages(firstPage, displayLength) };
    }

    firstPage = currentPage - center;
    
    return { currentPage, pageCount, pages: CmsDataListPagination.getPages(firstPage, displayLength) };
  }

  static getPages(firstPage, displayLength) {
    const pages = [];

    let currentPage = firstPage;
    for (let i = 0; i < displayLength; i++) {
      pages.push(currentPage);
      currentPage++;
    }

    return pages;
  }

  render() {
    const { pagination, onPageChange } = this.props;
    const { limit } = pagination;
    const { currentPage, pageCount, pages } = this.state;

    return (pageCount < 2 ? null :
      <div className="box-footer">
        <ul className="pagination pagination-sm no-margin pull-right">
          <li><a href="javascript:" onClick={() => nc(() => onPageChange(0, limit))}>«</a></li>
          { pages.map(p =>
              <li key={p} className={p === currentPage ? 'active' : ''}>
                <a href="javascript:" onClick={() => nc(() => onPageChange(p * limit, limit))}>{p + 1}</a>
              </li>)}
          <li><a href="javascript:" onClick={() => nc(() => onPageChange((pageCount - 1) * limit, limit))}>»</a></li>
        </ul>
      </div>
    );
  }
}