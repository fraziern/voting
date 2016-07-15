import React, { PropTypes } from 'react';
import QuestionListWithDelete from './QuestionListWithDelete';

class MyPollsLayout extends React.Component {

  render() {
    const polls = this.props.polls;
    return (
      <div className="mypolls-layout">
        <div className="questions-header">
          <h1>My Polls</h1>
        </div>
        <QuestionListWithDelete polls={polls} dispatch={this.props.dispatch} />
      </div>
    );
  }
}

MyPollsLayout.propTypes = {
  polls: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = MyPollsLayout;
