import React, { Component } from "react";
import PropTypes from 'prop-types';
import ItemDisplay from './itemDisplay';
import ItemSelector from './itemSelector';
import { nc } from '../common/nullConditional';
import { studentUrl } from '../common/urls';
import { maxLoanBooksPerStudent } from '../../config';
import { safeFetch } from "../common/safeFetch";

export default class BorrowStudentSelector extends Component {
  static propTypes = {
    student: PropTypes.object,
    loading: PropTypes.bool,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      color: 'gray',
      message: null,
      skeleton: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { skeleton } = state;
    const loanCount = nc(() => props.student.loans.length) || 0;
    const blockMessage = props.student && props.student.blocked ? 'Aluno Bloqueado.' : '';

    const color = state.skeleton
      ? 'gray'
      : ( blockMessage
        ? 'red'
        : (loanCount >= maxLoanBooksPerStudent ? 'red' : 'green'));

    const message = !props.student
      ? null
      : (blockMessage
        ? blockMessage
        : ( loanCount
          ? ( loanCount >= maxLoanBooksPerStudent
            ? `Possui o máximo de emprestimos (${maxLoanBooksPerStudent}).`
            : `Possui ${loanCount} emprestimo${loanCount > 1 ? 's' : ''}`)
          : `Não possui emprestimos`));

    return {
      skeleton,
      color,
      message
    };
  }

  async onChange(student) {
    this.setState({ skeleton: true });

    student.loans = await safeFetch(`${studentUrl(student.id)}/loans`);

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
                message,
                extendedMessage: student.blockedMessage
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