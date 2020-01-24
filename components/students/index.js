import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import ProjectList from './list';
import ProjectEdit from './edit';

export default class ProjectIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route path="/students" component={ProjectList} exact />
        <Route path="/students/new" component={ProjectEdit} exact />
        <Route path="/students/:id" component={ProjectEdit} exact />
        <Route path="/students/:id/show" component={ProjectEdit} />
      </Switch>
    );
  }
}