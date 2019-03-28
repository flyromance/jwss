import { createStore, compose, bindActionCreators, applyMiddleware, combineReducers } from 'redux';

import reducer from './reducer';

function initStore() {
  const store = createStore(reducer, {});
  return store;
}


export {
  initStore
}
