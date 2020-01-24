import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { studentUrl } from '../common/urls';
import TextInput from '../common/textInput';
import StateSwitch from '../common/stateSwitch';
import Skeleton from '../common/skeleton';
import FormGroup from '../common/formGroup';
import { safeFetch } from '../common/safeFetch';
import { dateFormat } from '../common/dateFormat';

class StudentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {},
      readonly: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.loadStudent();
  }

  async loadStudent() {
    if (!/\/students\/:id/g.exec(this.props.match.path)) {
      // on create
      this.setState({ readonly: false, isLoaded: true });
      return;
    }

    const readonly = !!/\/students\/:id\/show/g.exec(this.props.match.path);

    var student = await safeFetch(studentUrl(this.props.match.params.id));

    this.setState({
      student: student,
      readonly,
      isLoaded: true
    });
  }

  async onSave() {
    const req = {
      method: this.state.student.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.student)
    };

    await safeFetch(studentUrl(this.state.student.id), req);

    this.props.history.push('/students');
  }

  onCancel() {
    this.props.history.push('/students');
  }

  onInputChanged(fieldName, newValue) {
    const newState = {...this.state.student};

    newState[fieldName] = newValue;

    this.setState({
      student: newState
    });
  }

  render() {
    const { student, readonly, isLoaded } = this.state;

    return (
      <section className="content">
        <div className="row">
          <div className="col-md-10 col-lg-8">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Projeto</h3>
              </div>
              <form role="form">
                <div className="box-body">
                  <FormGroup label="Nome">
                    <TextInput
                      value={student.name} readonly={readonly} skeleton={!isLoaded}
                      onChange={nv => this.onInputChanged('name', nv)} />
                  </FormGroup>
                  <FormGroup label="Código">
                    <TextInput
                      value={student.code} readonly={readonly} skeleton={!isLoaded}
                      onChange={nv => this.onInputChanged('code', nv)} />
                  </FormGroup>
                  <FormGroup label="Turma">
                    <TextInput
                      value={student.class} readonly={readonly} skeleton={!isLoaded}
                      onChange={nv => this.onInputChanged('class', nv)} />
                  </FormGroup>
                  <FormGroup label="Situação">
                    <StateSwitch
                      value={student.blocked} readonly={true} skeleton={!isLoaded}
                      valueNames={['Bloqueado', 'Sem Bloqueio']}
                      actionNames={['Bloquear', 'Desbloquear']}
                      onChange={nv => this.onInputChanged('blocked', nv)} />
                  </FormGroup>
                  { student && student.blocked
                    ? <Fragment>
                        <FormGroup label="Bloqueado Até">
                          <TextInput value={dateFormat(student.blockedUntil, 'dd/MM/yyyy')} readonly={true} skeleton={!isLoaded} />
                        </FormGroup>
                        <FormGroup label="Motivo do bloqueio">
                          <TextInput value={student.blockedMessage} readonly={true} skeleton={!isLoaded} />
                        </FormGroup>
                      </Fragment>
                    : null }
                </div>
                <div className="box-footer">
                  { !isLoaded
                    ? <div className="btn-group pull-right">
                        <Skeleton type="button" />
                      </div>
                    : ( this.state.readonly
                      ? <div className="btn-group pull-right">
                          <input type="button" className="btn btn-default" onClick={() => this.onCancel()} value="Voltar" />
                        </div>
                      : <div className="btn-group pull-right">
                          <input type="button" className="btn btn-default" onClick={() => this.onCancel()} value="Cancelar" />
                          <input type="button" className="btn btn-primary" onClick={() => this.onSave()} value="Salvar" />
                        </div>)
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(StudentEdit);