import React, { PropTypes } from 'react';
import QuestionList from './QuestionList';
import { fetchPollsIfNeeded, getUser } from '../actions';

class MainLayout extends React.Component {

  render() {
    const polls = this.props.polls;
    return (
      <div className="main-layout">
        <div className="questions-header">
          <h1>Latest Polls</h1>
        </div>
        <QuestionList polls={polls} />
      </div>
    );
  }
}

MainLayout.propTypes = {
  polls: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

module.exports = MainLayout;
