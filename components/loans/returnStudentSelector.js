import React, { Component } from "react";
import PropTypes from 'prop-types';
import ItemDisplay from './itemDisplay';
import ItemSelector from './itemSelector';
import { nc } from '../common/nullConditional';
import { studentUrl, bookUrl } from '../common/urls';
import { safeFetch } from '../common/safeFetch';

export default class ReturnStudentSelector extends Component {
  static propTypes = {
    student: PropTypes.object,
    loading: PropTypes.bool,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      color: null,
      message: null,
      skeleton: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { skeleton } = state;
    const loanCount = nc(() => props.student.loans.length) || 0;

    const color = skeleton ? 'gray' : (loanCount > 0 ? 'blue' : 'yellow');

    const message = loanCount
      ? `Possui ${loanCount} emprestimo${loanCount > 1 ? 's' : ''}`
      : `Não possui emprestimos`;

    return {
      color,
      message,
      skeleton
    };
  }

  async onChange(student) {
    this.setState({ skeleton: true });

    student.loans = await safeFetch(`${studentUrl(student.id)}/loans`);

    for (let loan of student.loans) {
      loan.book = await safeFetch(bookUrl(loan.bookId));
    }

    this.setState({ skeleton: false });
    
    nc(() => this.props.onChange(student));
  }

  onRemove() {
    nc(() => this.props.onChange(null));
  }

  render() {
    const { student, loading } = this.props;
    const { color, message, skeleton } = this.state;

    return (
      <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
        {student || skeleton
          ? <ItemDisplay
              name="Aluno" color={color} icon="fas fa-user"
              data={student ? {
                title: student.name,
                subtitle: `Turma: ${student.class}`,
                marker: `Código: ${student.code}`,
                message
              } : null}
              action={{
                name: 'Trocar Aluno',
                icon: 'fas fa-undo',
                func: () => this.onRemove()
              }}
              skeleton={skeleton}
              loading={loading} />
          : <ItemSelector
              name="aluno"
              optionsUrl={studentUrl()}
              optionsFormater={student => ({ value: student, label: student.name })}
              onChange={student => this.onChange(student)} />
            }
      </div>
    );
  }
}