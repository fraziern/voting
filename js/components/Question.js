var React = require('react');
import { Link } from 'react-router';

class Question extends React.Component {

  render() {
    return (
      <li><Link to={`/poll/${this.props.id}`} className="list-group-item">
        <div className="question-title">{this.props.title}</div>
        <div className="question-votes">{this.props.votes} Votes</div>
      </Link></li>
    );
  }
}

Question.propTypes = {
  id: React.PropTypes.object,
  title: React.PropTypes.string,
  votes: React.PropTypes.object
};

module.exports = Question;
