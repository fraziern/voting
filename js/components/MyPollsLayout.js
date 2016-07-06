import React, { PropTypes } from 'react';
import QuestionList from './QuestionList';
// import { fetchPollsIfNeeded, getUser } from '../actions';

class MyPollsLayout extends React.Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(fetchPollsIfNeeded());
  // }

  render() {
    const polls = this.props.polls;
    return (
      <div className="mypolls-layout">
        <div className="questions-header">
          <h1>My Polls</h1>
        </div>
        <QuestionList polls={polls} />
      </div>
    );
  }
}

MyPollsLayout.propTypes = {
  polls: PropTypes.array.isRequired
  // dispatch: PropTypes.func.isRequired,
};

module.exports = MyPollsLayout;
