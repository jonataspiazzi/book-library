import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Skeleton from './skeleton';

export default class SkeletonIf extends Component {
  static propTypes = {
    isSkeleton: PropTypes.bool,
    length: PropTypes.number,
    text: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { isSkeleton, length, text, children } = this.props;

    return (isSkeleton
      ? <Skeleton type="text" text={''.padEnd(length, '-')} />
      : text || children
    );
  }
}
