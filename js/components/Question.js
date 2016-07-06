var React = require('react');
import { Link } from 'react-router';

class Question extends React.Component {

  render() {
    return (
      <li><Link to={`/poll/${this.props.id}`} className="list-group-item">
        <div className="question-title">{this.props.title}</div>
        <div className="question-votes">{this.props.votes} Votes</div>
        <div className="question-owner">by {this.props.owner}</div>
      </Link></li>
    );
  }
}

Question.propTypes = {
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  votes: React.PropTypes.number
};

module.exports = Question;
