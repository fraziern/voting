import { connect } from 'react-redux';
var Header = require('./Header');
import { logoutUser, getUser } from '../actions';

// VisibleX layouts separate rendering components from connected components

const mapStateToProps = (state) => {
  return {
    authUser: state.toJS().authUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogoutClick: (e) => {
      e.preventDefault();
      dispatch(logoutUser());
    },
    getUser: () => {
      dispatch(getUser());
    }
  };
};

const VisibleHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

module.exports = VisibleHeader;
