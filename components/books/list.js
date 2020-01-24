import React, { Component, Fragment } from "react";
import CmsDataList from '../common/cmsDataList';
import { bookUrl } from '../common/urls';

export default class BookList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <section className="content-header">
          <h1>Livros</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-10 col-lg-8">
              <CmsDataList name="Livro" searchPlaceholder="Procurar título ou autor..." url={bookUrl()} columns={[
                  { title: 'Título', prop: 'title', width: 40 },  
                  { title: 'Autor', prop: 'author', width: 30 }
                ]} />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
