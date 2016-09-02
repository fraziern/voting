import { connect } from 'react-redux';
var Header = require('./Header');
import { logoutUser, getUser, fetchPollsIfNeeded } from '../actions';

// VisibleX layouts separate rendering components from connected components

const mapStateToProps = (state) => {
  return {
    polls: state.toJS().polls,
    isFetching: state.toJS().isFetching,
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
    },
    getPolls: () => {
      dispatch(fetchPollsIfNeeded());
    }
  };
};

const VisibleHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

module.exports = VisibleHeader;
