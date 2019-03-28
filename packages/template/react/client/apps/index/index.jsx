import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { initStore } from './store';
import { App } from './routes';

const store = initStore();

export default class App extends Component {
  render() {
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  }
}
