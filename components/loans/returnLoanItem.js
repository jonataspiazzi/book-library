import React, { Component } from "react";
import PropTypes from 'prop-types';
import ItemDisplay from './itemDisplay';
import { nc } from '../common/nullConditional';
import { dateFormat } from '../common/dateFormat';

export default class ReturnLoanItem extends Component {
  static propTypes = {
    loan: PropTypes.object,
    loading: PropTypes.bool,
    onReturn: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      color: 'gray',
      message: null,
      skeleton: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { skeleton } = state;
    const dueDate = new Date(props.loan.dueDate);
    dueDate.setDate(dueDate.getDate() + 1);
    dueDate.setMilliseconds(dueDate.getMilliseconds() - 1);
    const remaningDays = Math.trunc((dueDate - new Date()) / 86400000.0);

    const color = remaningDays > 2 ? 'green' : (remaningDays > 0 ? 'yellow' : 'red');
    const message = remaningDays > 0
      ? `Ainda possui ${remaningDays} dia${remaningDays > 1 ? 's' : ''} de prazo.`
      : `Livro com atrazo.`;

    return {
      color,
      message,
      skeleton
    };
  }

  render() {
    const { loan, loading, onReturn } = this.props;
    const { color, message, skeleton } = this.state;

    return (
      <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
        <ItemDisplay
          color={color} icon="fas fa-book"
          data={{
            title: loan.bookTitle,
            subtitle: loan.book.author,
            marker: `Prazo até: ${dateFormat(loan.dueDate, 'dd/MM/yyyy')}`,
            message
          }}
          action={{
            name: 'Devolver Livro',
            icon: 'fas fa-sign-in-alt',
            func: () => nc(() => onReturn())
          }}
          skeleton={skeleton}
          loading={loading} />
      </div>
    );
  }
}