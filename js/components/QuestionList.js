var React = require('react');
var Question = require('./Question');

class QuestionList extends React.Component {

  render() {
    const { store } = this.context;
    const state = store.getState();

    return (
      <ul className="question-list list-group list-unstyled">
        {state.map(function(el) {
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

QuestionList.contextTypes = {
  store: React.PropTypes.object
};

module.exports = QuestionList;
