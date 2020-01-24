import React, { Component, Fragment } from 'react';

export default class ClassIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <section className="content-header">
          <h1>Turmas</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-10 col-lg-8">
              <div className="box">
                <div className="box-header-table">
                  <div className="box-tools-left">
                    <div className="input-group input-group-sm" >
                      <input type="text" className="form-control" />
                      <span className="input-group-btn">
                        <button type="button" className="btn btn-default">
                          <i className="fas fa-search"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="box-body">
                  Corpo
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}