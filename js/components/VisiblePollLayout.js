import { connect } from 'react-redux';
var PollLayout = require('./PollLayout');

function getPoll(state, pollId) {
  for (var i = 0; i < state.length; i++) {
    if (state[i].id === pollId) return state[i];
  }
  return state[0];
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: getPoll(state, ownProps.params.pollId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVote: dispatch
  };
};

const VisiblePollLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(PollLayout);

module.exports = VisiblePollLayout;
