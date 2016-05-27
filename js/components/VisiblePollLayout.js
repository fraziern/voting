import { connect } from 'react-redux';
var PollLayout = require('./PollLayout');

function getPoll(polls, pollId) {
  for (var i = 0; i < polls.length; i++) {
    if (polls[i].id === pollId) return polls[i];
  }
  return undefined;
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: getPoll(state.toJS().polls, ownProps.params.pollId)
  };
};

const VisiblePollLayout = connect(
  mapStateToProps
)(PollLayout);

module.exports = VisiblePollLayout;
