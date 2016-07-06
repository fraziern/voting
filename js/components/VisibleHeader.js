import { connect } from 'react-redux';
var Header = require('./Header');
import { logoutUser } from '../actions';

// VisibleX layouts separate rendering components from connected components

function handleLogoutClick(e) {
  e.preventDefault();
  const { dispatch } = this.props;
  dispatch(logoutUser());
}

const mapStateToProps = (state) => {
  return {
    authUser: state.toJS().authUser,
    handleLogoutClick: handleLogoutClick
  };
};

const VisibleHeader = connect(mapStateToProps)(Header);

module.exports = VisibleHeader;
