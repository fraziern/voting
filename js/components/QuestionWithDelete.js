var React = require('react');
import { Link } from 'react-router';

class QuestionWithDelete extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.handleDeletePoll(this.props.id);
  }

  render() {
    return (
      <li className="list-group-item question-with-delete"><Link to={`/poll/${this.props.id}`}>
        <div className="question-text">
          <div className="question-title">{this.props.title}</div>
          <div className="question-votes">{this.props.votes} Votes</div>
          <div className="question-owner">by {this.props.owner}</div>
        </div></Link>
        <div className="question-delete">
          <button type='button' className='btn btn-default' onClick={this.onDeleteClick}>Delete</button>
        </div>
      </li>
    );
  }
}

QuestionWithDelete.propTypes = {
  handleDeletePoll: React.PropTypes.func,
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  votes: React.PropTypes.number
};

module.exports = QuestionWithDelete;
