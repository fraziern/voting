var React = require('react');
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentDidMount() {
    this.props.getPolls();
    this.props.getUser();
  }

  onLogoutClick(e) {
    this.props.handleLogoutClick(e);
  }

  render() {
    const user = this.props.authUser;
    var loginButton;
    var newPollLink;
    if (!user) {
      loginButton = <li><Link to="/login"><button type="button" className="btn btn-default navbar-btn">Sign in</button></Link></li>;
      newPollLink = null;
    } else {
      loginButton = <li><Link to="#"><button onClick={this.onLogoutClick} type="button" className="btn btn-default navbar-btn">Sign out</button></Link></li>;
      newPollLink = <li><Link to="/newpoll">New Poll</Link></li>;
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
                      {newPollLink}
                      <li><Link to="/">Home</Link></li>
                      {user && <li><Link to="/mypolls">{user}</Link></li>}
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
