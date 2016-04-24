var React = require('react');
var ReactDOM = require('react-dom');
var QuestionList = require('./QuestionList');
var lil = require ('lil-uuid');

const initJSON = [{
  id: lil.uuid(),
  title: 'Question 1',
  choices: [{
    title: 'Choice 1',
    votes: 2
  },{
    title: 'Choice 2',
    votes: 1
  },{
    title: 'Choice 3',
    votes: 5
  }],
  owner: 'blerg'
},{
  id: lil.uuid(),
  title: 'Question 2',
  choices: [{
    title: 'Choice 1',
    votes: 2
  },{
    title: 'Choice 2',
    votes: 10
  },{
    title: 'Choice 3',
    votes: 5
  }],
  owner: 'blerg'
}];

ReactDOM.render( <QuestionList data={initJSON} />, document.getElementById('react-container'));
