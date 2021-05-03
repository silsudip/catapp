import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import { IStore } from './IStore';
import rootReducer from '../reducers/root';

export const storeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore<IStore, any, any, any>(
    rootReducer, storeEnhancers(applyMiddleware(thunk))
);
export default store;
