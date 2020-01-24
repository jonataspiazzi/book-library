import React, { Component, Fragment } from "react";
import Alert from '../common/alert';
import ReturnLoanItem from './returnLoanItem';
import ReturnStudentSelector from './returnStudentSelector';
import { returnUrl } from "../common/urls";
import { safeFetch } from '../common/safeFetch';

export default class ReturnIndex extends Component {
  constructor(props) {
    super(props);

    this.alertRef = React.createRef();

    this.state = {
      student: null,
      loans: [],
      loading: false,
      loansLoading: {}
    };
  }

  async onStudentChange(student) {
    const loans = student && student.loans || [];
    const loansLoading = {};

    for (let loan of loans) {
      loansLoading[loan.id] = false;
    }

    this.setState({ student, loans, loansLoading });
  }

  async onLoanReturned(loan) {
    const { loansLoading } = this.state;

    this.setState({
      loansLoading: {
        ...loansLoading,
        [loan.id]: true
      }
    });

    try {
      await safeFetch(returnUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loan)
      });

      this.alertRef.current.setMessage('Livro devolvido com sucesso.');

      const loans = [...this.state.loans];
      const index = loans.indexOf(loan);
      loans.splice(index, 1);

      this.setState({
        loans,
        loansLoading: {
          ...loansLoading,
          [loan.id]: false
        }
      });
    } catch (ex) {
      this.alertRef.current.setMessage(`Ocorreu um erro ao tentar cadastrar a devolução, 
        por favor tente mais tarde.
        Se o problema persistir, por favor contacte o administrador do sistema.`, 'error', 10000);

      this.setState({
        loansLoading: {
          ...loansLoading,
          [loan.id]: false
        }
      });
    }
  }

  render() {
    return (
      <Fragment>
        <section className="content-header">
          <h1>Devolução</h1>
          <p>Para devolver um livro, selecione um aluno.</p>
        </section>
        <section className="content">
          <Alert ref={this.alertRef} />
          <div className="row">
            <ReturnStudentSelector
              student={this.state.student}
              loading={this.state.loading}
              onChange={s => this.onStudentChange(s)} />
            {this.state.loans.map(loan => 
              <ReturnLoanItem
                key={loan.id}
                loan={loan}
                loading={this.state.loansLoading[loan.id]}
                onReturn={() => this.onLoanReturned(loan)} />)}
          </div>
        </section>
      </Fragment>
    );
  }
}