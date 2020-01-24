import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Header from "./master/header";
import MainMenu from "./master/mainMenu";
import Footer from "./master/footer";
import Http404 from './http/404';
import Home from './home';
import DemoIndex from './demo';
import StudentIndex from './students';
import BookIndex from './books';
import BorrowIndex from './loans/borrowIndex';
import ReturnIndex from './loans/returnIndex';
import AuthenticationWrapper from './authentication/wrapper';
import ClassIndex from './classes';
import '../public/css/bootstrap.min.css';
import '../public/css/all.min.css';
import '../public/css/regular.min.css';
import '../public/css/solid.min.css';
import '../public/css/AdminLTE.min.css';
import '../public/css/skin-blue.min.css';
import '../public/css/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  /*

  async componentDidMount() {
    await this.checkAuthentication(this.props.location);

    this.unlistenRouter = this.props.history.listen((location, action) => {
      this.checkAuthentication(location);
    });
  }

  componentWillUnmount() {
    if (this.unlistenRouter) this.unlistenRouter();
  }

  async checkAuthentication(location) {
    if (location.pathname === '/signin') {
      this.setState({ isSignIn: true });
    } else {
      const auth = await this.getAuthentication();
      this.setState({ ...auth, isSignIn: false });
    }
  }

  async getAuthentication() {
    const { cookies } = this.props;

    let auth = cookies.get('auth') || { isAuthenticated: false, user: null };

    if (auth.isAuthenticated) {
      this.setCookie(auth);
      return auth;
    }

    auth = await safeFetch(userAuthenticated());

    this.setCookie(auth);
    return auth;
  }

  setCookie(auth) {
    const { cookies } = this.props;
    
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + idleTimeout);
    cookies.set('auth', auth, { path: '/', expires });
  }

  */

  render() {
    return (
      <Router>
        <AuthenticationWrapper>
          <div className="app-wrapper">
            <Header />
            <MainMenu />
            <div className="content-wrapper">
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/demo" component={DemoIndex} />
                <Route path="/borrows" component={BorrowIndex} />
                <Route path="/returns" component={ReturnIndex} />
                <Route path="/students" component={StudentIndex} />
                <Route path="/books" component={BookIndex} />
                <Route path="/classes" component={ClassIndex} />
                <Route component={Http404} />
              </Switch>
            </div>
            <Footer />
          </div>
        </AuthenticationWrapper>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));