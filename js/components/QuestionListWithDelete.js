import React, { PropTypes } from 'react';
var QuestionWithDelete = require('./QuestionWithDelete');
import { deletePollAction } from '../actions';

class QuestionListWithDelete extends React.Component {

  constructor(props) {
    super(props);
    this.handleDeletePoll = this.handleDeletePoll.bind(this);
  }

  handleDeletePoll(id) {
    const { dispatch } = this.props;
    dispatch(deletePollAction(id));
  }

  render() {

    const polls = this.props.polls;

    if (!polls) {
      return (
        <div>Loading ... </div>
      );
    }

    return (
      <ul className="question-list list-group list-unstyled">
        {polls.map(function(el) {
          let voteTotal = 0;
          el.choices.forEach(function (elm) {
            voteTotal += elm.votes;
          });
          return (<QuestionWithDelete key={el.id} id={el.id} title={el.title} votes={voteTotal} owner={el.owner} handleDeletePoll={this.handleDeletePoll} />);
        }, this)}
      </ul>
    );
  }
}

QuestionListWithDelete.propTypes = {
  polls: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = QuestionListWithDelete;
