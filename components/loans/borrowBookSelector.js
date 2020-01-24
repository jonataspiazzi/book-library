import React, { Component } from "react";
import PropTypes from 'prop-types';
import AutoSelect from '../common/autoSelect';
import { nc } from '../common/nullConditional';
import ItemDisplay from './itemDisplay';
import ItemSelector from './itemSelector';
import { bookUrl } from '../common/urls';
import { safeFetch } from '../common/safeFetch';

export default class BorrowBookSelector extends Component {
  static propTypes = {
    book: PropTypes.object,
    loading: PropTypes.bool,
    onChange: PropTypes.func
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
    const color = skeleton ? 'gray' : 'blue';
    const loanCount = nc(() => props.book.loans.length) || 0;
    const message = loanCount > 1
      ? `Possui ${loanCount} emprestimo${loanCount > 1 ? 's' : ''}`
      : `Não possui emprestimos`;

    return {
      skeleton,
      color,
      message
    };
  }

  async onChange(book) {
    this.setState({ skeleton: true });

    book.loans = await safeFetch(`${bookUrl(book.id)}/loans`);

    this.setState({ skeleton: false });
    
    nc(() => this.props.onChange(book));
  }

  onRemove() {
    nc(() => this.props.onChange(null));
  }

  render() {
    const { book, loading } = this.props;
    const { color, message, skeleton } = this.state;

    return (
      <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
        {book || skeleton
          ? <ItemDisplay
              color={color} icon="fas fa-book"
              data={book ? {
                title: book.title,
                subtitle: book.author,
                marker: book.place,
                message
              } : null}
              action={{
                name: 'Trocar Livro',
                icon: 'fas fa-undo',
                func: () => this.onRemove()
              }}
              skeleton={skeleton}
              loading={loading} />
          : <ItemSelector
              name="livro"
              optionsUrl={bookUrl()}
              optionsFormater={book => ({ value: book, label: book.title })}
              onChange={book => this.onChange(book)} />
            }
      </div>
    );
  }
}