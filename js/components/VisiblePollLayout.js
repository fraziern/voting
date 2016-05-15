import { connect } from 'react-redux';
var PollLayout = require('./PollLayout');

function getPoll(polls, pollId) {
  for (var i = 0; i < polls.length; i++) {
    if (polls.getIn([i, 'id']) === pollId) return polls.get(i).toJS();
  }
  return polls.get(0).toJS();
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: getPoll(state.polls, ownProps.params.pollId)
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
