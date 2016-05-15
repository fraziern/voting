import { connect } from 'react-redux';
var MainLayout = require('./MainLayout');

const mapStateToProps = (state) => {
  return {
    polls: state.toJS().polls,
    isFetching: state.toJS().isFetching
  };
};

const VisibleMainLayout = connect(mapStateToProps)(MainLayout);

module.exports = VisibleMainLayout;
