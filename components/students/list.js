import React, { Component, Fragment } from "react";
import CmsDataList from '../common/cmsDataList';
import { studentUrl } from '../common/urls';

export default class StudentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <section className="content-header">
          <h1>Alunos</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-10 col-lg-8">
              <CmsDataList name="Aluno" searchPlaceholder="Procurar nome ou código..." url={studentUrl()} columns={[
                  { title: 'Nome', prop: 'name', width: 40 },  
                  { title: 'Código', prop: 'code', width: 30 },
                  { title: 'Turma', prop: 'class', width: 30 },
                ]} />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
