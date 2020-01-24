import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import BookList from './list';
import BookEdit from './edit';

export default class BookIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route path="/books" component={BookList} exact />
        <Route path="/books/new" component={BookEdit} exact />
        <Route path="/books/:id" component={BookEdit} exact />
        <Route path="/books/:id/show" component={BookEdit} />
      </Switch>
    );
  }
}