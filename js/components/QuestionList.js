var React = require('react');
var Question = require('./Question');

class QuestionList extends React.Component {

  render() {
    return (
      <ul className="question-list list-group">
        {this.props.data.map(function(el) {
          let voteTotal = 0;
          el.choices.forEach(function (elm) {
            voteTotal += elm.votes;
          });
          return (<Question key={el.id} title={el.title} votes={voteTotal} />);
        })}
      </ul>
    );
  }
}

module.exports = QuestionList;
