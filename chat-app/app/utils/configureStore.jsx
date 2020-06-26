import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'reducers';

/**
 * Configure and return the Redux store.
 */

const createStore = (initialState = {}) =>
  createReduxStore(rootReducer, initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

const store = createStore();

export { createStore, store };
