import React, { PropTypes } from 'react';
import QuestionList from './QuestionList';
import { fetchPollsIfNeeded, getUser } from '../actions';

class MainLayout extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUser());
    dispatch(fetchPollsIfNeeded());
  }

  render() {
    const polls = this.props.polls;
    const user = this.props.authUser;
    return (
      <div className="main-layout">
        <div className="questions-header">
          <h1>Latest Polls</h1>
        </div>
        <QuestionList polls={polls} />
        User: {user}
      </div>
    );
  }
}

MainLayout.propTypes = {
  polls: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired
};

module.exports = MainLayout;
