import { connect } from 'react-redux';
var ChoiceList = require('./ChoiceList');

// VisibleX layouts separate rendering components from connected components

const mapStateToProps = (state) => {
  return {
    data: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVote: dispatch
  };
};

const VisibleChoiceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceList);

module.exports = VisibleChoiceList;
