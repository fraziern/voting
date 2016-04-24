var React = require('react');

class Question extends React.Component {

  render() {
    return (<li className="list-group-item">
        <div className="question-title">{this.props.title}</div>
        <div className="question-votes">{this.props.votes} Votes</div>
      </li>);
  }
}

module.exports = Question;
