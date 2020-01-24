import React, { Component } from "react";

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 0.1.3
        </div>
        <strong>Copyright &copy;2019 <a href="https://adminlte.io">Jônatas Piazzi</a>.</strong> All rights
        reserved.
      </footer>
    );
  }
}