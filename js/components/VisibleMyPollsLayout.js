import { connect } from 'react-redux';
var MyPollsLayout = require('./MyPollsLayout');

// VisibleX layouts separate rendering components from connected components

function getMyPolls(polls, user) {
  var myPolls = polls.filter(function (el) {
    return el.owner === user;
  });
  console.log(myPolls);
  return myPolls;
}

const mapStateToProps = (state, ownProps) => {
  return {
    polls: getMyPolls(state.toJS().polls, state.toJS().authUser)
  };
};

const VisibleMyPollsLayout = connect(mapStateToProps)(MyPollsLayout);

module.exports = VisibleMyPollsLayout;
