import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { bookUrl } from '../common/urls';
import TextInput from '../common/textInput';
import Skeleton from '../common/skeleton';
import FormGroup from '../common/formGroup';
import { safeFetch } from '../common/safeFetch';

class BookEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
      readonly: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.loadBook();
  }

  async loadBook() {
    if (!/\/books\/:id/g.exec(this.props.match.path)) {
      // on create
      this.setState({ readonly: false, isLoaded: true });
      return;
    }

    const readonly = !!/\/books\/:id\/show/g.exec(this.props.match.path);
    const book = await safeFetch(bookUrl(this.props.match.params.id));

    this.setState({
      book: book,
      readonly,
      isLoaded: true
    });
  }

  async onSave() {
    const req = {
      method: this.state.book.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.book)
    };

    await safeFetch(bookUrl(this.state.book.id), req);

    this.props.history.push('/books');
  }

  onCancel() {
    this.props.history.push('/books');
  }

  onInputChanged(fieldName, newValue) {
    const newState = {...this.state.book};

    newState[fieldName] = newValue;

    this.setState({
      book: newState
    });
  }

  render() {
    const { book, readonly, isLoaded } = this.state;

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
                  <FormGroup label="Título">
                    <TextInput
                      value={book.title} readonly={readonly} skeleton={!isLoaded}
                      onChange={nv => this.onInputChanged('title', nv)} />
                  </FormGroup>
                  <FormGroup label="Autor">
                    <TextInput
                      value={book.author} readonly={readonly} skeleton={!isLoaded}
                      onChange={nv => this.onInputChanged('author', nv)} />
                  </FormGroup>
                  <FormGroup label="Local">
                    <TextInput
                      value={book.place} readonly={readonly} skeleton={!isLoaded}
                      onChange={nv => this.onInputChanged('place', nv)} />
                  </FormGroup>
                  <FormGroup label="Código">
                    <TextInput
                      value={book.code} readonly={readonly} skeleton={!isLoaded}
                      onChange={nv => this.onInputChanged('code', nv)} />
                  </FormGroup>
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

export default withRouter(BookEdit);