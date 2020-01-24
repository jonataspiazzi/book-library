import React, { Component } from 'react'

export default class HomeContainer extends Component {
  render() {
    return (
      <section className="content">
        <div className="row">
          <div className="col-md-10 col-lg-8">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Home</h3>
              </div>
              <div className="box-body">
                <p>Bem vindo ao Sistem de Gerenciamento de Dados</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
