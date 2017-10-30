import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// const configureStore = initialState =>
//   createStore(
//     rootReducer,
//     initialState,
//     compose(
//       applyMiddleware(thunk),
//       autoRehydrate(),
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
//   persistStore(configureStore())

// export default configureStore;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    autoRehydrate(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
persistStore(store);

export default store;
