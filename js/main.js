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
import Header from './components/Header';

// Layouts
import VisibleMainLayout from './components/VisibleMainLayout';
import VisiblePollLayout from './components/VisiblePollLayout';
import NewPollLayout from './components/NewPollLayout';

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
          <Route component={Header}>
            <Route path="/" component={VisibleMainLayout} />
            <Route path="poll/:pollId" component={VisiblePollLayout} />
            <Route path="newpoll" component={NewPollLayout} />
          </Route>
        </Router>
      </div>
    </Provider>,
  document.getElementById('react-container')
);
