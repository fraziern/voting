var React = require('react');
import { Link } from 'react-router';
import { getUser } from '../actions';


class Header extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUser());
  }

  render() {
    const user = this.props.authUser;
    var loginButton;
    if (!user) {
      loginButton = <li><Link to="/login"><button type="button" className="btn btn-default navbar-btn">Sign in</button></Link></li>;
    } else {
      loginButton = <li><Link to="#"><button onClick={this.props.handleLogoutClick.bind(this)} type="button" className="btn btn-default navbar-btn">Sign out</button></Link></li>;
    }

    return (
      <div className="app">
      <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">1Vote</a>
              </div>

              <div className="collapse navbar-collapse" id="navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                      <li><Link to="/newpoll">New Poll</Link></li>
                      <li><Link to="/">Home</Link></li>
                      {user && <li><Link to="#">{user}</Link></li>}
                      {loginButton}
                  </ul>
              </div>
          </div>
      </nav>
      {this.props.children}
      </div>
    );
  }
}

module.exports = Header;
