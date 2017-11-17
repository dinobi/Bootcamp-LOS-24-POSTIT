import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// Be sure to ONLY add this middleware in development!
const middleware = process.env.NODE_ENV !== 'production' ?
[reduxImmutableStateInvariant(), thunk] :
[thunk];

const store = createStore(
  rootReducer,
    applyMiddleware(...middleware),
    autoRehydrate()
);
persistStore(store);

export default store;
