// this contains the main react router routes
var React = require('react');
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import PollsReducer from './polls-reducer';
import {Iterable} from 'immutable';

// Top level Header
import VisibleHeader from './components/VisibleHeader';

// Layouts
import VisibleMainLayout from './components/VisibleMainLayout';
import VisiblePollLayout from './components/VisiblePollLayout';
import NewPollLayout from './components/NewPollLayout';
import LoginLayout from './components/LoginLayout';

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};

const logger = createLogger({
  stateTransformer
});

let store = createStore(
  PollsReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions (for async actions)
    logger
  )
);

render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
          <Route component={VisibleHeader}>
            <Route path="/" component={VisibleMainLayout} />
            <Route path="poll/:pollId" component={VisiblePollLayout} />
            <Route path="newpoll" component={NewPollLayout} />
            <Route path="login" component={LoginLayout} />
          </Route>
        </Router>
      </div>
    </Provider>,
  document.getElementById('react-container')
);
