import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Skeleton from './skeleton';
import { withRouter } from 'react-router-dom';
import { nc } from './nullConditional';

class Grid extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      prop: PropTypes.string,
      width: PropTypes.number
    })),
    data: PropTypes.arrayOf(PropTypes.object),
    skeleton: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onView: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { columns, data, skeleton, onEdit, onDelete, onView } = this.props;

    return (
      <table className="table table-hover">
        <tbody>
          <tr>
            {columns.map((d, i) =>
              <th key={i} style={{width: (d.width || 0) + '%'}}>{d.title}</th>)}
            <th style={{ width: "98px" }}></th>
          </tr>
          { !skeleton
            ? data.map((d, di) => 
                <tr key={di}>
                  {columns.map((c, ci) =>
                    <td key={ci}>{d[c.prop]}</td>)}
                  <td>
                    <div className="btn-group pull-right" style={{ width: "102px" }}>
                      <button type="button" className="btn btn-sm btn-default" onClick={() => nc(() => onView(d.id))}>
                        <i className="fa fa-eye"></i>
                      </button>
                      <button type="button" className="btn btn-sm btn-default" onClick={() => nc(() => onEdit(d.id))}>
                        <i className="fa fa-edit"></i>
                      </button>
                      <button type="button" className="btn btn-sm btn-default" onClick={() => nc(() => onDelete(d.id))}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>)
            : [1,2,3].map(i =>
                <tr key={i}>
                  {columns.map((c, ci) =>
                    <td key={ci}>
                      <Skeleton type="grid-text" />
                    </td>)}
                  <td>
                    <div className="btn-group pull-right" style={{ width: "100px" }}>
                      <Skeleton type="grid-button" />
                      <Skeleton type="grid-button" />
                      <Skeleton type="grid-button" />
                    </div>
                  </td>
                </tr>)}
        </tbody>
      </table>
    );
  }
}

export default withRouter(Grid);