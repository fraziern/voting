import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';

// Layouts
import MainLayout from './components/main-layout';
import PollLayout from './components/poll-layout';

// Flux
var pollsStore = require('./pollsStore');
var _polls = pollsStore.getPolls();
pollsStore.onChange(function(polls) {
  _polls = polls;
  render();
});

function render() {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" data={_polls} component={MainLayout} />
      <Route path="poll" data={_polls} component={PollLayout} />
    </Router>
  ), document.getElementById('react-container'));
}

render();
