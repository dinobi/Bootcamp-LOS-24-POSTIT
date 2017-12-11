import { compose, createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// Be sure to ONLY add this middleware in development!
const store = process.env.NODE_ENV === 'development' ?
  createStore(
    rootReducer,
    compose(
      applyMiddleware(...[reduxImmutableStateInvariant(), thunk]),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  :
  createStore(
    rootReducer,
    applyMiddleware(thunk),
  );

// persistStore(store);

export default store;
