import React, { Component, Fragment } from "react";
import FormGroup from '../common/formGroup';
import SelectInput from '../common/selectInput';
import Overlay from '../common/overlay';
import Alert from '../common/alert';
import { borrowUrl } from '../common/urls';
import { defaultDueTime, dueTimeOptions, maxLoanBooksPerStudent } from '../../config';
import { nc } from '../common/nullConditional';
import BorrowBookSelector from './borrowBookSelector';
import BorrowStudentSelector from './borrowStudentSelector';
import { safeFetch } from '../common/safeFetch';

export default class BorrowIndex extends Component {
  constructor(props) {
    super(props);

    this.alertRef = React.createRef();

    this.state = {
      book: null,
      student: null,
      dueTime: defaultDueTime,
      loading: false
    };
  }

  setStateProp(prop, value) {
    this.setState({
      [prop]: value
    });
  }

  isLoanReadyToSave() {
    const { student, book, dueTime } = this.state;

    const validations = {
      hasReturnInterval: !!dueTime,
      hasReturnIntervalValue: !!nc(() => dueTime.value),
      hasStudent: !!student,
      hasStudentId: !!nc(() => student.id),
      isStudentUnblocked: !nc(() => student.blocked),
      isLoanPerStudentOk: nc(() => student.loans.length) < maxLoanBooksPerStudent,
      hasBook: !!book,
      hasBookId: !!nc(() => book.id)
    };

    for (let prop in validations) {
      if (!validations[prop]) return false;
    }

    return true;
  }

  async onSave() {
    this.setState({
      loading: true
    });

    try {
      await safeFetch(borrowUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: this.state.student.id,
          studentName: this.state.student.name,
          bookId: this.state.book.id,
          bookTitle: this.state.book.title,
          dueTime: this.state.dueTime.value
        })
      });

      this.alertRef.current.setMessage('Emprestimo cadastrado com sucesso.');

      this.setState({
        book: null,
        student: null,
        dueTime: defaultDueTime,
        loading: false
      });
    } catch (ex) {
      this.alertRef.current.setMessage(`Ocorreu um erro ao tentar cadastrar o emprestimo, 
        por favor tente mais tarde.
        Se o problema persistir, por favor contacte o administrador do sistema.`, 'error', 10000);

      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <Fragment>
        <section className="content-header">
          <h1>Empréstimo</h1>
          <p>Para emprestar um livro, selecione um aluno e um livro.</p>
        </section>
        <section className="content">
          <Alert ref={this.alertRef} />
          <div className="row">
            <BorrowStudentSelector
              student={this.state.student}
              loading={this.state.loading}
              onChange={student => this.setStateProp('student', student)} />
            <BorrowBookSelector
              book={this.state.book}
              loading={this.state.loading}
              onChange={book => this.setStateProp('book', book)} />
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Dados do Emprestimo</h3>
                </div>
                <div className="box-body">
                  <form role="form">
                    <FormGroup label="Prazo de devolução">
                      <SelectInput
                        value={this.state.dueTime}
                        options={dueTimeOptions}
                        onChange={nv => this.setStateProp('dueTime', nv)} />
                    </FormGroup>
                  </form>
                </div>
                <div className="box-footer">
                  <div className="btn-group pull-right">
                    <input
                      type="button"
                      disabled={!this.isLoanReadyToSave()}
                      className="btn btn-primary"
                      onClick={() => this.onSave()} value="Salvar" />
                  </div>
                </div>
                <Overlay enabled={this.state.loading} />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
