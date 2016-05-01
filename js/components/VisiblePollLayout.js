import { connect } from 'react-redux';
var PollLayout = require('./PollLayout');

function getPoll(polls, pollId) {
  console.log('Getting poll');
  for (var i = 0; i < polls.length; i++) {
    if (polls[i].id === pollId) return polls[i];
  }
  return polls[0];
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
