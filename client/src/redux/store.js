import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root.reducer';

const middlewares = [];
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

export { store, persistor };
