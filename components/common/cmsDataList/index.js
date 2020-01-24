import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../grid';
import CmsDataListPagination from './pagination';
import { withRouter } from 'react-router-dom';
import { safeFetch } from '../safeFetch';
import { gridPageSize } from '../../../config';

class CmsDataList extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    searchPlaceholder: PropTypes.string,
    url: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      prop: PropTypes.string,
      width: PropTypes.number
    }))
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      search: '',
      pagination: { skip: 0, limit: 0, count: 0 },
      skeleton: true,
      pagination: {
        skip: 0,
        limit: gridPageSize,
        count: 0
      }
    };

    this.searchDelayTimeout = 0;
  }

  componentDidMount() {
    const { search, pagination } = this.state;

    this.loadData(search, pagination.skip, pagination.limit);
  }

  componentWillUnmount() {
    if (this.searchDelayTimeout) clearTimeout(this.searchDelayTimeout);
  }

  async loadData(currentSearch, currentSkip, currentLimit) {
    this.setState({ skeleton: true });

    const querystring = `search=${currentSearch}&skip=${currentSkip}&limit=${currentLimit}`;
    const ret = await safeFetch(`${this.props.url}?${querystring}`);
    const { skip, count, data } = ret;

    this.setState({
      data,
      pagination: { skip, limit: gridPageSize, count },
      skeleton: false
    });
  }

  onCreate() {
    this.props.history.push(`${this.props.match.path}/new`);
  }

  onView(id) {
    this.props.history.push(`${this.props.match.path}/${id}/show`);
  }

  onEdit(id) {
    this.props.history.push(`${this.props.match.path}/${id}`);
  }

  async onDelete(id) {
    const uri = `${this.props.url}/${id}`;
    const req = { method: 'DELETE' };

    this.setState({ skeleton: true });

    await safeFetch(uri, req);

    const { search, pagination } = this.state;

    this.loadData(search, pagination.skip, pagination.limit);
  }

  onPageChange(newSkip, newLimit) {
    const { search } = this.state;

    this.loadData(search, newSkip, newLimit);
  }

  onSearch() {
    if (this.searchDelayTimeout) {
      clearTimeout(this.searchDelayTimeout);
    }

    const { search, pagination } = this.state;

    this.loadData(search, pagination.skip, pagination.limit);
  }

  onSearchChange(event) {
    const search = event.target.value;

    this.setState({ search });

    if (this.searchDelayTimeout) {
      clearTimeout(this.searchDelayTimeout);
    }

    this.searchDelayTimeout = setTimeout(() => {
      this.searchDelayTimeout = 0;
      
      const { pagination } = this.state;

      this.loadData(search, pagination.skip, pagination.limit);
    }, 700);
  }

  render() {
    const { name, columns, searchPlaceholder } = this.props;
    const { data, search, pagination, skeleton } = this.state;

    return (
      <div className="box">
        <div className="box-header-table">
          <div className="box-tools-left">
            <div className="input-group input-group-sm" >
              <input 
                type="text" className="form-control" value={search} 
                placeholder={searchPlaceholder}
                onChange={s => this.onSearchChange(s)} />
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" onClick={() => this.onSearch()}>
                  <i className="fas fa-search"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="box-tools">
            <button className="btn btn-primary btn-sm" onClick={() => this.onCreate()}>
              Cadastrar {name}
            </button>
          </div>
        </div>
        <div className="box-body no-padding">
          <Grid 
            columns={columns} data={data} skeleton={skeleton}
            onView={id => this.onView(id)} onEdit={id => this.onEdit(id)} onDelete={id => this.onDelete(id)} />
        </div>
        <CmsDataListPagination pagination={pagination} onPageChange={(s, l) => this.onPageChange(s, l)} />
      </div>
    );
  }
}

export default withRouter(CmsDataList);