import React, { Component } from "react";
import MenuItem from './menuItem';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu" data-widget="tree">
            <MenuItem route="/" icon="fas fa-home" name="Inicio" />
            <MenuItem route="/borrows" icon="fas fa-sign-out-alt" name="Emprestimos" />
            <MenuItem route="/returns" icon="fas fa-sign-in-alt" name="Devoluções" />
            <MenuItem route="/students" icon="fas fa-user" name="Alunos" />
            <MenuItem route="/books" icon="fas fa-book" name="Livros" />
          </ul>
        </section>
      </aside>
    );
  }
}
