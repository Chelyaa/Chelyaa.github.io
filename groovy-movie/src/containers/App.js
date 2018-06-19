import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk'

import GroovyMovieApp from './GroovyMovieApp';
import Reducer from '../reducers/rootReducer';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

const store = createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <GroovyMovieApp />
        </Router>
      </Provider>
    );
  }
}

export default App;
