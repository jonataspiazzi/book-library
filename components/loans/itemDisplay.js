import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import SkeletonIf from '../common/skeletonIf';
import Overlay from '../common/overlay';
import { nc } from "../common/nullConditional";

export default class ItemDisplay extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    data: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      marker: PropTypes.string,
      message: PropTypes.string,
      extendedMessage: PropTypes.string
    }),
    action: PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      func: PropTypes.func
    }),
    skeleton: PropTypes.bool,
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = { extendedMessageOpen: false };
  }

  showDetails() {
    this.setState({ extendedMessageOpen: true });
  }

  hideDetais() {
    this.setState({ extendedMessageOpen: false });
  }

  render() {
    const { color, icon, data: original, action, skeleton, loading  } = this.props;
    const { extendedMessageOpen } = this.state;
    const data = original || {};

    return (
      <div className={`info-box bg-${color}`}>
        <div className="info-box-body">
          <span className="info-box-icon">
            <i className={icon}></i>
          </span>
          <div className="info-box-content">
            <span className="info-box-text">
              <SkeletonIf isSkeleton={skeleton} length={30} text={data.title} />
            </span>
            <div className={`collapsable ${extendedMessageOpen ? 'closed' : ''}`}>
              <span className="info-box-text">
                <SkeletonIf isSkeleton={skeleton} length={18} text={data.subtitle} />
              </span>
              <span className="info-box-number">
                <SkeletonIf isSkeleton={skeleton} length={10} text={data.marker} />
              </span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: '100%' }}></div>
            </div>
            <span className={`progress-description ${extendedMessageOpen ? 'wrap' : ''}`}>
              <SkeletonIf isSkeleton={skeleton} length={10}>
                {data.extendedMessage
                  ? (!extendedMessageOpen
                    ? <Fragment>
                        <span>{data.message}</span>&nbsp;
                        <a href="javascript:" onClick={() => this.showDetails()}>Ver detalhes.</a>
                      </Fragment>
                    : <Fragment>
                        <span>{data.extendedMessage}</span>&nbsp;
                        <a href="javascript:" onClick={() => this.hideDetais()}>Esconder detalhes.</a>
                      </Fragment>)
                  : data.message}
              </SkeletonIf>
            </span>
          </div>
        </div>
        { action
          ? <a href="javascript:" className="info-box-footer" onClick={() => nc(() => action.func())}>
              {action.name} &nbsp;&nbsp;
              <i className={action.icon}></i>
            </a>
          : null}
        <Overlay enabled={loading} />
      </div>
    );
  }
}