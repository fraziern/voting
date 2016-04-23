import React from 'react';
import {render} from 'react-dom';

const initJSON = [{
  "id": lil.uuid(),
  "title": "Question 1",
  "choices": [{
    "title": "Choice 1",
    "votes": 2 },{
    "title": "Choice 2",
    "votes": 1 },{
    "title": "Choice 3",
    "votes": 5 }
             ],
  owner: "blerg"
},
                 {
  "id": lil.uuid(),
  "title": "Question 2",
  "choices": [{
    "title": "Choice 1",
    "votes": 2 },{
    "title": "Choice 2",
    "votes": 10 },{
    "title": "Choice 3",
    "votes": 5 }
             ],
  owner: "blerg"
}];

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="question-list list-group">
        {this.props.data.map(function(el) {
          let voteTotal = 0;
          el.choices.forEach(function (elm) {
            voteTotal += elm.votes;
          });
          return (<Question key={el.id} title={el.title} votes={voteTotal}/>);
        })}
      </ul>
    );
  }
}

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<li className="list-group-item">
        <div className="question-title">{this.props.title}</div>
        <div className="question-votes">{this.props.votes} Votes</div>
      </li>)
  }
}

ReactDOM.render( <QuestionList data={initJSON} />, document.getElementById('react-container'));
