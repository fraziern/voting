var React = require('react');
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PollsReducer from './polls-reducer';

// Layouts
import MainLayout from './components/MainLayout';
import VisiblePollLayout from './components/VisiblePollLayout';
import NewpollLayout from './components/NewpollLayout';

let store = createStore(PollsReducer);

render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={MainLayout} />
          <Route path="poll/:pollId" component={VisiblePollLayout} />
          <Route path="newpoll" component={NewpollLayout} />
        </Router>
      </div>
    </Provider>,
  document.getElementById('react-container')
);
