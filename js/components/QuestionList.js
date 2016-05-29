var React = require('react');
var Question = require('./Question');

class QuestionList extends React.Component {

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
          return (<Question key={el.id} id={el.id} title={el.title} votes={voteTotal} />);
        })}
      </ul>
    );
  }
}

QuestionList.propTypes = {
  polls: React.PropTypes.object
};

module.exports = QuestionList;
